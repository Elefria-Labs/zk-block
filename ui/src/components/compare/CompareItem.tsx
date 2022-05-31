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
  FormHelperText,
  Spinner,
  FormControl,
  Select,
  Divider,
} from '@chakra-ui/react';

import { getAgeCheckContract, getContractByName } from '@hooks/contractHelpers';
import {
  generateBroadcastParams,
  generatePlonkBroadcastParams,
} from '@utils/ zk/zk-witness';
import { truncateAddress } from '@utils/wallet';
import { providers } from 'ethers';
import ProofSelect, { ProofType } from './ProofSelect';

type CompareItemPropsType = {
  account: string;
  provider: providers.Web3Provider;
  chainId: number;
  contractName: string;
};
const CompareItem = (props: CompareItemPropsType) => {
  const { chainId, provider, account, contractName } = props;

  const [age, setAge] = React.useState<number>(19);
  const [proofType, setProofType] = React.useState<ProofType | undefined>();
  const [error, setError] = React.useState<string | undefined>();
  const [statusMsg, setStatusMsg] = React.useState<string | undefined>();
  const [statusTrail, setStatusTrail] = React.useState<string[] | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = React.useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  const [ageVerified, setAgeVerified] = React.useState<boolean>(false);

  const contractInstance = React.useMemo(
    () => getContractByName(contractName, chainId ?? 1666700000),
    [chainId],
  );

  useEffect(() => {
    if (contractInstance == null || chainId == null || account == null) {
      return;
    }

    contractInstance.on('AgeVerfied', (address, isVerified) => {
      console.log('teste herer.........');

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
  }, [chainId, account, contractInstance]);

  const getAgeVerificationStatus = useCallback(async () => {
    if (account == null || contractInstance == null || chainId == null) {
      return;
    }

    const isVerified = await contractInstance.getVerficationStatus(account);

    if (isVerified) {
      setAgeVerified(true);
    }
  }, [contractInstance, account, chainId]);

  useEffect(() => {
    getAgeVerificationStatus();
  }, [account, getAgeVerificationStatus, chainId, contractInstance]);

  const handleVerify = async () => {
    console.log('he..', proofType);
    if (contractInstance == null || provider == null || proofType == null) {
      return;
    }
    console.log('here....');
    setLoading(true);
    setStatusMsg(`Generating ${proofType.name} Proof`);
    const startTime = Date.now();
    let timeForProof;
    try {
      const [a, b, c, input] = await generateBroadcastParams({
        ...{
          ageLimit: 18,
          age,
        },
      });

      const endTime = Date.now();
      timeForProof = (endTime - startTime) / 1000;
      setStatusTrail([`${proofType.name} Proof Generated in ${timeForProof}s`]);
      setError(undefined);

      setStatusMsg('Proof Generated..');
      const proof = [...a, ...b[0], ...b[1], ...c];
      console.log('proof', input);
      setStatusMsg('Verifying Proof..');
      try {
        const tx = await contractInstance
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

  const handleVerifyPlonk = async () => {
    if (contractInstance == null || provider == null || proofType == null) {
      return;
    }
    console.log('here....I am...........', age);
    setLoading(true);
    setStatusMsg(`Generating ${proofType.name} Proof`);
    const startTime = Date.now();
    let timeForProof;
    try {
      const params = await generatePlonkBroadcastParams(
        {
          ...{
            ageLimit: 18,
            age,
          },
        },
        true,
      );
      console.log(`params`, params[0]);
      console.log(`params`, params[1]);

      const endTime = Date.now();
      timeForProof = (endTime - startTime) / 1000;
      setStatusTrail([`${proofType.name} Proof Generated in ${timeForProof}s`]);
      setError(undefined);

      setStatusMsg('Proof Generated..');

      setStatusMsg('Verifying Proof..');
      try {
        const tx = await contractInstance
          .connect(provider.getSigner())
          .verifyUsingPlonk(params[0], params[1]);
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
    if (contractInstance == null || provider == null) {
      return;
    }
    try {
      const tx = await contractInstance
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

  const handleProofSelect = (value?: ProofType) => {
    if (value == null) {
      return;
    }
    setProofType(value);
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
    <Box
      borderWidth="1px"
      borderRadius="16px"
      width={['300px', '400px']}
      p="4"
      marginStart="16px"
    >
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Collapse
          in={alert.open}
          style={{ margin: 0, padding: 0, width: '100%' }}
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
        <Text fontSize={'16px'}>
          Age verification using Zero Knowledge Proofs.
        </Text>
      </Box>
      <Divider mb="16px" />
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

      <ProofSelect onChange={handleProofSelect} />

      <Flex flexDirection={'column'} justifyContent="center" mt="16px">
        <Divider />
        <Text fontSize="sm" as="b">
          Contract Inputs:
        </Text>
        <Flex justifyContent="center" mt="16px" mb="16px">
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
            onClick={() => {
              if (proofType?.name === 'plonk') {
                handleVerifyPlonk();
                return;
              }
              handleVerify();
            }}
            disabled={!account}
          >
            Verify Age
          </Button>
        </Flex>
        <Divider />
        <Text fontSize="sm" as="b">
          Status:
        </Text>
      </Flex>
      <Flex flexDirection="column" justifyContent="center" mt="8px">
        {statusTrail?.map((s) => (
          <Text fontSize="lg">{s}</Text>
        ))}
        <Flex justifyContent="center" mt="8px">
          <Text fontSize="lg">{statusMsg}</Text>
          {isLoading && <Spinner />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default CompareItem;
