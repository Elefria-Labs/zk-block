import React from 'react';

import { Box, Heading, Text, Divider, Container } from '@chakra-ui/react';
import { Meta } from '@layout/Meta';
import { Main } from '@templates/Main';

const Tools = () => {
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
        <Container maxW="container.lg" pb="90px">
          <Box py={['23px', '23px', '35px']} color="gray.200">
            <Heading
              color="black"
              fontSize={['22px', '22px', '28px']}
              mb={['8px', '8px', '16px']}
            >
              zk - Tools
            </Heading>
            <Text fontSize={['14px', '14px', '16px']} color="black">
              <Text fontWeight={500} as="span" color="black">
                Coming Soon.
              </Text>
            </Text>
          </Box>
          <Divider />
        </Container>
      </Box>
    </Main>
  );
};

export default Tools;
