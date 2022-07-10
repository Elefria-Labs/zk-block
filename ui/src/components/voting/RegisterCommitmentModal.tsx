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
import { useEffect, useState } from 'react';
import { BaseButton } from '@components/common/BaseButton';
import { getVotingContract } from '@hooks/contractHelpers';
import { useWalletContext } from '@components/dapp/WalletContext';
//@ts-ignore
import * as circomlibjs from 'circomlibjs';

const { ZkIdentity } = require('@libsem/identity');

export function RegisterCommitmentModal({ onClose, isOpen }: any) {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [idt, setIdt] = useState('');
  const [idn, setIdn] = useState('');

  const { chainId = 80001, provider } = useWalletContext();
  const votingContract = getVotingContract(chainId);
  // const handleInputChange = (e) => setInput(e.target.value);

  const isError = '' === '';

  const onRegister = async () => {
    if (provider == null) {
      return;
    }
    const poseidon = await circomlibjs.buildPoseidon();
    const hash = poseidon([
      '331812889988070315474899797239669195427483245251314189948350053350001993675',
      '39184590712359246591969895646062619400571013490210628362121405247373753684',
    ]);
    console.log('commitment....', hash);
    console.log('test======>.', poseidon.F.toString(hash));
    try {
      const tx = await votingContract
        ?.connect(provider.getSigner())
        .regsiterCommitment(poseidon.F.toString(hash));
      if (tx?.hash) {
        console.log('tx sent');
      }
    } catch (e) {
      console.log('Error sending tx', e);
    }
  };

  useEffect(() => {
    const identity: typeof ZkIdentity = new ZkIdentity();
    const { identityNullifier, identityTrapdoor } = identity.getIdentity();
    console.log(`identity`, identity.getIdentity());

    setIdn(identityNullifier);
    setIdt(identityTrapdoor);

    // console.log(`zkId`, zkId);
    // storeNewId(identity.serializeIdentity());
  }, [setIdn, setIdt]);

  // 331812889988070315474899797239669195427483245251314189948350053350001993675n
  // 39184590712359246591969895646062619400571013490210628362121405247373753684n
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Regsiter Identity</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel htmlFor="idt">Identity Trapdoor</FormLabel>
              <Input id="idt" type="text" value={idt.toString()} disabled />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="idn">Identity Nullifier</FormLabel>
              <Input id="idn" type="text" value={idn.toString()} disabled />
            </FormControl>
            <a
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify({ idt: idt.toString(), idn: idn.toString() }),
              )}`}
              download="voting_id.json"
            >
              <Button variant="ghost">Download Keys</Button>
            </a>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <BaseButton mr={3} onClick={onRegister} title="Register" />

          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
