import React from 'react';

import WalletContextProvider from '@components/dapp/WalletContext';
import Footer from '@components/home/Footer';
import NavBar from '@components/home/Nav';
import { Meta } from '@layout/Meta';
import { Box } from '@mui/material';
import { Main } from '@templates/Main';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/dapp/AgeCheck'),
  {
    ssr: false,
  },
);
const WalletConnectComponent = dynamic(
  () => import('../components/dapp/WalletConnection'),
  {
    ssr: false,
  },
);

const Dapp = () => {
  return (
    <Main
      meta={
        <Meta
          title="Zk Block | Boilerplate for ZK Dapps"
          description="Boilerplate for ZK Dapps | Zero Knowledge Proofs"
        />
      }
    >
      <WalletContextProvider>
        <>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <NavBar />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            flex="1"
            justifyContent="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              style={{ maxWidth: '1080px' }}
            >
              {/* Grid */}
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'center',
                  maxWidth: '1080px',
                  minHeight: '720px',
                  minWidth: '1080px',
                }}
              >
                <Box>
                  <WalletConnectComponent />
                </Box>
                <DynamicComponentWithNoSSR />
              </Box>
            </Box>
          </Box>
        </>
      </WalletContextProvider>
      <Footer />
    </Main>
  );
};

export default Dapp;
