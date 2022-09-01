import { useWalletContext } from '@components/dapp/WalletContext';
import { getCommitment } from '@components/voting/helpers';
import { DEFAULT_CHAIN_ID } from '@config/constants';
import { Dispatch, useEffect, useMemo, useReducer, useState } from 'react';
import { getVotingContract } from './contractHelpers';

export type ZkIDStateType = {
  zkId: Record<string, string>;
  confirmingTx: boolean;
};
export const initialState = {
  zkId: {},
  confirmingTx: false,
};
export enum actionType {
  register = 'REGISTER',
  confirmingTx = 'CONFIRMING_TX',
}
export const zkIdreducer = (state: ZkIDStateType, action: any) => {
  switch (action.type) {
    case actionType.register:
      const newState = { ...state, zkId: { ...state.zkId, ...action.zkId } };
      return newState;
    case actionType.confirmingTx:
      return { ...state, confirmingTx: action.confirmingTx };
    default:
      return state;
  }
};

export const useIsRegistered = (): {
  isRegistered: boolean;
  dispatch: Dispatch<any>;
  zkIdState: ZkIDStateType;
} => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [zkIdState, dispatch] = useReducer(zkIdreducer, initialState);
  const { chainId = DEFAULT_CHAIN_ID, account } = useWalletContext();
  const votingContract = useMemo(
    () => getVotingContract(chainId ?? DEFAULT_CHAIN_ID),
    [chainId],
  );
  useEffect(() => {
    if (votingContract == null || account == null) {
      return;
    }
    votingContract?.on(
      'CommitmentRegistered',
      (userAddress: string, _: string) => {
        if (userAddress === account) {
          setIsRegistered(true);
          dispatch({ type: actionType.confirmingTx, confirmingTx: false });
        }
      },
    );
    votingContract?.on('PollCreated', (_: string, userAddress: string) => {
      if (userAddress === account) {
        dispatch({ type: actionType.confirmingTx, confirmingTx: false });
      }
    });
    votingContract?.on('PollEnded', (_: string, userAddress: string) => {
      if (userAddress === account) {
        dispatch({ type: actionType.confirmingTx, confirmingTx: false });
      }
    });
  }, [votingContract, account]);

  const getRegisterationStatus = async () => {
    if (account == null || chainId == null || votingContract == null) {
      return;
    }
    console.log('chainId', chainId);
    const commitment = await getCommitment(account, chainId);
    console.log('commitment', commitment);
    if (commitment == null) {
      return;
    }

    const isRegistered = await votingContract?.registeredCommitmentsMapping(
      commitment,
    );
    setIsRegistered(isRegistered);
  };

  useEffect(() => {
    if (votingContract == null || chainId == null || account == null) {
      return;
    }

    if (zkIdState.zkId[account] != null) {
      setIsRegistered(true);
    }
    getRegisterationStatus();
  }, [chainId, account, votingContract, zkIdState]);

  return { isRegistered, dispatch, zkIdState };
};
