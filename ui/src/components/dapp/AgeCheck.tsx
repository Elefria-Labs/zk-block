import React, { useEffect, useCallback } from 'react';

import BaseAlert from '@components/common/BaseAlert';
import BaseButton from '@components/common/BaseButton';
import { textFieldStyle } from '@components/common/BaseTextField';
import { getAgeCheckContract } from '@hooks/contractHelpers';
import CloseIcon from '@mui/icons-material/Close';
import {
  Typography,
  styled,
  Box,
  IconButton,
  Collapse,
  Paper,
  TextField,
} from '@mui/material';
import { generateBroadcastParams } from '@utils/ zk/zk-witness';
import { truncateAddress } from '@utils/wallet';

import { useWalletContext } from './WalletContext';

const Row = styled(Box)((_) => ({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
}));

const AgeCheck = () => {
  const [age, setAge] = React.useState<number>(19);
  const [error, setError] = React.useState<string | undefined>();
  const [open, setOpen] = React.useState<boolean>(false);
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

    ageCheckContract.on('AgeVerfied', (_: string) => {
      setOpen(true);
      setAgeVerified(true);
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

  return (
    <div>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Collapse in={open} sx={{ margin: 0, padding: 0, width: '300px' }}>
          <BaseAlert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="success"
            sx={{ mb: 2 }}
          >
            Verfied
          </BaseAlert>
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
        <Typography mb="8px" variant="h2">
          Age verification using Zero Knowledge Proofs.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: '140px',
            width: '300px',
            backgroundColor: '#D0CDD7',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            padding: '8px',
          }}
        >
          <Box display="flex" flexDirection="column" justifyContent="center">
            {account && (
              <Typography mb="8px">
                Age for<b> {truncateAddress(account) ?? ''} </b>{' '}
                {ageVerified ? 'is above 18.' : 'not verified.'}
              </Typography>
            )}
            <BaseButton
              variant="contained"
              onClick={async () => {
                if (ageCheckContract == null) {
                  return;
                }
                try {
                  await ageCheckContract
                    .connect(provider.getSigner())
                    .setVerficationStatus(false);
                  setAgeVerified(false);
                } catch (e) {
                  setError('Failed to generate proof, possibly age not valid.');
                  console.log('Err:', e);
                }
              }}
            >
              Reset
            </BaseButton>
          </Box>
        </Paper>
      </Box>
      <Row justifyContent="center" alignItems="flex-start">
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={age}
          type="number"
          onChange={(e) => setAge(Number(e.target.value ?? 0))}
          error={!!error}
          helperText={!!error && error}
          style={{ marginRight: '8px' }}
          inputProps={{ style: textFieldStyle }}
        />
        <BaseButton
          variant="contained"
          onClick={async () => {
            if (ageCheckContract == null) {
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
              await ageCheckContract
                .connect(provider.getSigner())
                .verifyAge(proof, input);
            } catch (e) {
              setError('Failed to generate proof, possibly age not valid.');
              console.log('Err:', e);
            }
          }}
        >
          Verify Age
        </BaseButton>
      </Row>
    </div>
  );
};

export default AgeCheck;
