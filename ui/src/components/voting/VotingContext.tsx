import React, { Dispatch } from 'react';

import {
  initialState,
  useIsRegistered,
  ZkIDStateType,
} from '@hooks/useIsRegisteredId';

type VotingContextProviderPropsType = {
  children: React.ReactElement;
};

export type VotingContextProviderType = {
  isRegistered: boolean;
  dispatch: Dispatch<any>;
  zkIdState: ZkIDStateType;
};

const VotingContext = React.createContext<VotingContextProviderType>({
  isRegistered: false,
  zkIdState: initialState,
} as VotingContextProviderType);

function VotingContextProvider(props: VotingContextProviderPropsType) {
  const votingData = useIsRegistered();

  return (
    <VotingContext.Provider value={{ ...votingData }}>
      {props.children}
    </VotingContext.Provider>
  );
}

export default VotingContextProvider;

export const useVotingContext = (): VotingContextProviderType => {
  const votingContext = React.useContext(VotingContext);
  if (Object.keys(votingContext).length === 0) {
    throw new Error(`Missing votingContext provider`);
  }
  return votingContext;
};
