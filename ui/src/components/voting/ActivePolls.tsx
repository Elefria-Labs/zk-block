import React, { useEffect, useCallback, useState } from 'react';

import {
  Text,
  Box,
  Heading,
  Button,
  Collapse,
  Input,
  Flex,
} from '@chakra-ui/react';

import { getAgeCheckContract, getVotingContract } from '@hooks/contractHelpers';
import { generateBroadcastParams } from '@utils/zk/zk-witness';
import { truncateAddress } from '@utils/wallet';
import { useWalletContext } from '@components/dapp/WalletContext';
import { ZkCircuit } from '@components/zk-circuit-card';
import { VotingItem } from './VotingItem';
import { CreatePollModal } from './CreatePollModal';
import { RegisterCommitmentModal } from './RegisterCommitmentModal';
import { Voting } from '@types/contracts/Voting';

export type ActiviePollsPropsType = {
  polls: Voting.PollStructOutput[];
};
const ActivePolls = (props: ActiviePollsPropsType) => {
  const [age, setAge] = React.useState<number>(19);
  const [error, setError] = React.useState<string | undefined>();
  const [statusMsg, setStatusMsg] = React.useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = React.useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [ageVerified, setAgeVerified] = React.useState<boolean>(false);
  const [activePolls, setActivePolls] = React.useState<
    Voting.PollStructOutput[]
  >([]);
  const { chainId, provider, account } = useWalletContext();

  const votingContract = React.useMemo(
    () => getVotingContract(chainId ?? 80001),
    [chainId],
  );

  // useEffect(() => {
  //   if (votingContract == null || chainId == null || account == null) {
  //     return;
  //   }

  //   // (async () => {
  //   //   const pollIds = await votingContract.pollIdCounter();
  //   //   console.log('pollIds', pollIds);
  //   // })();

  //   getPollId();
  // }, [chainId, account, votingContract]);

  // const getPollId = async () => {
  //   if (votingContract == null) {
  //     return;
  //   }
  //   console.log('getPollId');
  //   const activePolls = await votingContract.getAllPolls();
  //   setActivePolls(activePolls);
  //   console.log('activePolls', activePolls);
  // };

  //   const getAgeVerificationStatus = useCallback(async () => {
  //     if (account == null || votingContract == null || chainId == null) {
  //       return;
  //     }

  //     const isVerified = await votingContract.getVerficationStatus(account);

  //     if (isVerified) {
  //       setAgeVerified(true);
  //     }
  //   }, [votingContract, account, chainId]);

  //   useEffect(() => {
  //     getAgeVerificationStatus();
  //   }, [account, getAgeVerificationStatus, chainId, votingContract]);

  const handleVerify = async () => {
    if (votingContract == null || provider == null) {
      return;
    }
    setLoading(true);
    setStatusMsg('Generating Proof');
    try {
      const [a, b, c, input] = await generateBroadcastParams(
        {
          ...{
            ageLimit: 18,
            age,
          },
        },
        'voting',
      );
      setError(undefined);
      setStatusMsg('Proof Generated..');
      const proof = [...a, ...b[0], ...b[1], ...c];

      setStatusMsg('Verifying Proof..');
      try {
        // const tx = await votingContract
        //   .connect(provider.getSigner())
        //   .verifyUsingGroth(proof, input);
        // if (tx?.hash) {
        //   setAlert({
        //     open: true,
        //     message: `Transaction broadcasted with hash ${tx.hash}`,
        //   });
        // }
      } catch (e) {
        setAlert({
          open: true,
          message: `Error sending transaction. Please try again!`,
        });
        console.log(`Errror: ${e}`);
        setStatusMsg(undefined);
        setLoading(false);
      }
    } catch (e) {
      setError('Failed to generate proof, possibly age not valid.');
      setStatusMsg('Invalid proof');
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (votingContract == null || provider == null) {
      return;
    }
    try {
      //   const tx = await votingContract
      //     .connect(provider.getSigner())
      //     .setVerficationStatus(false);
      //   if (tx?.hash) {
      //     setAlert({
      //       open: true,
      //       message: `Transaction broadcasted with hash ${tx.hash}`,
      //     });
      //   }
    } catch (e) {
      setAlert({
        open: true,
        message: `Error sending transaction. Please try again!`,
      });
    }
  };
  //   const AgeVerfiedText = React.memo(() => {
  //     if (account == null) {
  //       return null;
  //     }
  //     return (
  //       <Text mb="8px">
  //         Age for<b> {truncateAddress(account) ?? ''} </b>{' '}
  //         {ageVerified ? 'is above 18.' : 'not verified.'}
  //       </Text>
  //     );
  //   });
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Flex
          border="1px solid red"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {props.polls.map((p, i) => (
            <VotingItem key={i} {...p} />
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default ActivePolls;
