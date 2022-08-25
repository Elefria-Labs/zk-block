// @ts-ignore
import * as circomlibjs from 'circomlibjs';
import { hasZkId, retrieveZkId } from './storage';
const { ZkIdentity } = require('@libsem/identity');

export const posiedonHash = async (values: any[]): Promise<string> => {
  const poseidon = await circomlibjs.buildPoseidon();
  const hash = poseidon(values);
  return poseidon.F.toString(hash);
};

export const getIdFromStore = (account: string, chainId: number) => {
  if (chainId == null || !hasZkId(account, chainId)) {
    return;
  }

  const serializedIdentity = retrieveZkId(account, chainId);
  const identity: typeof ZkIdentity =
    ZkIdentity.genFromSerialized(serializedIdentity);
  return identity;
};

export const getCommitment = async (
  account: string,
  chainId: number,
): Promise<string | undefined> => {
  const identity: typeof ZkIdentity | undefined = getIdFromStore(
    account,
    chainId,
  );

  if (identity == null) {
    return;
  }

  const { identityNullifier, identityTrapdoor } = identity.getIdentity();
  const hash = await posiedonHash([
    BigInt(identityTrapdoor),
    BigInt(identityNullifier),
  ]);
  return hash;
};

export const tryTx = async (fn: any) => {
  if (typeof fn == 'function') {
    {
      try {
        const result = await fn();
        return result;
      } catch (e) {
        console.log('Err sending tx: ', e);
      }
    }
  }
};
