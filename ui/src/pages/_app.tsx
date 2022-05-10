import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';

import themes from '../themes';
import Providers from '../utils/Providers';
import '../styles/global.css';
import '@firebase/firebase-config';
import WalletContextProvider from '@components/dapp/WalletContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <WalletContextProvider>
        <ThemeProvider theme={themes()}>
          <Component {...pageProps} />
        </ThemeProvider>
      </WalletContextProvider>
    </Providers>
  );
};
export default MyApp;
