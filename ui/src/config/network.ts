import { toHex } from '@utils/wallet';

export const networkConfig: Record<string, any> = {
  '0x1': {
    name: 'Ethereum Mainnet',
    chainName: 'ETH',
    icon: 'ethereum',
    rpcUrls: [
      'https://mainnet.infura.io/v3/',
      'wss://mainnet.infura.io/ws/v3/',
      'https://api.mycryptoapi.com/eth',
      'https://cloudflare-eth.com',
    ],
    faucets: [],
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    infoURL: 'https://ethereum.org',
    shortName: 'eth',
    chainId: 1,
    networkId: 1,
    slip44: 60,
    ens: {
      registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    },
    blockExplorerUrls: [
      {
        name: 'etherscan',
        url: 'https://etherscan.io',
        standard: 'EIP3091',
      },
    ],
  },
  '0x3': {
    name: 'Ropsten Testnet',
    title: 'Ethereum Testnet Ropsten',
    chainName: 'ETH',
    rpcUrls: [
      'https://ropsten.infura.io/v3/',
      'wss://ropsten.infura.io/ws/v3/',
    ],
    faucets: [
      'http://fauceth.komputing.org?chain=3&address=',
      'https://faucet.ropsten.be',
    ],
    nativeCurrency: {
      name: 'Ropsten Ether',
      symbol: 'ROP',
      decimals: 18,
    },
    infoURL: 'https://github.com/ethereum/ropsten',
    shortName: 'rop',
    chainId: 3,
    networkId: 3,
    ens: {
      registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
    },
    blockExplorerUrls: [
      {
        name: 'etherscan',
        url: 'https://ropsten.etherscan.io',
        standard: 'EIP3091',
      },
    ],
  },

  '0x6357d2e0': {
    name: 'Harmony Testnet Shard 0',
    chainName: 'Harmony',
    rpcUrls: ['https://api.s0.b.hmny.io'],
    faucets: ['https://faucet.pops.one'],
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18,
    },
    infoURL: 'https://www.harmony.one/',
    shortName: 'hmy-b-s0',
    chainId: 1666700000,
    networkId: 1666700000,
    blockExplorerUrls: [
      {
        name: 'Harmony Testnet Block Explorer',
        url: 'https://explorer.pops.one',
        standard: 'EIP3091',
      },
    ],
  },
  '0x63564c40': {
    name: 'Harmony Mainnet Shard 0',
    chainName: 'Harmony',
    rpcUrls: ['https://api.harmony.one'],
    faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18,
    },
    infoURL: 'https://www.harmony.one/',
    shortName: 'hmy-s0',
    chainId: 1666600000,
    networkId: 1666600000,
    blockExplorerUrls: [
      {
        name: 'Harmony Block Explorer',
        url: 'https://explorer.harmony.one',
        standard: 'EIP3091',
      },
    ],
  },

  '0x89': {
    name: 'Polygon Mainnet',
    chainName: 'Polygon',
    rpcUrls: [
      'https://polygon-rpcUrls.com/',
      'https://rpcUrls-mainnet.matic.network',
      'https://matic-mainnet.chainstacklabs.com',
      'https://rpcUrls-mainnet.maticvigil.com',
      'https://rpcUrls-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpcUrls.bwarelabs.com',
    ],
    faucets: [],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    infoURL: 'https://polygon.technology/',
    shortName: 'MATIC',
    chainId: 137,
    networkId: 137,
    slip44: 966,
    blockExplorerUrls: [
      {
        name: 'polygonscan',
        url: 'https://polygonscan.com',
        standard: 'EIP3091',
      },
    ],
  },
  '0x13881': {
    name: 'Polygon Testnet Mumbai',
    title: 'Polygon Testnet Mumbai',
    chainName: 'Polygon',
    rpcUrls: [
      'https://matic-mumbai.chainstacklabs.com',
      'https://rpcUrls-mumbai.maticvigil.com',
      'https://matic-testnet-archive-rpcUrls.bwarelabs.com',
    ],
    faucets: ['https://faucet.polygon.technology/'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    infoURL: 'https://polygon.technology/',
    shortName: 'maticmum',
    chainId: 80001,
    networkId: 80001,
    blockExplorerUrls: [
      {
        name: 'polygonscan',
        url: 'https://mumbai.polygonscan.com',
        standard: 'EIP3091',
      },
    ],
  },

  '0x38': {
    name: 'Binance Smart Chain Mainnet',
    chainName: 'BSC',
    rpcUrls: [
      'https://bsc-dataseed1.binance.org',
      'wss://bsc-ws-node.nariox.org',
    ],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
    },
    infoURL: 'https://www.binance.org',
    shortName: 'bnb',
    chainId: 56,
    networkId: 56,
    slip44: 714,
    blockExplorerUrls: [
      {
        name: 'bscscan',
        url: 'https://bscscan.com',
        standard: 'EIP3091',
      },
    ],
  },
  '0x61': {
    name: 'Binance Smart Chain',
    chainName: 'BSC',
    rpcUrls: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
    ],
    faucets: ['https://testnet.binance.org/faucet-smart'],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'tBNB',
      decimals: 18,
    },
    infoURL: 'https://testnet.binance.org/',
    shortName: 'bnbt',
    chainId: 97,
    networkId: 97,
    blockExplorerUrls: [
      {
        name: 'bscscan-testnet',
        url: 'https://testnet.bscscan.com',
        standard: 'EIP3091',
      },
    ],
  },
  '0x118': {
    name: 'zkSync alpha testnet',
    chainName: 'ZkSync',
    rpcUrls: ['https://zksync2-testnet.zksync.dev'],
    faucets: ['https://portal.zksync.io/bridge/faucet'],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    infoURL: 'https://v2-docs.zksync.io/dev/testnet/important-links.html',
    shortName: 'zksync',
    chainId: 280,
    networkId: 280,
    blockExplorerUrls: [
      {
        name: 'ZkSync Block Explorer',
        url: 'https://zksync2-testnet.zkscan.io/',
      },
    ],
  },
};

export type AddEthereumChainParameterType = {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
};

export const getNetworkForMetamask = (
  network: any,
): AddEthereumChainParameterType => {
  delete network['name'];
  delete network['faucets'];
  delete network['infoURL'];
  delete network['networkId'];
  delete network['shortName'];
  delete network['title'];
  delete network['blockExplorerUrls'];
  network['chainId'] = toHex(network['chainId']);
  return network;
};
