import React from 'react';

import CheckIcon from '@mui/icons-material/Check';
import { Typography, styled, Box } from '@mui/material';

const Title = styled(Typography)((_) => ({
  color: 'white',
}));

type StatusChecklistPropsType = {};
const featureChecklist = [
  'Material UI',
  'Next JS',
  'Typescript',
  'ZKP- Snarks',
  'EVM Wallets',
  'Demo ZK Dapp',
];
const StatusChecklist = (_: StatusChecklistPropsType) => {
  return (
    <Box
      style={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundImage: `url(/assets/images/status-bg.svg)`,
        borderRadius: '14px',
      }}
      paddingX={4}
      paddingY={0.5}
    >
      <Box>
        {featureChecklist.map((item) => {
          return (
            <Box display="flex" key={item} marginY={1} alignItems="center">
              <CheckIcon color="success" fontSize="large" />
              <Title variant="h2" ml={4}>
                {item}
              </Title>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default StatusChecklist;
