import React from 'react';

import { Box, Container, Heading, Text } from '@chakra-ui/react';

type PageHeaderProps = {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  beforeTitle?: React.ReactNode;
};

export function PageHeader(props: PageHeaderProps) {
  const { title, subtitle, children, beforeTitle = null } = props;

  return (
    <Box
      pt={['25px', '20px', '45px']}
      pb={['20px', '15px', '30px']}
      borderBottomWidth={1}
      mb="30px"
    >
      <Container maxW="container.lg" position="relative">
        {beforeTitle}
        <Heading
          as="h1"
          color="black"
          fontSize={['28px', '33px', '40px']}
          fontWeight={700}
          mb={['2px', '2px', '5px']}
        >
          {title}
        </Heading>
        <Text fontSize={['13px', '14px', '15px']}>{subtitle}</Text>
      </Container>

      {children && <Container maxW="container.lg">{children}</Container>}
    </Box>
  );
}
