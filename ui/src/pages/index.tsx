import React from 'react';

import Link from 'next/link';
import {
  Box,
  Heading,
  Button,
  Text,
  Divider,
  Container,
  Flex,
  Stack,
  Icon,
} from '@chakra-ui/react';
import StatusChecklist from '@components/home/StatusChecklist';
import { Meta } from '@layout/Meta';
import { Main } from '@templates/Main';
import { GithubIcon } from '@components/icon/github';
import { hackernoonGuide, repoLink } from '@config/constants';
import { HackernoonIcon } from '@components/icon/hackernoon';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Zk Block | Boilerplate for ZK Dapps"
          description="Boilerplate for ZK Dapps | Zero Knowledge Proofs"
        />
      }
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Container maxW="container.lg" pb="90px">
          <Box py={['23px', '23px', '35px']} color="gray.200">
            <Heading
              color="black"
              fontSize={['22px', '22px', '28px']}
              mb={['8px', '8px', '16px']}
            >
              zk - Boilerplate{' '}
            </Heading>

            <Text fontSize={['14px', '14px', '16px']} color="black" mb="16px">
              <Text fontWeight={500} as="span" color="gray">
                zkblock.app
              </Text>{' '}
              <b>Boilerplate</b> for building <b>ZK Dapps</b> on <b>Web3</b>.
            </Text>
            <Flex flexDirection="row" alignContent="ce">
              <Link aria-label="Go to GitHub page" href={repoLink} passHref>
                <Icon
                  as={GithubIcon}
                  display="block"
                  transition="color 0.2s"
                  cursor="pointer"
                  color="black"
                  w="10"
                  h="10"
                  _hover={{ color: 'gray.600' }}
                />
              </Link>
              <Link
                aria-label="Go to GitHub page"
                href={hackernoonGuide}
                passHref
              >
                <Icon
                  as={HackernoonIcon}
                  display="block"
                  transition="color 0.2s"
                  cursor="pointer"
                  color="black"
                  ml="16px"
                  w="10"
                  h="10"
                  _hover={{ color: 'gray.600' }}
                />
              </Link>
            </Flex>
          </Box>
          <Divider />
        </Container>

        <Box>
          <Container maxW="container.lg">
            <Flex
              flexDirection={['column', 'row']}
              justifyContent="space-between"
              mb="16px"
            >
              <Stack spacing="24px">
                <Text fontWeight={500} as="span" color="gray">
                  Sample zk Apps
                </Text>

                <Divider />
                <Link href="/dapp" passHref>
                  <Button bg="black" color="white" _hover={{ bg: 'gray.600' }}>
                    zk Age Verification
                  </Button>
                </Link>
                <Link href="/compare" passHref>
                  <Button bg="black" color="white" _hover={{ bg: 'gray.600' }}>
                    Compare Proofs
                  </Button>
                </Link>
                <Link href="/voting" passHref>
                  <Button bg="black" color="white" _hover={{ bg: 'gray.600' }}>
                    Voting ( using Semaphore)
                  </Button>
                </Link>
                <Link href="" passHref>
                  <Button
                    disabled
                    bg="black"
                    color="white"
                    _hover={{ bg: 'gray.600' }}
                  >
                    {' '}
                    zK Authentication (coming soon)
                  </Button>
                </Link>
              </Stack>
              <StatusChecklist />
            </Flex>
          </Container>
        </Box>
      </Box>
    </Main>
  );
};

export default Index;
