export const githubLink = 'https://github.com/heypran/zk-block';
export const twitterLink = 'https://twitter.com/zk_block';

export const contractAddresses: Record<string, Record<string, string>> = {
  ageCheck: {
    // Harmony
    '1666600000': '0xC0fE0d0389686FDA6dB07a7cC0f20841f4872775', // replace with mainnet addr
    '1666700000': '0x190C816f1D91E5D0f231bF9cF750066783bD8C43', // testnet
    // Polygon
    '137': '0xB9B1E14aC876a6997734119E734A02f1720fbA78', // replace with mainnet addr
    '80001': '0x841a8095c99762Ac3cdBFda59a31af5ae8C2101D', // testnet
  },
  voting: {
    // Polygon
    '80001': '0x7F4fB1448D3d8a72e312Bab54368Ad1D4FF10a52',
    // Harmony Devnet
    '1666900000': '0xC0fD6B7D04858b6C1B90Bac369b18c4B5424A0d0',
  },
  // add more contract addresses here...
};

export const Links = {
  home: 'https://zkblock.app/',
  tools: 'https://zkblock.app/',
  boilerplate: 'https://boilerplate.zkblock.app/',
  blog: 'https://blog.zkblock.app/',
  zkChains: 'https://www.zkblock.app/zk-networks',
  contribute: 'https://zkblock.app/contribute',
  about: 'https://zkblock.app/about',
  subscribe: 'https://zkblock.app/subscribe',
};

export const repoLink = 'https://github.com/heypran/zk-block';
export const hackernoonGuide = 'https://bit.ly/zkblock-ageverification';
export const zkVoting = 'https://youtu.be/uuw6GsDBzAk';

export const DEFAULT_CHAIN_ID = 80001;
