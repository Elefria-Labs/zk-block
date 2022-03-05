import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';

export const chainId =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? Number(1666600000)
    : Number(1666700000);
export const chainName =
  process.env.NEXT_PUBLIC_ENV === 'prod' ? 'Harmony' : 'Harmony Testnet';

export const explorers =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? ['https://explorer.harmony.one/']
    : ['https://explorer.pops.one/'];

const injected = new InjectedConnector({ supportedChainIds: [chainId] });
export enum ConnectorNames {
  Metamask = 'metamask',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Metamask]: injected,
};

export const getLibrary = (provider: any): Web3 => {
  return provider;
};
