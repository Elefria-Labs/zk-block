import React, { useEffect, useCallback, useState } from 'react';

import {
  Text,
  Box,
  Heading,
  Button,
  Collapse,
  Input,
  Flex,
  Alert,
  Spinner,
  Divider,
  Container,
  useDisclosure,
} from '@chakra-ui/react';

import { getAgeCheckContract } from '@hooks/contractHelpers';
import { generateBroadcastParams } from '@utils/ zk/zk-witness';
import { truncateAddress } from '@utils/wallet';
import { useWalletContext } from '@components/dapp/WalletContext';
import { ZkCircuit } from '@components/zk-circuit-card';
import { VotingItem } from './VotingItem';
import { CreatePollModal } from './CreatePollModal';

const VotingDapp = () => {
  const [age, setAge] = React.useState<number>(19);
  const [error, setError] = React.useState<string | undefined>();
  const [statusMsg, setStatusMsg] = React.useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = React.useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [ageVerified, setAgeVerified] = React.useState<boolean>(false);
  const { chainId, provider, account } = useWalletContext();

  const ageCheckContract = React.useMemo(
    () => getAgeCheckContract(chainId ?? 1666700000),
    [chainId],
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (ageCheckContract == null || chainId == null || account == null) {
      return;
    }

    ageCheckContract.on('AgeVerfied', (address, isVerified) => {
      if (isVerified && address === account) {
        setAlert({
          open: true,
          message: `Age Verified for ${truncateAddress(address)}`,
        });
        setAgeVerified(true);
        setStatusMsg(undefined);
        setLoading(false);
        return;
      }
      if (!isVerified && address === account) {
        setAlert({
          open: true,
          message: `Age flag reset for ${truncateAddress(address)}`,
        });
        setAgeVerified(false);
        return;
      }
    });
  }, [chainId, account, ageCheckContract]);

  const getAgeVerificationStatus = useCallback(async () => {
    if (account == null || ageCheckContract == null || chainId == null) {
      return;
    }

    const isVerified = await ageCheckContract.getVerficationStatus(account);

    if (isVerified) {
      setAgeVerified(true);
    }
  }, [ageCheckContract, account, chainId]);

  useEffect(() => {
    getAgeVerificationStatus();
  }, [account, getAgeVerificationStatus, chainId, ageCheckContract]);

  const handleVerify = async () => {
    if (ageCheckContract == null || provider == null) {
      return;
    }
    setLoading(true);
    setStatusMsg('Generating Proof');
    try {
      const [a, b, c, input] = await generateBroadcastParams({
        ...{
          ageLimit: 18,
          age,
        },
      });
      setError(undefined);
      setStatusMsg('Proof Generated..');
      const proof = [...a, ...b[0], ...b[1], ...c];

      setStatusMsg('Verifying Proof..');
      try {
        const tx = await ageCheckContract
          .connect(provider.getSigner())
          .verifyUsingGroth(proof, input);
        if (tx?.hash) {
          setAlert({
            open: true,
            message: `Transaction broadcasted with hash ${tx.hash}`,
          });
        }
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
    if (ageCheckContract == null || provider == null) {
      return;
    }
    try {
      const tx = await ageCheckContract
        .connect(provider.getSigner())
        .setVerficationStatus(false);

      if (tx?.hash) {
        setAlert({
          open: true,
          message: `Transaction broadcasted with hash ${tx.hash}`,
        });
      }
    } catch (e) {
      setAlert({
        open: true,
        message: `Error sending transaction. Please try again!`,
      });
    }
  };
  const AgeVerfiedText = React.memo(() => {
    if (account == null) {
      return null;
    }
    return (
      <Text mb="8px">
        Age for<b> {truncateAddress(account) ?? ''} </b>{' '}
        {ageVerified ? 'is above 18.' : 'not verified.'}
      </Text>
    );
  });
  return (
    <div>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Collapse
          in={alert.open}
          style={{ margin: 0, padding: 0, width: '300px' }}
        >
          <Alert variant="subtle" status="success" sx={{ mb: 2 }}>
            <Text flexWrap={'wrap'} sx={{ wordBreak: 'break-word' }}>
              {alert.message}
            </Text>
          </Alert>
        </Collapse>
      </Box>
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
            onClick={handleVerify}
            disabled={!account}
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
            // disabled={!account}
          >
            Create Poll
          </Button>
        </Flex>
        <Divider />
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
            {[1, 2, 3, 5].map((i) => (
              <VotingItem key={i} />
            ))}
          </Flex>
        </Box>
        {/* <Flex justifyContent="center">
          <Input
            id="outlined-basic"
            value={age}
            type="number"
            disabled={!account}
            onChange={(e) => setAge(Number(e.target.value ?? 0))}
            isInvalid={!!error}
            errorBorderColor="red.300"
            w="140px"
            style={{ marginRight: '8px' }}
          />

          <Button
            variant="solid"
            bg="black"
            _hover={{ bg: 'gray.600' }}
            color="white"
            onClick={handleVerify}
            disabled={!account}
          >
            Verify Age
          </Button>
        </Flex> */}
        {/* <Flex justifyContent="center" mt="8px">
          <Text fontSize="lg">{statusMsg}</Text>
          {isLoading && <Spinner />}
        </Flex> */}
      </Container>
      <CreatePollModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default VotingDapp;
