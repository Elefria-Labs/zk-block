import React from 'react';
import { Typography, styled, Box } from '@mui/material';
import dynamic from 'next/dynamic';

import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

import Footer from '@components/home/Footer';
import NavBar from '@components/home/Nav';
//import WalletConnectComponent from '@components/dapp/WalletConnect';

//const contentHeight = `calc(100vh - ${navBarHeight} - ${footerHeight})`;

const Title = styled(Typography)((_) => ({
  color: 'black',
}));

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/dapp/WalletConnection'),
  {
    ssr: false,
  },
);

const Row = styled(Box)((_) => ({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
}));

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
      <Box display="flex" flexDirection="row" justifyContent="center">
        <NavBar />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
      >
        {/* Grid */}
        <Box
          style={{
            display: 'flex',
            flexGrow: '1',
            flexDirection: 'column',
            alignSelf: 'center',
            maxWidth: '1080px',
            border: '1px solid red',
          }}
        >
          <Row mt={8} justifyContent="flex-end">
            <DynamicComponentWithNoSSR />
          </Row>
        </Box>
      </Box>

      <Footer />
    </Main>
  );
};

export default Dapp;
