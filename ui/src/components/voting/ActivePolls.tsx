import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { VotingItem } from './VotingItem';
import { Voting } from '../../types/contracts/Voting';

export type ActiviePollsPropsType = {
  polls: Voting.PollStructOutput[];
  isRegistered?: boolean;
};
const ActivePolls = (props: ActiviePollsPropsType) => {
  const { isRegistered = false } = props;

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Flex flexWrap="wrap" justifyContent="space-between">
          {props.polls.map((p, i) => (
            <VotingItem key={i} {...p} isRegistered={isRegistered} />
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default ActivePolls;
