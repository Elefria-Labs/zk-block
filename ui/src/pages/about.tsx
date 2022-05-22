import React from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';
import { Meta } from '@layout/Meta';
import { Main } from '@templates/Main';

export default function About() {
  return (
    <Main
      meta={
        <Meta
          title="Zk Block | Boilerplate for ZK Dapps"
          description="Boilerplate for ZK Dapps | Zero Knowledge Proofs"
        />
      }
    >
      <Container maxW={'container.lg'} position="relative">
        <Heading
          as="h1"
          color="black"
          fontSize={['35px', '35px', '40px']}
          fontWeight={700}
          mb="20px"
          mt="20px"
        >
          About
        </Heading>
        <Text fontSize={['15px', '15px', '17px']} color="gray.700" mb="15px">
          zk block is one stop tools directory for zero knowledge proofs, smart
          contracts, ethereum (& L2), web3 apps and cryptography. It started as
          a boileplate code for snarks, but we are adding more features to help
          the community and make tooling information more easily accessbile.
        </Text>
      </Container>
    </Main>
  );
}
