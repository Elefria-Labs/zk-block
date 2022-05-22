import React from 'react';

import { Box } from '@chakra-ui/react';

type PageWrapperProps = {
  children: React.ReactNode;
};

export function PageWrapper(props: PageWrapperProps) {
  const { children } = props;

  return (
    <Box bgRepeat="no-repeat" bgSize="100%" w="100%" minH="100vh">
      {children}
    </Box>
  );
}
