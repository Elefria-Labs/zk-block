import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Tag,
  Link,
  Icon,
  Flex,
  Button,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export function VotingItem() {
  return (
    <Center py={6}>
      <Box
        w={'320px'}
        h={'350px'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflowY="auto"
      >
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            Do you love pizza?
          </Heading>
          <Stack spacing={2} flexWrap="wrap" direction="row">
            <Tag size="sm" key="1" variant="solid" colorScheme="green">
              Voting Active
            </Tag>
            <Tag size="sm" key="1" variant="solid" colorScheme="red">
              Voting Ended
            </Tag>
          </Stack>
        </Stack>

        <Stack
          direction={'column'}
          spacing={2}
          fontSize={'sm'}
          justifyContent="flex-end"
          flex="1"
        >
          <Text color={'black'} textAlign="justify" mt={8} fontSize="lg">
            Total Votes: 200
          </Text>
          <Flex
            alignContent="center"
            alignItems="center"
            border="1px solid red"
          >
            <Text
              color={'black'}
              textAlign="justify"
              mt={8}
              fontSize="lg"
              as="b"
            >
              Your Vote: asdff
            </Text>
            <Button
              variant="solid"
              bg="black"
              _hover={{ bg: 'gray.600' }}
              ml="24px"
              color="white"
            >
              Cast Vote
            </Button>
          </Flex>

          {/* <Link isExternal aria-label="Go to GitHub page" href="">
              <Icon
                as={GithubIcon}
                display="block"
                transition="color 0.2s"
                w="5"
                h="5"
                _hover={{ color: 'gray.600' }}
              />
            </Link> */}
          <Text color={'black'} textAlign="justify" mt={8}>
            Created by: 0xasdfs
          </Text>
          <Text color={'black'} textAlign="justify" mt={8}>
            Created at: 12/21/2022
          </Text>
          {/* <Link isExternal aria-label="Go to Website page" href="">
            <Icon
              as={ExternalLinkIcon}
              display="block"
              transition="color 0.2s"
              w="5"
              h="5"
              _hover={{ color: 'gray.600' }}
            />
          </Link> */}
        </Stack>
      </Box>
    </Center>
  );
}
