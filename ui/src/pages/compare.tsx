import React, { useState } from 'react';

<<<<<<< HEAD
<<<<<<< HEAD
import { Box, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
=======
import { Box, Container, Flex } from '@chakra-ui/react';
>>>>>>> db68b24 (feat: init)
=======
import { Box, Container, Divider, Flex, Heading, Text } from '@chakra-ui/react';
>>>>>>> c7464d9 (feat: minor updates)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c7464d9 (feat: minor updates)

              <Box py={'16px'} color="gray.200">
                <Heading
                  color="black"
                  fontSize={['22px', '22px', '28px']}
                  mb={['8px', '8px', '16px']}
                >
                  Compare Proofs
                </Heading>
                <Text fontSize={['14px', '14px', '16px']} color="black">
                  <Text fontWeight={500} as="span" color="black">
                    Experimental
                  </Text>
                </Text>
              </Box>
              <Divider mb={'16px'} />
              {!isAllOkay && (
                <Text fontSize={['14px', '14px', '16px']} color="black">
                  <Text fontWeight={500} as="span" color="black">
                    Please connect wallet.
                  </Text>
                </Text>
              )}
<<<<<<< HEAD
              <Flex>
                {isAllOkay && (
                  <>
                    {compareList.map((contract: string, i) => (
                      <CompareItem
                        key={`${contract}-${i}`}
                        account={account}
                        chainId={chainId}
                        provider={provider}
                        contractName={contract}
                      />
                    ))}
                    <EmptyItem onSelect={handleOnAddToCompareList} />
                  </>
                )}
=======
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
>>>>>>> db68b24 (feat: init)
=======
              <Flex>
                {isAllOkay && (
                  <>
                    {compareList.map((contract: string, i) => (
                      <CompareItem
                        key={`${contract}-${i}`}
                        account={account}
                        chainId={chainId}
                        provider={provider}
                        contractName={contract}
                      />
                    ))}
                    <EmptyItem onSelect={handleOnAddToCompareList} />
                  </>
                )}
>>>>>>> c7464d9 (feat: minor updates)
              </Flex>
            </Box>
          </Box>
        </Container>
      </Box>
    </Main>
  );
};

export default Compare;
