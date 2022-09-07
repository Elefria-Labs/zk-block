import React, { useEffect } from 'react';

import {
  Box,
  Heading,
  Button,
  Flex,
  Divider,
  Container,
  useDisclosure,
  TabPanels,
  TabPanel,
  Tabs,
  TabList,
  Tab,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  IconButton,
  Spinner,
  Icon,
} from '@chakra-ui/react';

import { getVotingContract } from '@hooks/contractHelpers';
import { useWalletContext } from '@components/dapp/WalletContext';
import { CreatePollModal } from './CreatePollModal';
import { RegisterCommitmentModal } from './RegisterCommitmentModal';
import ActivePolls from './ActivePolls';
import MyPolls from './MyPolls';
import { Voting } from '../../types/contracts/Voting';
import { PollStatus } from './types';
import { InfoIcon } from '@chakra-ui/icons';
import { useVotingContext } from './VotingContext';
import { ethers } from 'ethers';
import PreviousPolls from './PreviousPolls';
import Link from 'next/link';
import { zkVoting } from '@config/constants';
import { YoutubeIcon } from '@components/icon/youtube';

const VotingDapp = () => {
  const { isRegistered, zkIdState } = useVotingContext();
  const { chainId, account } = useWalletContext();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activePolls, setActivePolls] = React.useState<
    Voting.PollStructOutput[]
  >([]);
  const votingContract = React.useMemo(
    () => getVotingContract(chainId ?? 80001),
    [chainId],
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: openRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();

  const getAllPolls = async () => {
    if (votingContract == null) {
      return;
    }
    setLoading(true);
    const activePolls = await votingContract.getAllPolls();
    setActivePolls(activePolls);
    setLoading(false);
  };
  useEffect(() => {
    if (votingContract == null || chainId == null || account == null) {
      return;
    }

    getAllPolls();
  }, [chainId, account, votingContract]);
  console.log('zkIdState.confirmingTx', zkIdState);
  return (
    <div>
      <Container maxW="container.lg" pb="16px">
        <Heading
          color="black"
          fontSize={['22px', '22px', '28px']}
          mb={['8px', '8px', '16px']}
        >
          zkVoting
        </Heading>
        <Box py="8px" color="gray.200" display="flex" alignItems="center">
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label="Zk Voting Info"
                background={'white'}
                color="black"
                size="lg"
                icon={<InfoIcon fontSize="24" />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton color="black" />
              <PopoverHeader color="black">How it works!</PopoverHeader>
              <PopoverBody color="black">
                1. Register your ZkID. <br /> 2. Create a poll. <br /> 3. Invite
                others to vote!
                <br />
                <Divider my={4} />
                <Text as="b">Important</Text>
                <br />
                1. ZkID is stored in localstorage <br /> 2. Download it to be
                able to create poll or vote from any other address.
                <br />
                3. Your id commitment is registered on chain and proof is
                generated in browser.
                <br />
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Link aria-label="Go to GitHub page" href={zkVoting} passHref>
            <Icon
              as={YoutubeIcon}
              display="block"
              transition="color 0.2s"
              cursor="pointer"
              color="black"
              w="10"
              h="10"
              _hover={{ color: 'gray.600' }}
            />
          </Link>
          {zkIdState.confirmingTx && (
            <Text color="black">
              Confirming Tx.. <Spinner />
            </Text>
          )}
          {loading && (
            <Text color="black">
              Loading polls.. <Spinner />
            </Text>
          )}
        </Box>
        <Divider />

        <Flex my={['8px', '16px']}>
          <Button
            variant="solid"
            bg="black"
            _hover={{ bg: 'gray.600' }}
            color="white"
            onClick={onOpenRegister}
            disabled={isRegistered || !account}
          >
            Register
          </Button>
          <Button
            variant="solid"
            bg="black"
            _hover={{ bg: 'gray.600' }}
            ml="24px"
            color="white"
            onClick={onOpen}
            disabled={!account || !isRegistered}
          >
            Create Poll
          </Button>
        </Flex>
        <Divider />

        <Tabs>
          <TabList>
            <Tab>Active Polls</Tab>
            <Tab>My Polls</Tab>
            <Tab>Previous Polls</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ActivePolls
                polls={activePolls
                  .filter((p) => p.pollStatus == PollStatus.Started)
                  .sort(
                    (a, b) =>
                      ethers.BigNumber.from(b.createdAt).toNumber() -
                      ethers.BigNumber.from(a.createdAt).toNumber(),
                  )}
                isRegistered={isRegistered}
              />
            </TabPanel>
            <TabPanel>
              <MyPolls
                polls={activePolls
                  .filter((p) => p.creator == account)
                  .sort(
                    (a, b) =>
                      ethers.BigNumber.from(b.createdAt).toNumber() -
                      ethers.BigNumber.from(a.createdAt).toNumber(),
                  )}
                isRegistered={isRegistered}
              />
            </TabPanel>
            <TabPanel>
              <PreviousPolls
                polls={activePolls
                  .filter((p) => p.pollStatus == PollStatus.Ended)
                  .sort(
                    (a, b) =>
                      ethers.BigNumber.from(b.createdAt).toNumber() -
                      ethers.BigNumber.from(a.createdAt).toNumber(),
                  )}
                isRegistered={isRegistered}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <CreatePollModal isOpen={isOpen} onClose={onClose} />
      <RegisterCommitmentModal
        key={'register-modal'}
        isOpen={openRegister}
        onClose={onCloseRegister}
        isRegistered
      />
    </div>
  );
};

export default VotingDapp;
