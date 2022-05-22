import React from 'react';

import { Box, FormControl, Button, Text, Select } from '@chakra-ui/react';
import { contractAddresses } from '@config/constants';
import { networkOptions } from '@hooks/useWalletConnect';
import { truncateAddress } from '@utils/wallet';
import { useWalletContext } from './WalletContext';

const supportedChains = Object.keys(contractAddresses.ageCheck ?? {});

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
    <FormControl>
      <Select
        id="network-select"
        value={chainId?.toString()}
        onChange={handleNetworkSelect}
        margin="none"
      >
        {networkOptions
          .filter((network) => network.name.toLowerCase().includes('test'))
          .map((network) => {
            return (
              <option
                key={`${network.chainId}`}
                value={network.chainId.toString()}
                disabled={
                  supportedChains.includes(network.chainId.toString()) === false
                }
              >{`${network.name} (${network.chainName})`}</option>
            );
          })}
      </Select>
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
            <Button variant="solid" size="md" onClick={connectWallet}>
              Connect Wallet
            </Button>
          ) : (
            <Button variant="solid" size="md" onClick={disconnect}>
              Disconnect
            </Button>
          )}
        </Box>
      </Box>
      {account && (
        <>
          <Text fontSize="md">{`Account: ${truncateAddress(account)}`}</Text>
          <Text fontSize="md">{`Network ID: ${chainId ?? 'No Network'}`}</Text>
        </>
      )}
    </Box>
  );
};

export default WalletConnectComponent;
