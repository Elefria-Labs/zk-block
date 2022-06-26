import { contractAddresses } from '@config/constants';

export const getAgeCheckAddress = (selectedChainId: number): string => {
  return contractAddresses.ageCheck?.[selectedChainId.toString()] as string;
};

export const getContractAddressByName = (
  contractName: string,
  selectedChainId: number,
): string => {
  return contractAddresses?.[contractName]?.[
    selectedChainId.toString()
  ] as string;
};
