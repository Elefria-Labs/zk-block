import {
  Box,
  Container,
  Flex,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Links } from '@config/constants';

function NavigationLinks() {
  return (
    <>
      <Stack
        isInline
        d={['none', 'none', 'flex']}
        color="gray.400"
        fontWeight={600}
        spacing="30px"
      >
        <Link _hover={{ color: 'black' }} href={Links.tools}>
          Tools
        </Link>
        <Link _hover={{ color: 'black' }} href={Links.boilerplate}>
          Boilerplate
        </Link>
        <Link _hover={{ color: 'black' }} href={Links.contribute}>
          Contribute
        </Link>

        <Link _hover={{ color: 'black' }} href={Links.about}>
          About
        </Link>
      </Stack>

      <Stack
        d={['flex', 'flex', 'none']}
        color="gray.400"
        fontWeight={600}
        spacing={0}
      >
        <Link
          py="7px"
          borderBottomWidth={1}
          borderBottomColor="gray.800"
          _hover={{ color: 'gray' }}
          href={Links.tools}
        >
          Tools
        </Link>
        <Link
          py="7px"
          borderBottomWidth={1}
          borderBottomColor="gray.800"
          _hover={{ color: 'gray' }}
          href={Links.boilerplate}
        >
          Boilerplate
        </Link>
        <Link
          py="7px"
          borderBottomWidth={1}
          borderBottomColor="gray.800"
          _hover={{ color: 'gray' }}
          href={Links.contribute}
        >
          Contribute
        </Link>

        <Link
          py="7px"
          borderBottomWidth={1}
          borderBottomColor="gray.800"
          _hover={{ color: 'gray' }}
          href={Links.about}
        >
          About
        </Link>
      </Stack>
    </>
  );
}

export function Footer() {
  return (
    <Box p={['25px 0', '25px 0', '18px 0']}>
      <Container maxW="container.lg">
        <NavigationLinks />

        <Box mt={['40px', '40px', '50px']} mb="10px" maxW="500px">
          <Flex alignItems="center" color="gray.400">
            <Link
              d="flex"
              alignItems="center"
              fontWeight={600}
              _hover={{ textDecoration: 'none', color: 'grey' }}
              href={Links.home}
            >
              <Image
                alt=""
                h="25px"
                w="25px"
                src="../assets/images/zk-block-logo.svg"
                mr="6px"
              />
              zkblock.app
            </Link>
            <Text as="span" mx="7px">
              by
            </Text>
            <Link
              bg="black"
              px="6px"
              py="2px"
              rounded="4px"
              color="white"
              fontWeight={600}
              fontSize="13px"
              _hover={{ textDecoration: 'none', bg: 'gray.600' }}
              href="https://github.com/heypran"
              target="_blank"
            >
              @heypran
            </Link>
          </Flex>

          <Text my="15px" fontSize="14px" color="gray.500">
            Tools for zero knowledge proofs, smart contracts, ethereum (& L2),
            web3 apps and cryptography.
          </Text>

          <Text fontSize="14px" color="gray.500">
            <Text as="span" mr="10px">
              &copy; zkblock.app
            </Text>
            {/* &middot;
            <Link
              href="/about"
              _hover={{ textDecoration: 'none', color: 'grey' }}
              color="gray.400"
              mx="10px"
            >
              FAQs
            </Link>
            &middot;
            <Link
              href="/terms"
              _hover={{ textDecoration: 'none', color: 'grey' }}
              color="gray.400"
              mx="10px"
            >
              Terms
            </Link>
            &middot;
            <Link
              href="/privacy"
              _hover={{ textDecoration: 'none', color: 'grey' }}
              color="gray.400"
              mx="10px"
            >
              Privacy
            </Link> */}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
