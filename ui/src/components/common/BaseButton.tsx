import { Button, ButtonProps } from '@chakra-ui/react';

type BaseButtonPropsType = ButtonProps;
export function BaseButton(props: BaseButtonPropsType) {
  return (
    <Button
      variant="solid"
      bg="black"
      _hover={{ bg: 'gray.600' }}
      ml="24px"
      color="white"
      {...props}
    >
      {props?.title}
    </Button>
  );
}
