import React from 'react';

import BaseButton, { maxButtonWidth } from '@components/common/BaseButton';
import { textFieldStyle } from '@components/common/BaseTextField';
import { networkOptions, useWalletConnect } from '@hooks/useWalletConnect';
import {
  Box,
  FormControl,
  MenuItem,
  Typography,
  TextField,
} from '@mui/material';
import { truncateAddress } from '@utils/wallet';

const WalletConnectComponent = () => {
  const {
    account,
    chainId,
    connectWallet,
    switchNetwork,
    setNetwork,
    web3Modal,
    disconnect,
  } = useWalletConnect();

  const handleNetworkSelect = (event: any) => {
    setNetwork(event.target.value);
    switchNetwork(event.target.value);
  };

  React.useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

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
        <FormControl style={{ width: maxButtonWidth }}>
          {/* <InputLabel id="network-select-label">Network</InputLabel> */}
          <TextField
            select
            id="network-select"
            value={chainId?.toString()}
            onChange={handleNetworkSelect}
            margin="none"
            inputProps={{
              style: { ...textFieldStyle, padding: 0 },
            }}
          >
            {networkOptions
              .filter((network) => network.name.toLowerCase().includes('test'))
              .map((network) => (
                <MenuItem
                  key={`${network.chainId}`}
                  value={network.chainId}
                  disabled={network.chainId?.toString() !== '1666700000'}
                >{`${network.name} (${network.chainName})`}</MenuItem>
              ))}
          </TextField>
        </FormControl>
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
