import { contractAddresses } from '@config/constants';

export const getAgeCheckAddress = (selectedChainId: number): string => {
  return contractAddresses.ageCheck?.[selectedChainId.toString()] as string;
};
