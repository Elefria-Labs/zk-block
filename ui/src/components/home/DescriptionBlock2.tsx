import React from 'react';

import { Typography, styled, Box } from '@mui/material';

// TODO
const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export type FeatureType = {
  title: string;
  description: string;
};

type DescriptionBlock2TypeProps = {
  features: Array<FeatureType>;
};
const DescriptionBlock2 = (props: DescriptionBlock2TypeProps) => {
  return (
    <Box
      height="auto"
      style={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {props.features.map((item, index) => (
        <Box key={item.title}>
          <Title variant="h1" mt={index === 0 ? 0 : 8}>
            {item.title}
          </Title>
          <Title variant="h3" mt={4}>
            {item.description}
          </Title>
        </Box>
      ))}
    </Box>
  );
};

export default DescriptionBlock2;
