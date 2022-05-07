import React from 'react';

import { maxButtonHeight } from '@components/common/BaseAlert';
import BaseButton, { maxButtonWidth } from '@components/common/BaseButton';
import { textFieldStyle } from '@components/common/BaseTextField';
import { contractAddresses } from '@config/constants';
import { networkOptions } from '@hooks/useWalletConnect';

import {
  Box,
  FormControl,
  MenuItem,
  Typography,
  TextField,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { truncateAddress } from '@utils/wallet';
import { useWalletContext } from './WalletContext';

const supportedChains = Object.keys(contractAddresses.ageCheck ?? {});

const BootstrapInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '2px solid black',
    fontSize: 14,
    width: `${maxButtonWidth}`,
    padding: '8.5px 12px',

    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.1rem`,
      borderColor: theme.palette.primary.main,
    },

    margin: 0,
  },
}));

const WalletConnectComponent = () => {
  const {
    account,
    chainId,
    connectWallet,
    switchNetwork,
    setNetwork,
    web3Modal,
    disconnect,
  } = useWalletContext();

  const handleNetworkSelect = (event: any) => {
    switchNetwork(event.target.value);
    setNetwork(event.target.value);
    connectWallet();
  };

  React.useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal, connectWallet]);

  const ChainIdSelect = React.memo(() => (
    <FormControl style={{ width: maxButtonWidth, height: maxButtonHeight }}>
      <BootstrapInput
        select
        id="network-select"
        value={chainId?.toString()}
        onChange={handleNetworkSelect}
        margin="none"
        inputProps={{
          style: { ...textFieldStyle, padding: 0, margin: 0 },
        }}
      >
        {networkOptions
          .filter((network) => network.name.toLowerCase().includes('test'))
          .map((network) => {
            return (
              <MenuItem
                key={`${network.chainId}`}
                value={network.chainId.toString()}
                disabled={
                  supportedChains.includes(network.chainId.toString()) === false
                }
              >{`${network.name} (${network.chainName})`}</MenuItem>
            );
          })}
      </BootstrapInput>
    </FormControl>
  ));
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        height: '140px',
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <ChainIdSelect />
        <Box ml="8px">
          {!account ? (
            <BaseButton variant="contained" onClick={connectWallet}>
              Connect Wallet
            </BaseButton>
          ) : (
            <BaseButton variant="contained" onClick={disconnect}>
              Disconnect
            </BaseButton>
          )}
        </Box>
      </Box>
      {account && (
        <>
          <Typography>{`Account: ${truncateAddress(account)}`}</Typography>
          <Typography>{`Network ID: ${chainId ?? 'No Network'}`}</Typography>
        </>
      )}
    </Box>
  );
};

export default WalletConnectComponent;
