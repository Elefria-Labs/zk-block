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
  useToast,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { BaseButton } from '@components/common/BaseButton';
import { getVotingContract } from '@hooks/contractHelpers';
import { useWalletContext } from '@components/dapp/WalletContext';
import { hasZkId, storeZkId } from './storage';
import { posiedonHash } from './helpers';
import { DEFAULT_CHAIN_ID } from '@config/constants';
import { actionType } from '@hooks/useIsRegisteredId';
import { useVotingContext } from './VotingContext';
const { ZkIdentity } = require('@libsem/identity');

type RegisterCommitmentModalPropsType = {
  onClose: any;
  isOpen: any;
  isRegistered?: boolean;
};

export function RegisterCommitmentModal(
  props: RegisterCommitmentModalPropsType,
) {
  const { dispatch } = useVotingContext();

  const { isOpen, onClose } = props;
  const [idt, setIdt] = useState('');
  const [idn, setIdn] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { chainId = DEFAULT_CHAIN_ID, provider, account } = useWalletContext();
  const votingContract = getVotingContract(chainId);

  const onRegister = async () => {
    if (provider == null || account == null) {
      return;
    }
    setLoading(true);
    const hash = await posiedonHash([BigInt(idt), BigInt(idn)]);

    try {
      const tx = await votingContract
        ?.connect(provider.getSigner())
        .regsiterCommitment(hash);
      if (tx?.hash) {
        toast({
          title: 'Tx Sent!',
          description: `Tx Hash: ${tx.hash}`,
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
        dispatch({ type: actionType.confirmingTx, confirmingTx: true });
        onClose();
      }
    } catch (e) {
      toast({
        title: 'Error!',
        description: `Error sending creating transaction.`,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (account == null || chainId == null || hasZkId(account, chainId)) {
      return;
    }
    const identity: typeof ZkIdentity = new ZkIdentity();
    const { identityNullifier, identityTrapdoor } = identity.getIdentity();
    setIdt(() => identityTrapdoor);
    setIdn(() => identityNullifier);
    storeZkId(identity.serializeIdentity(), account, chainId);
  }, [account, setIdt, setIdn, storeZkId]);

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
          <BaseButton
            mr={3}
            onClick={onRegister}
            title="Register"
            isLoading={loading}
          />

          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
