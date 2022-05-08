import React from 'react';

import { Typography, styled, Box } from '@mui/material';

import { githubLink, twitterLink } from '@config/constants';

export const footerHeight = '48px';

const Title = styled(Typography)((_) => ({
  color: 'black',
}));
const size = '24px';

function Footer() {
  return (
    <Box
      display="flex"
      mt={4}
      height={footerHeight}
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: '#D0D0D8' }}
      borderRadius="10px 10px 0 0"
    >
      <a target="_blank" href={githubLink} rel="noreferrer">
        <img
          src={`../../assets/images/social/github-icon.png`}
          style={{ height: size, width: size }}
          alt="zkblock, boilerplate for zk apps"
        />
      </a>
      <a target="_blank" href={twitterLink} rel="noreferrer">
        <img
          src={`../../assets/images/social/twitter-icon.svg`}
          style={{ height: size, width: size, margin: '0 8px' }}
          alt="zkblock, boilerplate for zk apps"
        />
      </a>

      <Title variant="h4">zkblock | open source | 2022</Title>
    </Box>
  );
}

export default Footer;
