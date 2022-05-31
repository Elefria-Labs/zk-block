import React, { useState } from 'react';

import { Box, Container, Flex } from '@chakra-ui/react';
import { Meta } from '@layout/Meta';
import { Main } from '@templates/Main';
import WalletConnectComponent from '@components/dapp/WalletConnection';
import CompareItem from '@components/compare/CompareItem';
import { useWalletContext } from '@components/dapp/WalletContext';
import EmptyItem from '@components/compare/EmptyItem';

const Compare = () => {
  const { account, provider, chainId } = useWalletContext();
  const isAllOkay = account != null && provider != null && chainId != null;
  const [compareList, setCompareList] = useState<string[]>(['ageCheck']);

  const handleOnAddToCompareList = (contractName: string) => {
    console.log('handleOnAddToCompareList');
    const newList = [...compareList];
    newList.push(contractName);
    setCompareList(newList);
  };
  return (
    <Main
      meta={
        <Meta
          title="Zk Block | Compare Proofs"
          description="Compare poofs generation between contracts | Zero Knowledge Proofs"
        />
      }
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Container maxW="container.lg">
          <Box
            display="flex"
            flexDirection="row"
            flex="1"
            justifyContent="center"
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                maxWidth: '1080px',
                minHeight: '720px',
                minWidth: '1080px',
              }}
            >
              <Box>
                <WalletConnectComponent />
              </Box>
              <Flex>
                {isAllOkay &&
                  compareList.map((contract: string, i) => (
                    <CompareItem
                      key={`${contract}-${i}`}
                      account={account}
                      chainId={chainId}
                      provider={provider}
                      contractName={contract}
                    />
                  ))}
                <EmptyItem onSelect={handleOnAddToCompareList} />
              </Flex>
            </Box>
          </Box>
        </Container>
      </Box>
    </Main>
  );
};

export default Compare;
