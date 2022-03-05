// Array of available nodes to connect to
export const nodes =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? ['https://api.harmony.one']
    : ['https://api.s0.b.hmny.io'];

const getNodeUrl = () => {
  // const randomIndex = random(0, nodes.length - 1)

  return process.env.NEXT_PUBLIC_ENV === 'prod'
    ? 'https://api.harmony.one'
    : 'https://api.s0.b.hmny.io'; //`https://harmony-0-rpc.gateway.pokt.network`; //
};

export default getNodeUrl;
