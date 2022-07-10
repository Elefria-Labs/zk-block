import { networkConfig } from '@config/network';
import { Voting } from '@types/contracts/Voting';
import { toHex } from '@utils/wallet';
import { ethers } from 'ethers';

import AgeCheckContract from '../abi/AgeCheck.json';
import VotingContract from '../abi/Voting.json';
import { AgeCheck } from '../types/contracts/AgeCheck';
import { getAgeCheckAddress, getContractAddressByName } from './addressHelpers';

const getAbiByContractName: Record<string, any> = {
  ageCheck: AgeCheckContract.abi,
};

export const getRpcUrlByChainId = (chainId: number): string => {
  const networkRpc = networkConfig[toHex(chainId).toString()].rpcUrls[0];
  return networkRpc;
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
export const getVotingContract = (chainId: number) => {
  try {
    const contractAddr = getContractAddressByName('voting', chainId);
    return getContract(VotingContract.abi, contractAddr, chainId) as Voting;
  } catch (e) {
    console.log(`Error getting contract for the chainId ${chainId}`, e);
  }
  return undefined;
};

export const getContractByName = (contractName: string, chainId: number) => {
  try {
    const contractAddr = getContractAddressByName(contractName, chainId);
    const contractAbi = getAbiByContractName[contractName];
    // TODO dynamic type
    return getContract(contractAbi, contractAddr, chainId) as AgeCheck;
  } catch (e) {
    console.log(`Error getting contract for the chainId ${chainId}`);
  }
};
