import React from 'react';

import { AppProps } from 'next/app';
import '../styles/global.css';
import '@firebase/firebase-config';
import { ChakraProvider } from '@chakra-ui/react';
import WalletContextProvider from '@components/dapp/WalletContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS>
      <WalletContextProvider>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </WalletContextProvider>
    </ChakraProvider>
  );
};
export default MyApp;
