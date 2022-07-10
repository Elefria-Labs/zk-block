import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Tag,
  Link,
  Icon,
  Flex,
  Button,
  TagLabel,
  HStack,
  TagRightIcon,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, SmallCloseIcon } from '@chakra-ui/icons';

import { Voting } from '@types/contracts/Voting';
import { truncateAddress } from '@utils/wallet';
import { PollStatus } from './types';
import { useWalletContext } from '@components/dapp/WalletContext';
import { getVotingContract } from '@hooks/contractHelpers';
import React, { useState } from 'react';
import { ethers } from 'ethers';
//@ts-ignore
import * as circomlibjs from 'circomlibjs';
import { generateZkProof } from '@utils/zk/merkleproof';
import { generateBroadcastParams } from '@utils/zk/zk-witness';

export type VoitingItemPropsType = Voting.PollStructOutput & {};
export function VotingItem(props: VoitingItemPropsType) {
  console.log('props...', props);
  const { account, provider, chainId } = useWalletContext();
  const [userVote, setUserVote] = useState(1);
  const votingContract = React.useMemo(
    () => getVotingContract(chainId ?? 80001),
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
    if (provider == null) {
      return;
    }
    try {
      const poseidon = await circomlibjs.buildPoseidon();
      const hash = poseidon([
        '331812889988070315474899797239669195427483245251314189948350053350001993675',
        '39184590712359246591969895646062619400571013490210628362121405247373753684',
      ]);
      console.log('commitment....', hash);
      console.log('test======>.', poseidon.F.toString(hash));
      // const leaves = await votingContract.getRegisteredCommitments();
      // const { pathElements: siblings, indices: pathIndices } = generateZkProof(
      //   leaves.map((l) => ethers.BigNumber.from(l).toBigInt()),
      //   hash,
      // );
      // const nullifierHash = poseidon([
      //   '39184590712359246591969895646062619400571013490210628362121405247373753684',
      //   ethers.BigNumber.from(userVote).toBigInt(),
      // ]);
      // const circuitInputs = {
      //   idN: ,
      //   idT: ,
      //   treePathIndices: pathIndices,
      //   treeSiblings: siblings,
      //   signalHash:  ethers.BigNumber.from(userVote).toBigInt(),
      //   externalNullifier:ethers.BigNumber.from(props.pollId).toBigInt()
      // };

      // const fullProof = await generateBroadcastParams(circuitInputs, 'voting');

      // const [a, b, c, input] = fullProof;

      // const tx = await votingContract
      //   ?.connect(provider.getSigner())
      //   .castVote(
      //     props.pollId,
      //     nullifierHash,
      //     props.pollId,
      //     [...a, ...b[0], ...b[1], ...c],
      //     input,
      //   );
      // if (tx?.hash) {
      //   console.log('tx sent');
      // }
    } catch (e) {
      console.log('Error sending tx', e);
    }
  };
  return (
    <Center py={6}>
      <Box
        w={'320px'}
        h={'350px'}
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
              <TagLabel>
                {props.votes.filter((v) => v.toNumber() === 1).length} Yes
              </TagLabel>
              <TagRightIcon as={CheckIcon} fontSize="12px" />
            </Tag>

            <Tag
              size="lg"
              key="no"
              borderRadius="full"
              variant="solid"
              colorScheme="red"
            >
              <TagLabel>
                {}
                {props.votes.filter((v) => v.toNumber() === 0).length} No
              </TagLabel>
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
            <Flex
              alignContent="center"
              alignItems="center"
              justify="space-between"
              border="1px solid red"
            >
              <Text
                color={'black'}
                textAlign="justify"
                mt={8}
                fontSize="lg"
                as="b"
              >
                Vote:
              </Text>
              <Flex>
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
                <Button
                  variant="solid"
                  bg="black"
                  _hover={{ bg: 'gray.600' }}
                  ml="24px"
                  color="white"
                >
                  Cast Vote
                </Button>
              </Flex>
            </Flex>
          )}

          {/* <Link isExternal aria-label="Go to GitHub page" href="">
              <Icon
                as={GithubIcon}
                display="block"
                transition="color 0.2s"
                w="5"
                h="5"
                _hover={{ color: 'gray.600' }}
              />
            </Link> */}
          <Text color={'black'} textAlign="justify" mt={8}>
            Quorum: {props.quorum.toNumber()}
          </Text>
          <Text color={'black'} textAlign="justify" mt={8}>
            Created by:{' '}
            {props.creator === account ? 'You' : truncateAddress(props.creator)}
          </Text>
          <Text color={'black'} textAlign="justify" mt={8}>
            Created at: 12/21/2022
          </Text>
          {/* <Link isExternal aria-label="Go to Website page" href="">
            <Icon
              as={ExternalLinkIcon}
              display="block"
              transition="color 0.2s"
              w="5"
              h="5"
              _hover={{ color: 'gray.600' }}
            />
          </Link> */}
        </Stack>
      </Box>
    </Center>
  );
}
