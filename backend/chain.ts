export const chainConfig = {
  eth: {
    mainnet: {
      name: "Ethereum Mainnet",
      chain: "ETH",
      icon: "ethereum",
      rpc: [
        "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
        "wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}",
        "https://api.mycryptoapi.com/eth",
        "https://cloudflare-eth.com"
      ],
      faucets: [],
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      infoURL: "https://ethereum.org",
      shortName: "eth",
      chainId: 1,
      networkId: 1,
      slip44: 60,
      ens: {
        registry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
      },
      explorers: [
        {
          name: "etherscan",
          url: "https://etherscan.io",
          standard: "EIP3091"
        }
      ]
    },
    testnet: {
      name: "Ropsten",
      title: "Ethereum Testnet Ropsten",
      chain: "ETH",
      rpc: ["https://ropsten.infura.io/v3/${INFURA_API_KEY}", "wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}"],
      faucets: ["http://fauceth.komputing.org?chain=3&address=${ADDRESS}", "https://faucet.ropsten.be?${ADDRESS}"],
      nativeCurrency: {
        name: "Ropsten Ether",
        symbol: "ROP",
        decimals: 18
      },
      infoURL: "https://github.com/ethereum/ropsten",
      shortName: "rop",
      chainId: 3,
      networkId: 3,
      ens: {
        registry: "0x112234455c3a32fd11230c42e7bccd4a84e02010"
      },
      explorers: [
        {
          name: "etherscan",
          url: "https://ropsten.etherscan.io",
          standard: "EIP3091"
        }
      ]
    }
  },
  one: {
    testnet: {
      name: "Harmony Testnet Shard 0",
      chain: "Harmony",
      rpc: ["https://api.s0.b.hmny.io"],
      faucets: ["https://faucet.pops.one"],
      nativeCurrency: {
        name: "ONE",
        symbol: "ONE",
        decimals: 18
      },
      infoURL: "https://www.harmony.one/",
      shortName: "hmy-b-s0",
      chainId: 1666700000,
      networkId: 1666700000,
      explorers: [
        {
          name: "Harmony Testnet Block Explorer",
          url: "https://explorer.pops.one",
          standard: "EIP3091"
        }
      ]
    },
    mainnet: {
      name: "Harmony Mainnet Shard 0",
      chain: "Harmony",
      rpc: ["https://api.harmony.one"],
      faucets: ["https://free-online-app.com/faucet-for-eth-evm-chains/"],
      nativeCurrency: {
        name: "ONE",
        symbol: "ONE",
        decimals: 18
      },
      infoURL: "https://www.harmony.one/",
      shortName: "hmy-s0",
      chainId: 1666600000,
      networkId: 1666600000,
      explorers: [
        {
          name: "Harmony Block Explorer",
          url: "https://explorer.harmony.one",
          standard: "EIP3091"
        }
      ]
    }
  },
  polygon: {
    mainnet: {
      name: "Polygon Mainnet",
      chain: "Polygon",
      rpc: [
        "https://polygon-rpc.com/",
        "https://rpc-mainnet.matic.network",
        "https://matic-mainnet.chainstacklabs.com",
        "https://rpc-mainnet.maticvigil.com",
        "https://rpc-mainnet.matic.quiknode.pro",
        "https://matic-mainnet-full-rpc.bwarelabs.com"
      ],
      faucets: [],
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      infoURL: "https://polygon.technology/",
      shortName: "MATIC",
      chainId: 137,
      networkId: 137,
      slip44: 966,
      explorers: [
        {
          name: "polygonscan",
          url: "https://polygonscan.com",
          standard: "EIP3091"
        }
      ]
    },
    testnet: {
      name: "Mumbai",
      title: "Polygon Testnet Mumbai",
      chain: "Polygon",
      rpc: [
        "https://matic-mumbai.chainstacklabs.com",
        "https://rpc-mumbai.maticvigil.com",
        "https://matic-testnet-archive-rpc.bwarelabs.com"
      ],
      faucets: ["https://faucet.polygon.technology/"],
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      infoURL: "https://polygon.technology/",
      shortName: "maticmum",
      chainId: 80001,
      networkId: 80001,
      explorers: [
        {
          name: "polygonscan",
          url: "https://mumbai.polygonscan.com",
          standard: "EIP3091"
        }
      ]
    }
  },
  bsc: {
    mainnet: {
      name: "Binance Smart Chain Mainnet",
      chain: "BSC",
      rpc: ["https://bsc-dataseed1.binance.org", "wss://bsc-ws-node.nariox.org"],
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18
      },
      infoURL: "https://www.binance.org",
      shortName: "bnb",
      chainId: 56,
      networkId: 56,
      slip44: 714,
      explorers: [
        {
          name: "bscscan",
          url: "https://bscscan.com",
          standard: "EIP3091"
        }
      ]
    },
    testnet: {
      name: "Binance Smart Chain Testnet",
      chain: "BSC",
      rpc: ["https://data-seed-prebsc-1-s1.binance.org:8545", "https://data-seed-prebsc-2-s1.binance.org:8545"],
      faucets: ["https://testnet.binance.org/faucet-smart"],
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "tBNB",
        decimals: 18
      },
      infoURL: "https://testnet.binance.org/",
      shortName: "bnbt",
      chainId: 97,
      networkId: 97,
      explorers: [
        {
          name: "bscscan-testnet",
          url: "https://testnet.bscscan.com",
          standard: "EIP3091"
        }
      ]
    }
  },
  zksync: {
    testnet: {
      name: "zkSync alpha testnet",
      chainName: "ZkSync",
      rpc: ["https://zksync2-testnet.zksync.dev"],
      faucets: ["https://portal.zksync.io/bridge/faucet"],
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18
      },
      infoURL: "https://v2-docs.zksync.io/dev/testnet/important-links.html",
      shortName: "zksync",
      chainId: 280,
      networkId: 280,
      explorers: [
        {
          name: "ZkSync Block Explorer",
          url: "https://zksync2-testnet.zkscan.io/"
        }
      ]
    },
    // please do not use the below config
    mainnet: {
      name: "zkSync alpha testnet",
      chainName: "ZkSync",
      rpc: ["https://zksync2-testnet.zksync.dev"],
      faucets: ["https://portal.zksync.io/bridge/faucet"],
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18
      },
      infoURL: "https://v2-docs.zksync.io/dev/testnet/important-links.html",
      shortName: "zksync",
      chainId: 280,
      networkId: 280,
      explorers: [
        {
          name: "ZkSync Block Explorer",
          url: "https://zksync2-testnet.zkscan.io/"
        }
      ]
    }
  }
}
