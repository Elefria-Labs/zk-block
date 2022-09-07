import { useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  CloseButton,
  Container,
  Flex,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Links } from '@config/constants';

type MenuLinkProps = {
  text: string;
  link: string;
};

function MenuLink(props: MenuLinkProps) {
  const { text, link } = props;

  return (
    <Link
      borderBottomWidth={0}
      borderBottomColor="gray.500"
      _hover={{ textDecoration: 'none', borderBottomColor: 'black' }}
      fontWeight={500}
      color="black"
      href={link}
    >
      {text}
    </Link>
  );
}

function DesktopMenuLinks() {
  return (
    <Stack
      d={['none', 'flex', 'flex']}
      shouldWrapChildren
      isInline
      spacing="15px"
      alignItems="center"
      color="gray.50"
      fontSize="15px"
    >
      <MenuLink text={'Tools'} link={Links.tools} />
      <MenuLink text={'Boilerplate'} link={Links.boilerplate} />
      <MenuLink text={'About'} link={Links.about} />
      <MenuLink text={'Contribute'} link={Links.contribute} />
      <Link
        ml="10px"
        bgGradient="linear(to-l, gray.700, gray.500)"
        p="7px 10px"
        rounded="4px"
        _hover={{
          textDecoration: 'none',
          bgGradient: 'linear(to-l, gray.800, gray.800)',
        }}
        fontWeight={500}
        href={Links.subscribe}
      >
        Subscribe
      </Link>
    </Stack>
  );
}

function MobileMenuLinks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        rounded="5px"
        padding={0}
        aria-label={'Menu'}
        d={['block', 'none', 'none']}
        icon={<HamburgerIcon color="black" w="25px" height="25px" />}
        color="black"
        cursor="pointer"
        h="auto"
        bg="transparent"
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        _focus={{ bg: 'transparent' }}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <Stack
          color="gray.100"
          fontSize={['22px', '22px', '22px', '32px']}
          alignItems="center"
          justifyContent="center"
          pos="fixed"
          left={0}
          right={0}
          bottom={0}
          top={0}
          bg="gray.900"
          spacing="12px"
          zIndex={999}
        >
          <Link href={Links.tools}>Tools</Link>
          <Link href={Links.boilerplate}>Boilerplate</Link>
          <Link href={Links.subscribe}>Subscribe</Link>
          <Link href={Links.about}>About</Link>
          <Link href={Links.contribute}>Contribute</Link>
          <CloseButton
            onClick={() => setIsOpen(false)}
            pos="fixed"
            top="40px"
            right="15px"
            size="lg"
          />
        </Stack>
      )}
    </>
  );
}

type GlobalHeaderProps = {
  variant?: 'transparent' | 'solid';
};

export function GlobalHeader(props: GlobalHeaderProps) {
  const { variant = 'solid' } = props;

  return (
    <Box bg={variant === 'solid' ? 'gray.900' : 'transparent'} p="20px 0">
      <Container maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Link
              w="100%"
              d="flex"
              href={Links.home}
              alignItems="center"
              color="black"
              fontWeight={600}
              _hover={{ textDecoration: 'none' }}
              fontSize="18px"
            >
              <Image
                alt=""
                h="30px"
                w="30px"
                src="../assets/images/zk-block-logo.svg"
                mr="10px"
              />
              <Text as="span">zkblock</Text>
            </Link>
          </Box>
          <DesktopMenuLinks />
          <MobileMenuLinks />
        </Flex>
      </Container>
    </Box>
  );
}
