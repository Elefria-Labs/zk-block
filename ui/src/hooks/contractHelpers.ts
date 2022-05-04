import { ethers } from 'ethers';

import AgeCheckContract from '../abi/AgeCheck.json';
import { AgeCheck } from '../types/contracts/AgeCheck';
import { getAgeCheckAddress } from './addressHelpers';

export const getRpcUrlByChainId = (_: number): string => {
  // TODO
  const rpc = 'https://api.s0.b.hmny.io';
  return rpc;
};

export const getRpcProviderByChainId = (chainId: number) => {
  return new ethers.providers.JsonRpcProvider(getRpcUrlByChainId(chainId));
};

const getContract = (abi: any, address: string, chainId: number) => {
  const signerOrProvider = getRpcProviderByChainId(chainId);

  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getAgeCheckContract = (chainId: number) => {
  try {
    const contractAddr = getAgeCheckAddress(chainId);

    return getContract(AgeCheckContract.abi, contractAddr, chainId) as AgeCheck;
  } catch (e) {
    console.log(`Error getting contract for the chainId ${chainId}`);
  }
  return undefined;
};
