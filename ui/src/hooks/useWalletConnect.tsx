import { networkConfig } from '@config/network';
import { toHex } from '@utils/wallet';
import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const networkOptions = Object.values(networkConfig);

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

export const useWalletConnect = () => {
  const [provider, setProvider] = useState<any>();
  const [library, setLibrary] = useState<any>();
  const [account, setAccount] = useState<string | undefined>();

  const [error, setError] = useState('');
  const [chainId, setChainId] = useState<number | undefined>();
  const [network, setNetwork] = useState<number>(networkOptions[0]?.chainId);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);

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

  const switchNetwork = async (network: number) => {
    if (network == null) {
      return;
    }

    try {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(network) }],
      });
      connectWallet();
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkConfig[toHex(network)]],
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };
  const refreshState = () => {
    setAccount('');
    setChainId(undefined);
    setNetwork(undefined);
  };
  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  return {
    provider,
    account,
    network,
    chainId,
    connectWallet,
    disconnect,
    switchNetwork,
    setNetwork,
    web3Modal,
  };
};