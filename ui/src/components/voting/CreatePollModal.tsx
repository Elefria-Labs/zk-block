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
import { getVotingContract } from '@hooks/contractHelpers';
import { useWalletContext } from '@components/dapp/WalletContext';
//@ts-ignore
import * as circomlibjs from 'circomlibjs';

export function CreatePollModal({ onClose, isOpen }: any) {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [quorum, setQuorum] = useState(5);
  const { chainId = 80001, provider, account } = useWalletContext();
  const votingContract = getVotingContract(chainId);
  const handleInputChange = (e) => setTitle(e.target.value);

  const isError = title === '';

  const onCreate = async () => {
    if (provider == null) {
      return;
    }
    try {
      const poseidon = await circomlibjs.buildPoseidon();
      const hash = poseidon([
        '331812889988070315474899797239669195427483245251314189948350053350001993675',
        '39184590712359246591969895646062619400571013490210628362121405247373753684',
      ]);
      console.log('commitment....', hash);
      console.log('test======>.', poseidon.F.toString(hash));
      const tx = await votingContract
        ?.connect(provider.getSigner())
        .createPoll(poseidon.F.toString(hash), 'Do you love pizza?', 2);
      if (tx?.hash) {
        console.log('tx sent');
      }
    } catch (e) {
      console.log('Error sending tx', e);
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
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="title">Start Time</FormLabel>
              {/* https://github.com/chakra-ui/chakra-ui/issues/580 */}
              <Input
                id="startTime"
                type="datetime-local"
                onChange={(e) => setStartTime(e.target.value)}
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
                id="endTime"
                type="datetime-local"
                onChange={(e) => setEndTime(e.target.value)}
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
          <BaseButton mr={3} onClick={onCreate} title="Create" />

          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
