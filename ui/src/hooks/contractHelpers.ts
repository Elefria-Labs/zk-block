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
  return getContract(
    AgeCheckContract.abi,
    getAgeCheckAddress(chainId),
    chainId,
  ) as AgeCheck;
};
