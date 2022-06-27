import React from 'react';

import { Box, Container } from '@chakra-ui/react';
import { Meta } from '@layout/Meta';
import { Main } from '@templates/Main';
import WalletConnectComponent from '@components/dapp/WalletConnection';
import VotingDapp from '@components/voting/Voting';

const Voting = () => {
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
              <VotingDapp />
            </Box>
          </Box>
        </Container>
      </Box>
    </Main>
  );
};

export default Voting;
