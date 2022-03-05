// Set of helper functions to facilitate wallet setup

import { nodes } from './getRpcUrl';
import { chainId, chainName } from './web3react';

/**
 * Prompt the user to add a network on Metamask, or switch to ONE if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = (window as WindowChain).ethereum;
  if (provider) {
    try {
      //@ts-ignore
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: chainName,
            nativeCurrency: {
              name: 'Harmony',
              symbol: 'one',
              decimals: 18,
            },
            rpcUrls: nodes,
            blockExplorerUrls: ['https://explorer.pops.one/'],
          },
        ],
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the Harmony network on metamask because window.ethereum is undefined",
    );
    return false;
  }
};
