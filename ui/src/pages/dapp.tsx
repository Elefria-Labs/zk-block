import React from 'react';
import { Typography, styled, Box, Grid, Paper } from '@mui/material';
import dynamic from 'next/dynamic';

import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import BaseButton from '@components/common/BaseButton';

import Footer from '@components/home/Footer';
import NavBar from '@components/home/Nav';
import { generateBroadcastParams } from '@utils/ zk/zk-witness';
import { ethers } from 'ethers';
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
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
        style={{ maxWidth: '1080px' }}
      >
        <Grid container spacing={2} border="1px solid red">
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
        {/* Grid */}
        <Box
          style={{
            display: 'flex',
            flexGrow: '1',
            flexDirection: 'row',
            alignSelf: 'center',
            maxWidth: '1080px',
            border: '1px solid red',
          }}
        >
          <Row mt={8} justifyContent="flex-end" border="1px solid green">
            <DynamicComponentWithNoSSR />
          </Row>
          <Row mt={8} justifyContent="flex-end">
            <BaseButton
              variant="contained"
              onClick={async () => {
                const callData = await generateBroadcastParams({
                  ...{
                    ageLimit: 18,
                    age: 21, // ethers.BigNumber.from(22).toBigInt(),
                  },
                });
                console.log('callData', callData);
              }}
            >
              Verify Age
            </BaseButton>
          </Row>
        </Box>
      </Box>

      <Footer />
    </Main>
  );
};

export default Dapp;
