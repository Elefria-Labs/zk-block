import React from 'react';

import { Box } from '@mui/material';

const HowItWorks = () => {
  return (
    <Box
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt="32px"
      border="1px solid red"
    >
      <img
        src="../../assets/images/howitworks.png"
        width={'auto'}
        height={'800px'}
      ></img>
    </Box>
  );
};

export default HowItWorks;
