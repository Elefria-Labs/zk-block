import React from 'react';

import { Box, Container } from '@chakra-ui/react';
// import dynamic from 'next/dynamic';
import { Meta } from '@layout/Meta';
import { Main } from '@templates/Main';
import WalletConnectComponent from '@components/dapp/WalletConnection';
import AgeCheck from '../components/dapp/AgeCheck';

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../components/dapp/AgeCheck'),
//   {
//     ssr: false,
//   },
// );
// const WalletConnectComponent = dynamic(
//   () => import('../components/dapp/WalletConnection'),
//   {
//     ssr: false,
//   },
// );

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
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Container maxW="container.lg">
          <Box
            display="flex"
            flexDirection="row"
            flex="1"
            justifyContent="center"
          >
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
              <AgeCheck />
            </Box>
          </Box>
        </Container>
      </Box>
    </Main>
  );
};

export default Dapp;
