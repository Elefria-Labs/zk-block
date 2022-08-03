import * as circomlibjs from 'circomlibjs';
import { hasZkId, retrieveZkId } from './storage';
const { ZkIdentity } = require('@libsem/identity');

export const posiedonHash = async (values: any[]): Promise<string> => {
  const poseidon = await circomlibjs.buildPoseidon();
  const hash = poseidon(values);
  return poseidon.F.toString(hash);
};

export const getIdFromStore = (account: string) => {
  if (!hasZkId(account)) {
    return;
  }

  const serializedIdentity = retrieveZkId(account.substring(0, 5));
  const identity: typeof ZkIdentity =
    ZkIdentity.genFromSerialized(serializedIdentity);
  return identity;
};

export const getCommitment = async (
  account: string,
): Promise<string | undefined> => {
  const identity: typeof ZkIdentity | undefined = getIdFromStore(account);

  if (identity == null) {
    return;
  }
  const { identityNullifier, identityTrapdoor } = identity.getIdentity();
  console.log('idt', identityTrapdoor, ' idn', identityNullifier);
  return await posiedonHash([
    BigInt(identityTrapdoor),
    BigInt(identityNullifier),
  ]);
};

export const tryTx = async (fn: any) => {
  if (typeof fn == 'function') {
    {
      try {
        return await fn();
      } catch (e) {
        console.log('Err sending tx: ', e);
      }
    }
  }
};
