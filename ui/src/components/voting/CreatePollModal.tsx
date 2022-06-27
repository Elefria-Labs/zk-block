import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { BaseButton } from '@components/common/BaseButton';

export function CreatePollModal({ onClose, isOpen }: any) {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState('');
  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === '';
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Poll</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                type="text"
                value={input}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>
                  Enter the poll title you'd like to show on the voting card.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Title is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="title">Start Time</FormLabel>
              {/* https://github.com/chakra-ui/chakra-ui/issues/580 */}
              <Input
                id="title"
                type="datetime-local"
                value={input}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>Enter the Start Time.</FormHelperText>
              ) : (
                <FormErrorMessage>Start Time is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="title">End Time</FormLabel>
              <Input
                id="title"
                type="datetime-local"
                value={input}
                onChange={handleInputChange}
              />
              {!isError ? (
                <FormHelperText>Enter the End Time.</FormHelperText>
              ) : (
                <FormErrorMessage>End Time is required.</FormErrorMessage>
              )}
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <BaseButton mr={3} onClick={onClose} title="Create" />

          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
