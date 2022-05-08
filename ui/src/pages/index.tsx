import React from 'react';

import { Typography, styled, Box } from '@mui/material';
import Link from 'next/link';

import BaseButton from '@components/common/BaseButton';
import DescriptionBlock from '@components/home/DescriptionBlock';
import DescriptionBlock2, {
  FeatureType,
} from '@components/home/DescriptionBlock2';
import Footer from '@components/home/Footer';
import NavBar from '@components/home/Nav';
import StatusChecklist from '@components/home/StatusChecklist';
import { Meta } from '@layout/Meta';
import { Main } from '@templates/Main';

const Title = styled(Typography)((_) => ({
  color: 'black',
}));

const Row = styled(Box)((_) => ({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
}));

const Divider = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(12)} 0`,
  border: '1px solid black',
  width: '120px',
  alignSelf: 'center',
}));
const featureSetUI: Array<FeatureType> = [
  {
    title: 'Material UI',
    description: 'Ready to use UI components from Material UI',
  },
  { title: 'NextJS', description: 'NextJs support for server-side rendering' },
  { title: 'Typescript', description: '' },
];

const featureSetZk: Array<FeatureType> = [
  {
    title: 'Zero Knowledge Proofs',
    description: 'Generate ZKPs from browser. Currently supports Groth16.',
  },
];
const Index = () => {
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
      <Box display="flex" flexDirection="row" justifyContent="center">
        {/* Grid */}
        <Box
          style={{
            display: 'flex',
            flex: '1',
            // height: `${contentHeight}`,
            flexDirection: 'column',
            alignContent: 'center',
            maxWidth: '1080px',
          }}
        >
          <Row mt={8}>
            <Box
              style={{
                flexDirection: 'column',
                flex: 0.5,
                justifyContent: 'start',
              }}
            >
              <Title variant="h1" fontWeight="normal" mb={1}>
                <b>Boilerplate</b> for building <b>ZK Dapps</b> on <b>Web3</b>
              </Title>
              {/* <Title variant="h4" mb={1}>
                for building
              </Title>
              <Title variant="h1" mb={1}>
                ZK Dapps
              </Title>
              <Title variant="h4" mb={1}>
                on
              </Title>
              <Title variant="h1">Web3</Title> */}

              <Title variant="h2" my={8}>
                Focus on Building
              </Title>
              <Link href="/dapp" passHref>
                <BaseButton variant="contained">Try Demo</BaseButton>
              </Link>
            </Box>
            <Box
              style={{
                flexDirection: 'column',
                flex: 0.5,
                justifyContent: 'start',
              }}
            >
              <StatusChecklist />
            </Box>
          </Row>

          <Divider />
          {/* 2nd Row */}
          <Row>
            <Box
              style={{
                flexDirection: 'column',
                flex: 0.5,
                justifyContent: 'start',
              }}
            >
              <DescriptionBlock2 features={featureSetUI} />
            </Box>
            <Box
              style={{
                flexDirection: 'column',
                flex: 0.5,
                justifyContent: 'start',
              }}
            >
              <Box>
                <img
                  src={`../../assets/images/next-js-logo.svg`}
                  style={{ height: '140px', width: 'auto' }}
                  alt="zk-block, boilerplate for zero knowledge dapps"
                />
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <img
                  src={`../../assets/images/mui.svg`}
                  style={{ height: '140px', width: 'auto' }}
                  alt="zk-block, boilerplate for zero knowledge dapps"
                />
              </Box>
            </Box>
          </Row>
          <Divider />
          {/* 3rd row */}
          <Row>
            <Box
              style={{
                flexDirection: 'column',
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={`../../assets/images/wallets/metamask.svg`}
                style={{ height: '240px', width: '240px' }}
                alt="zk-block, boilerplate for zero knowledge dapps"
              />
            </Box>
            <Box
              style={{
                flexDirection: 'column',
                flex: 0.5,
                justifyContent: 'start',
              }}
            >
              <DescriptionBlock />
            </Box>
          </Row>
          <Divider />
          {/* 4th Row */}
          <Row>
            <Box
              style={{
                flexDirection: 'column',
                flex: 0.5,
                justifyContent: 'start',
              }}
            >
              <DescriptionBlock2 features={featureSetZk} />
            </Box>
            <Box
              style={{
                flexDirection: 'column',
                flex: 0.5,
                justifyContent: 'start',
              }}
            >
              <DescriptionBlock
                title={'Support for ZKP Libraries'}
                body={
                  <Box>
                    <img
                      src={`../../assets/images/circom-logo-black.png`}
                      style={{
                        height: '80px',
                        width: 'auto',
                      }}
                      alt="zk-block, boilerplate for zero knowledge dapps"
                    />
                    <Box display="flex" justifyContent="flex-end">
                      <Title sx={{ fontSize: '60px' }}>SnarkJS</Title>
                    </Box>
                  </Box>
                }
                bodyStyle={{ marginTop: '16px' }}
              />
            </Box>
          </Row>
          {/* blockquote */}
          <Box
            display="flex"
            justifyContent="center"
            mt={16}
            mb={8}
            p={4}
            sx={{ backgroundColor: '#D0D0D8', borderRadius: '16px' }}
          >
            <Title variant="h1" width="600px">
              Only boilerplate you will need to develop next generation Web3
              Dapps
            </Title>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Main>
  );
};

export default Index;
