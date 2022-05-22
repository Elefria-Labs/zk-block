import React, { useEffect, useCallback } from 'react';

import {
  Text,
  Box,
  Heading,
  Button,
  Collapse,
  Input,
  Flex,
  Alert,
  FormHelperText,
} from '@chakra-ui/react';

import { getAgeCheckContract } from '@hooks/contractHelpers';
import { generateBroadcastParams } from '@utils/ zk/zk-witness';
import { truncateAddress } from '@utils/wallet';

import { useWalletContext } from './WalletContext';

const AgeCheck = () => {
  const [age, setAge] = React.useState<number>(19);
  const [error, setError] = React.useState<string | undefined>();
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

    try {
      const [a, b, c, input] = await generateBroadcastParams({
        ...{
          ageLimit: 18,
          age,
        },
      });
      setError(undefined);
      const proof = [...a, ...b[0], ...b[1], ...c];
      try {
        const tx = await ageCheckContract
          .connect(provider.getSigner())
          .verifyAge(proof, input);
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
    } catch (e) {
      setError('Failed to generate proof, possibly age not valid.');
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Heading variant={'h2'}>
          Age verification using Zero Knowledge Proofs.
        </Heading>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Box
          sx={{
            height: '140px',
            width: '300px',
            backgroundColor: '#D0CDD7',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '16px',
          }}
        >
          {account ? (
            <Box display="flex" flexDirection="column" justifyContent="center">
              <AgeVerfiedText />
              <Button variant="solid" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          ) : (
            <Text fontSize="lg" variant="bold" as="b">
              {' '}
              Please connect your wallet.
            </Text>
          )}
        </Box>
      </Box>
      <Flex justifyContent="center">
        <Input
          id="outlined-basic"
          value={age}
          type="number"
          disabled={!account}
          onChange={(e) => setAge(Number(e.target.value ?? 0))}
          isInvalid={!!error}
          // helperText={!!error && error}
          w="140px"
          style={{ marginRight: '8px' }}
        />
        {error && <FormHelperText>{error}</FormHelperText>}
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
      </Flex>
    </div>
  );
};

export default AgeCheck;
