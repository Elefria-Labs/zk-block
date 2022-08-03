import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

import { useState } from 'react';
import { BaseButton } from '@components/common/BaseButton';
import { getVotingContract } from '@hooks/contractHelpers';
import { useWalletContext } from '@components/dapp/WalletContext';
import { getCommitment } from './helpers';
import { DEFAULT_CHAIN_ID } from '@config/constants';

export function CreatePollModal({ onClose, isOpen }: any) {
  const [title, setTitle] = useState('');
  const toast = useToast();
  const [quorum, setQuorum] = useState(5);
  const { chainId = DEFAULT_CHAIN_ID, provider, account } = useWalletContext();
  const votingContract = getVotingContract(chainId);
  const handleInputChange = (e) => setTitle(e.target.value);

  const isError = title === '';

  const onCreate = async () => {
    if (provider == null || account == null) {
      return;
    }
    try {
      const hash: string | undefined = await getCommitment(account);

      if (hash == null) {
        return;
      }

      const tx = await votingContract
        ?.connect(provider.getSigner())
        .createPoll(hash, title, 2);
      if (tx?.hash) {
        toast({
          title: 'Tx Sent!',
          description: `Tx Hash: ${tx.hash}`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
      }
    } catch (e) {
      console.log('Error sending tx', e);
      toast({
        title: 'Error!',
        description: `Error sending creating transaction.`,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

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
                value={title}
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
          </Stack>
        </ModalBody>

        <ModalFooter>
          <BaseButton mr={3} onClick={onCreate} title="Create" />

          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
