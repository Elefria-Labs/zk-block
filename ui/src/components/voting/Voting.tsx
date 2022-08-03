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
} from '@chakra-ui/react';

import { getVotingContract } from '@hooks/contractHelpers';
import { useWalletContext } from '@components/dapp/WalletContext';
import { CreatePollModal } from './CreatePollModal';
import { RegisterCommitmentModal } from './RegisterCommitmentModal';
import ActivePolls from './ActivePolls';
import MyPolls from './MyPolls';
import { Voting } from '@types/contracts/Voting';
import { PollStatus } from './types';
import { getCommitment } from './helpers';

const VotingDapp = () => {
  const [isRegistered, setIsRegistered] = React.useState<boolean>(false);
  const { chainId, account } = useWalletContext();
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

  const getRegisterationStatus = async () => {
    if (account == null || votingContract == null) {
      return;
    }
    const commitment = await getCommitment(account);
    if (commitment == null) {
      return;
    }

    const isRegistered = await votingContract?.registeredCommitmentsMapping(
      commitment,
    );
    setIsRegistered(isRegistered);
  };

  const getAllPolls = async () => {
    if (votingContract == null) {
      return;
    }

    const activePolls = await votingContract.getAllPolls();
    setActivePolls(activePolls);
  };
  useEffect(() => {
    if (votingContract == null || chainId == null || account == null) {
      return;
    }

    getAllPolls();
    getRegisterationStatus();
  }, [chainId, account, votingContract]);

  return (
    <div>
      <Container maxW="container.lg" pb="16px">
        <Box py="8px" color="gray.200">
          <Heading
            color="black"
            fontSize={['22px', '22px', '28px']}
            mb={['8px', '8px', '16px']}
          >
            Voting
          </Heading>
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
          </TabList>

          <TabPanels>
            <TabPanel>
              <ActivePolls
                polls={activePolls.filter(
                  (p) => p.pollStatus !== PollStatus.Created,
                )}
                isRegistered={isRegistered}
              />
            </TabPanel>
            <TabPanel>
              <MyPolls
                polls={activePolls.filter((p) => p.creator == account)}
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
