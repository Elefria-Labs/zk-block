import React from 'react';

import { Typography, styled, Box, BoxProps } from '@mui/material';

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
const altText = 'Zero Knowledge Proof boilerplate typescript nextjs circom';
const baseImgPath = `../../assets/images/chain-icons/`;
enum Icons {
  Bnb = 'bnb-bnb-logo.svg',
  Harmony = 'harmony-one-logo.svg',
  Polygon = 'polygon-matic-logo.svg',
  Ethereum = 'ethereum.svg',
}
const iconStyle = { height: '64px', width: '64px', marginLeft: '24px' };
type DescriptionBlockPropsType = {
  title?: string;
  body?: React.ReactNode;
  bodyStyle?: BoxProps['style'];
};
const DescriptionBlock = (props: DescriptionBlockPropsType) => {
  return (
    <Box
      style={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
      }}
    >
      <Title variant="h1">
        {props?.title ? props?.title : 'Support for major EVM chains'}
      </Title>

      <Box mt={8} style={{ ...(props?.bodyStyle ?? {}) }}>
        {props?.body ? (
          props?.body
        ) : (
          <div>
            <img
              src={`${baseImgPath}${Icons.Ethereum}`}
              style={iconStyle}
              alt={altText}
            />
            <img
              src={`${baseImgPath}${Icons.Harmony}`}
              style={iconStyle}
              alt={altText}
            />
            <img
              src={`${baseImgPath}${Icons.Polygon}`}
              style={iconStyle}
              alt={altText}
            />
            <img
              src={`${baseImgPath}${Icons.Bnb}`}
              style={iconStyle}
              alt={altText}
            />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default DescriptionBlock;
