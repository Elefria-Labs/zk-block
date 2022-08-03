import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Tag,
  Flex,
  Button,
  TagLabel,
  HStack,
  TagRightIcon,
  RadioGroup,
  Radio,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { Voting } from '@types/contracts/Voting';
import { truncateAddress } from '@utils/wallet';
import { PollStatus } from './types';
import { useWalletContext } from '@components/dapp/WalletContext';
import { getVotingContract } from '@hooks/contractHelpers';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { generateZkProof } from '@utils/zk/merkleproof';
import { generateBroadcastParams } from '@utils/zk/zk-witness';
import { DEFAULT_CHAIN_ID } from '@config/constants';
import { getIdFromStore, posiedonHash, tryTx } from './helpers';
const { ZkIdentity } = require('@libsem/identity');

export type VoitingItemPropsType = Voting.PollStructOutput & {
  isRegistered?: boolean;
};
export function VotingItem(props: VoitingItemPropsType) {
  const { isRegistered = false } = props;
  const { account, provider, chainId = DEFAULT_CHAIN_ID } = useWalletContext();
  const [userVote, setUserVote] = useState(1);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const votingContract = React.useMemo(
    () => getVotingContract(chainId ?? DEFAULT_CHAIN_ID),
    [chainId],
  );

  const handleStartPoll = async () => {
    if (provider == null) {
      return;
    }
    try {
      const tx = await votingContract
        ?.connect(provider.getSigner())
        .startPoll(props.pollId);
      if (tx?.hash) {
        console.log('tx sent');
      }
    } catch (e) {
      console.log('Error sending tx', e);
    }
  };

  const handleCastVote = async () => {
    if (provider == null || votingContract == null || account == null) {
      return;
    }
    setLoading(true);
    try {
      const identity: typeof ZkIdentity | undefined = getIdFromStore(account);

      if (identity == null) {
        return;
      }
      const { identityNullifier, identityTrapdoor } = identity.getIdentity();

      const hash = await posiedonHash([
        BigInt(identityTrapdoor),
        BigInt(identityNullifier),
      ]);

      const leaves = await votingContract.getRegisteredCommitments();

      const { pathElements, indices } = await generateZkProof(leaves, hash);

      const nullifierHash = await posiedonHash([
        BigInt(identityNullifier),
        ethers.BigNumber.from(userVote).toBigInt(),
      ]);

      const circuitInputs = {
        identityNullifier: BigInt(identityNullifier),
        identityTrapdoor: BigInt(identityTrapdoor),
        treePathIndices: indices,
        treeSiblings: pathElements,
        signalHash: ethers.BigNumber.from(userVote).toBigInt(),
        externalNullifier: ethers.BigNumber.from(props.pollId).toBigInt(),
      };

      const fullProof = await generateBroadcastParams(circuitInputs, 'voting');

      const [a, b, c, input] = fullProof;
      const tx = await votingContract
        ?.connect(provider.getSigner())
        .castVote(
          userVote,
          nullifierHash,
          props.pollId,
          [...a, ...b[0], ...b[1], ...c],
          input,
        );
      if (tx?.hash) {
        toast({
          title: 'Tx Sent!',
          description: `Tx Hash: ${tx.hash}`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
      }
    } catch (e) {
      console.log('Error sending tx', e);
      toast({
        title: 'Error!',
        description: `Error sending creating transaction.`,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
    setLoading(false);
  };
  const noVotes = React.useMemo(
    () =>
      props.votes.filter((v) => ethers.BigNumber.from(v).toNumber() === 0)
        .length,
    [props.votes],
  );

  const yesVotes = props.votes.length - noVotes;
  const handleEndPoll = async () => {
    tryTx(async () => {
      if (provider == null || votingContract == null) {
        return;
      }

      const tx = await votingContract
        .connect(provider.getSigner())
        .endPoll(props.pollId);
      if (tx?.hash) {
        toast({
          title: 'Tx Sent!',
          description: `Tx Hash: ${tx.hash}`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
      }
    });
  };

  return (
    <Center py={6} ml={8}>
      <Box
        w={'320px'}
        h={'380px'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflowY="auto"
      >
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {props.title}
          </Heading>
          <Stack spacing={2} flexWrap="wrap" direction="row">
            {props.pollStatus == PollStatus.Created && (
              <Tag size="sm" key="1" variant="solid" colorScheme="orange">
                Not Active
              </Tag>
            )}
            {props.pollStatus == PollStatus.Started && (
              <Tag size="sm" key="1" variant="solid" colorScheme="green">
                Voting Active
              </Tag>
            )}
            {props.pollStatus == PollStatus.Ended && (
              <Tag size="sm" key="1" variant="solid" colorScheme="red">
                Voting Ended
              </Tag>
            )}
            {props.pollStatus == PollStatus.Started &&
              ethers.BigNumber.from(props.quorum).toNumber() <= yesVotes && (
                <Tag size="sm" key="1" variant="solid" colorScheme="orange">
                  Proposal Passed
                </Tag>
              )}
          </Stack>
        </Stack>

        <Stack
          direction={'column'}
          spacing={2}
          fontSize={'sm'}
          justifyContent="flex-end"
          flex="1"
        >
          <Text color={'black'} textAlign="justify" mt={8} fontSize="lg">
            Total Votes: {props.votes.length}
          </Text>
          <HStack spacing={4}>
            <Tag
              size="lg"
              key="yes"
              borderRadius="full"
              variant="solid"
              colorScheme="green"
            >
              <TagLabel>{yesVotes} Yes</TagLabel>
              <TagRightIcon as={CheckIcon} fontSize="12px" />
            </Tag>

            <Tag
              size="lg"
              key="no"
              borderRadius="full"
              variant="solid"
              colorScheme="red"
            >
              <TagLabel>{noVotes} No</TagLabel>
              <TagRightIcon as={CloseIcon} fontSize="10px" />
            </Tag>
          </HStack>

          {props.pollStatus === PollStatus.Created &&
            props.creator === account && (
              <Button
                variant="solid"
                bg="black"
                _hover={{ bg: 'gray.600' }}
                ml="24px"
                color="white"
                onClick={handleStartPoll}
              >
                Start Poll
              </Button>
            )}
          {props.pollStatus === PollStatus.Started && (
            <Flex alignItems="center" justify="space-between">
              {isRegistered ? (
                <>
                  <Flex alignItems="center">
                    <Text
                      color={'black'}
                      textAlign="justify"
                      fontSize="lg"
                      as="b"
                      mr={8}
                    >
                      Vote:
                    </Text>
                    <RadioGroup
                      defaultValue={userVote.toString()}
                      onChange={(e) => {
                        setUserVote(Number(e));
                      }}
                    >
                      <Stack>
                        <Radio value="0">No </Radio>
                        <Radio value="1">Yes</Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>
                  <Flex justify="space-between" direction="column">
                    <Button
                      variant="solid"
                      bg="black"
                      _hover={{ bg: 'gray.600' }}
                      color="white"
                      size="sm"
                      isLoading={loading}
                      onClick={handleCastVote}
                    >
                      Cast Vote
                    </Button>
                    {props.creator == account && (
                      <Button
                        variant="solid"
                        bg="black"
                        _hover={{ bg: 'gray.600' }}
                        mt={2}
                        color="white"
                        size="sm"
                        onClick={handleEndPoll}
                      >
                        End Poll
                      </Button>
                    )}
                  </Flex>
                </>
              ) : (
                <Text
                  color={'black'}
                  textAlign="justify"
                  mt={8}
                  fontSize="lg"
                  as="b"
                >
                  You need to register in order to vote!
                </Text>
              )}
            </Flex>
          )}
          <Text color={'black'} textAlign="justify" mt={8}>
            Quorum: {props.quorum.toNumber()}
          </Text>
          <Text color={'black'} textAlign="justify" mt={8}>
            Created by:
            {props.creator === account ? 'You' : truncateAddress(props.creator)}
          </Text>
          <Text color={'black'} textAlign="justify" mt={8}>
            Created at: 12/21/2022
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}
