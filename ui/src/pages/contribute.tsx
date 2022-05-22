import React from 'react';
import {
  Container,
  Heading,
  Text,
  Link,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Meta } from '@layout/Meta';
import { Main } from '@templates/Main';
import { repoLink } from '@config/constants';

export default function Contribute() {
  return (
    <Main
      meta={
        <Meta
          title="Zk Block | Boilerplate for ZK Dapps"
          description="Boilerplate for ZK Dapps | Zero Knowledge Proofs"
        />
      }
    >
      <Container maxW={'container.lg'} position="relative">
        <Heading
          as="h1"
          color="black"
          fontSize={['35px', '35px', '40px']}
          fontWeight={700}
          mb="20px"
          mt="20px"
        >
          Contribute ❤️
        </Heading>
        <Text fontSize={['15px', '15px', '17px']} color="gray.700" mb="15px">
          The source code of the boilerplate can be{' '}
          <Link
            alignItems="center"
            fontWeight={600}
            _hover={{ textDecoration: 'none', color: 'grey' }}
            href={repoLink}
          >
            found on Github.
          </Link>{' '}
        </Text>
        <Text fontSize={['15px', '15px', '17px']} color="gray.700" mb="15px">
          You can contribute by:
        </Text>
        <List spacing={3}>
          {[
            'Improving the documentation',
            'Creating an issue if something is broken',
            'Writing tests for the contracts or circuits',
            'Adding sample circuits and the correspoding UI',
            'Suggestion to improve the setup',
            'Add support for Vue.js',
            'Create a UI to explain how ZKP works',
            'Fixing grammar mistakes, typos on the website or the content',
            'Writing a Guide Updating an existing guide',
          ].map((list) => {
            return (
              <ListItem key={list}>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                {list}
              </ListItem>
            );
          })}
        </List>
      </Container>
    </Main>
  );
}
