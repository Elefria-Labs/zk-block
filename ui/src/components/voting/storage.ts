function getStorage() {
  if (typeof window === 'undefined') return undefined;
  return window.localStorage;
}
const localStorage = getStorage();

const keyNew = `zkblock_`;

const initStorage = () => {
  if (!localStorage?.getItem(keyNew)) {
    localStorage?.setItem(keyNew, '');
  }
};

const storeZkId = (zkId: string, accountKey: string) => {
  const key = `${keyNew}_${accountKey}`;
  localStorage?.setItem(key, zkId);
};

const retrieveZkId = (accountKey: string): string | undefined => {
  let serialisedIdentity;
  const key = `${keyNew}_${accountKey}`;
  try {
    serialisedIdentity = localStorage?.getItem(key) ?? '';
    return serialisedIdentity;
  } catch (e) {
    console.log('Error retrieving zkId', e);
  }
  return undefined;
};

const hasZkId = (accountKey: string): boolean => {
  const key = `${keyNew}_${accountKey.substring(0, 5)}`;
  const d = localStorage?.getItem(key);
  return d != null && d.length > 0;
};

export { initStorage, storeZkId, retrieveZkId, hasZkId };
