import React from 'react';

import { Text, Box } from '@chakra-ui/react';

import { githubLink, twitterLink } from '@config/constants';

export const navBarHeight = '64px';
const socialIconSize = '32px';

const NavBar = () => {
  return (
    <Box
      height="auto"
      style={{
        height: '60px',
        display: 'flex',
        flex: '1',
        maxWidth: '1080px',
        alignItems: 'center',
      }}
    >
      <img
        src={`../../assets/images/zk-block-logo.svg`}
        style={{ height: '40px', width: 'auto' }}
        alt="zkblock, boilerplate for zk apps"
      />
      <Text variant="h2" ml={1}>
        Block
      </Text>

      <Box display="flex" justifyContent="flex-end" flex="1">
        <a target="_blank" href={githubLink} rel="noreferrer">
          <img
            src={`../../assets/images/social/github-icon.png`}
            style={{ height: socialIconSize, width: socialIconSize }}
            alt="zkblock, boilerplate for zk apps"
          />
        </a>
        <a target="_blank" href={twitterLink} rel="noreferrer">
          <img
            src={`../../assets/images/social/twitter-icon.svg`}
            style={{
              height: socialIconSize,
              width: socialIconSize,
              margin: '0 16px',
            }}
            alt="zkblock, boilerplate for zk apps"
          />
        </a>
      </Box>
    </Box>
  );
};

export default NavBar;
