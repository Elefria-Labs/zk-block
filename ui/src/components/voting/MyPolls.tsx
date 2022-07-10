import React, { useEffect, useCallback, useState } from 'react';

import {
  Text,
  Box,
  Heading,
  Button,
  Collapse,
  Input,
  Flex,
} from '@chakra-ui/react';

import { getAgeCheckContract, getVotingContract } from '@hooks/contractHelpers';
import { useWalletContext } from '@components/dapp/WalletContext';
import { VotingItem } from './VotingItem';
import { Voting } from '@types/contracts/Voting';

export type MyPollsPropsType = {
  polls: Voting.PollStructOutput[];
};
const MyPolls = (props: MyPollsPropsType) => {
  const [activePolls, setActivePolls] = React.useState<
    Voting.PollStructOutput[]
  >([]);
  const { chainId, provider, account } = useWalletContext();

  const votingContract = React.useMemo(
    () => getVotingContract(chainId ?? 80001),
    [chainId],
  );

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
        <Flex
          border="1px solid red"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {props.polls.map((p, i) => (
            <VotingItem key={i} {...p} />
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default MyPolls;
