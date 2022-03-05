import React from 'react';

import { Box } from '@mui/material';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

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
      <Box
        height="auto"
        style={{
          overflowX: 'hidden',
          display: 'flex',
          flex: '1',

          justifyContent: 'center',
          border: '2px solid red',
        }}
      >
        <img
          src="'./../../assets/images/test-zkblock.svg"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Box>
    </Main>
  );
};

export default Index;
