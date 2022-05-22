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
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { GithubIcon } from './icon/github';

export function ZkCircuit() {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            SnarkJS
          </Heading>
          <Stack spacing={2} flexWrap="wrap" direction="row">
            <Tag size="sm" key="1" variant="solid" colorScheme="blackAlpha">
              zk
            </Tag>
            <Tag size="sm" key="1" variant="solid" colorScheme="blackAlpha">
              groth16
            </Tag>
            <Tag size="sm" key="1" variant="solid" colorScheme="blackAlpha">
              plonk
            </Tag>
            <Tag size="sm" key="1" variant="solid" colorScheme="blackAlpha">
              javascript
            </Tag>
          </Stack>

          <Text color={'black'} textAlign="justify" mt={8}>
            This is a JavaScript and Pure Web Assembly implementation of zkSNARK
            and PLONK schemes. It uses the Groth16 Protocol (3 point only and 3
            pairings) and PLONK.
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'row'} spacing={2} fontSize={'sm'}>
            <Link isExternal aria-label="Go to GitHub page" href="">
              <Icon
                as={GithubIcon}
                display="block"
                transition="color 0.2s"
                w="5"
                h="5"
                _hover={{ color: 'gray.600' }}
              />
            </Link>
            <Link isExternal aria-label="Go to Website page" href="">
              <Icon
                as={ExternalLinkIcon}
                display="block"
                transition="color 0.2s"
                w="5"
                h="5"
                _hover={{ color: 'gray.600' }}
              />
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
