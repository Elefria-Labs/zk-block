import React, { useState } from 'react';

import {
  Text,
  Box,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ContractSelect from './ContractSelect';

type EmptyItemPropsType = {
  onSelect?: (value: string) => void;
};
const EmptyItem = ({ onSelect }: EmptyItemPropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contractName, setContractName] = useState<string | undefined>();

  const handleOnChange = (value: string) => {
    setContractName(value);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="16px"
      width={['300px', '400px']}
      marginStart="16px"
      _hover={{ bg: 'gray.300', cursor: 'pointer' }}
      onClick={onOpen}
    >
      <Flex
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <AddIcon fontSize="lg" />
        <Text fontSize={'16px'} as="b" mt="16px">
          Compare
        </Text>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Contract</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContractSelect onChange={handleOnChange} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                if (contractName == null) {
                  return;
                }

                if (onSelect) {
                  onSelect(contractName);
                  onClose();
                }
              }}
            >
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmptyItem;
