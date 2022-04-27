import { useState, useEffect } from 'react';

import { networkConfig } from '@config/network';
import { toHex } from '@utils/wallet';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

export const networkOptions = Object.values(networkConfig);

const providerOptions = {
  // walletconnect: {
  //   package: WalletConnect, // required
  //   options: {
  //     infuraId: INFURA_ID, // required
  //   },
  // },
};

export const useWalletModal = () => {
  const hasWindow = typeof window !== 'undefined';
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>();
  useEffect(() => {
    if (hasWindow) {
      setWeb3Modal(
        new Web3Modal({
          cacheProvider: true, // optional
          providerOptions, // required
        }),
      );
    }
  }, [hasWindow]);

  return web3Modal;
};

export const useWalletConnect = () => {
  const [web3ModalProvider, setWeb3ModalProvider] = useState<any>();
  const [provider, setProvider] = useState<any>();
  const [account, setAccount] = useState<string | undefined>();
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState<number | undefined>();
  const [network, setNetwork] = useState<number>(networkOptions[0]?.chainId);

  const web3Modal: Web3Modal | undefined = useWalletModal();

  const connectWallet = async () => {
    if (web3Modal == null) {
      return;
    }
    try {
      const modalProvider = await web3Modal.connect();
      const web3provider = new ethers.providers.Web3Provider(modalProvider);

      const accounts = await web3provider.listAccounts();
      const providerNetwork = await web3provider.getNetwork();
      setWeb3ModalProvider(modalProvider);
      setProvider(web3provider);
      if (accounts) {
        setAccount(accounts[0]);
      }
      setChainId(providerNetwork.chainId);
    } catch (error) {
      setError('Error connecting to wallet.');
    }
  };

  const switchNetwork = async (network?: number) => {
    if (network == null) {
      return;
    }

    try {
      await provider.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(network) }],
      });
      connectWallet();
    } catch (switchError) {
      if ((switchError as any).code === 4902) {
        try {
          await provider.provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkConfig[toHex(network)]],
          });
        } catch (error) {
          setError('Error swtich wallet.');
        }
      }
    }
  };
  const refreshState = () => {
    setAccount('');
    setChainId(undefined);
    setNetwork(networkOptions?.[0].chainId);
  };
  const disconnect = async () => {
    if (web3Modal == null) {
      return;
    }
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  // @ts-ignore
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
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  return {
    provider,
    web3ModalProvider,
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
