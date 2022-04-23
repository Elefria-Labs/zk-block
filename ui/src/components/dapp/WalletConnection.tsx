import React from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Typography,
  TextField,
} from '@mui/material';
import BaseButton, { maxButtonWidth } from '@components/common/BaseButton';

import { networkOptions, useWalletConnect } from '@hooks/useWalletConnect';
import { truncateAddress } from '@utils/wallet';
import { textFieldStyle } from '@components/common/BaseTextField';

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
    console.log(`event.target.value`, event.target.value);
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
            value={chainId}
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
