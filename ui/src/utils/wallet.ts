export function truncateAddress(address: string): string {
  if (!address) return 'No Account';
  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/,
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
}

export function toHex(num: number) {
  const val = Number(num);
  return '0x' + val.toString(16);
}
