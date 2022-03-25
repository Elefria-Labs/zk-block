import React, { useState } from 'react';
import { Typography, styled, Box } from '@mui/material';

import Web3Modal from 'web3modal';
import WalletConnect from '@walletconnect/web3-provider';

import BaseButton from '@components/common/BaseButton';
import { ethers } from 'ethers';
import { toHex, truncateAddress } from '@utils/wallet';
import { networkConfig } from '@config/networks';

const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad';

const providerOptions = {
  // walletconnect: {
  //   package: WalletConnect, // required
  //   options: {
  //     infuraId: INFURA_ID, // required
  //   },
  // },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const WalletConnectComponent = () => {
  const [provider, setProvider] = useState<any>();
  const [library, setLibrary] = useState<any>();
  const [account, setAccount] = useState<string | undefined>();
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState<number | undefined>();
  const [network, setNetwork] = useState<number | undefined>();
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      console.log('during connection------_>', provider);
      //console.log('during getChainId------_>', provider.getChainId());
      const library = new ethers.providers.Web3Provider(provider);
      console.log('during connection------_>', library);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };
  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    if (network == null) {
      return;
    }
    console.log('Hex------>', toHex(network));
    try {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkConfig[network.toString()]],
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: 'personal_sign',
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (library == null || account == null) {
      return;
    }
    try {
      const verify = await library.provider.request({
        method: 'personal_ecRecover',
        params: [signedMessage, signature],
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount('');
    setChainId(undefined);
    setNetwork(undefined);
    setMessage('');
    setSignature('');
    setVerified(false);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  React.useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  React.useEffect(() => {
    if (provider == null || provider?.on == null) {
      return;
    }
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string) => {
        console.log('accountsChanged', accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId: number) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log('disconnect', error);
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider == null || provider?.removeListener == null) {
          return;
        }
        provider.removeListener('accountsChanged', handleAccountsChanged);
        provider.removeListener('chainChanged', handleChainChanged);
        provider.removeListener('disconnect', handleDisconnect);
      };
    }
  }, [provider]);

  React.useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);
  const sevenup = new ethers.Contract(
    '0x95bE79b1F7C537AF7Ade05e1630373E54C71DD60',
    SevenUpJson.abi,
    library.getSigner(),
  );

  return (
    <Box
      style={{
        flexDirection: 'column',
        flex: 0.5,
        justifyContent: 'start',
      }}
    >
      {!account ? (
        <BaseButton variant="contained" onClick={connectWallet}>
          Connect Wallet
        </BaseButton>
      ) : (
        <BaseButton variant="contained" onClick={disconnect}>
          Disconnect
        </BaseButton>
      )}

      <p>{`Account: ${truncateAddress(account ?? '')}`}</p>
      <p>{`Network ID: ${chainId ? chainId : 'No Network'}`}</p>

      <BaseButton
        variant="contained"
        onClick={async () => {
          console.log(await sevenup.lastRoundId());
        }}
      >
        Rand
      </BaseButton>

      <BaseButton
        variant="contained"
        onClick={async () => {
          console.log(await sevenup.lastRoundId());
        }}
      >
        Last Round
      </BaseButton>
      <BaseButton
        variant="contained"
        onClick={async () => {
          //   if (switchNetwork == null) {
          //     return;
          //   }
          setNetwork(1666700000);
          switchNetwork();
        }}
      >
        Switch
      </BaseButton>
    </Box>
  );
};

export default WalletConnectComponent;
