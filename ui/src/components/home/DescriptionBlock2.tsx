import React from 'react';

import { Text, Box } from '@chakra-ui/react';

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
          <Text variant="lg" mt={index === 0 ? 0 : 8}>
            {item.title}
          </Text>
          <Text variant="md" mt={4}>
            {item.description}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default DescriptionBlock2;
