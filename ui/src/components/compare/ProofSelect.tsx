import React, { useState } from 'react';

import { Flex, FormControl, Select, Text } from '@chakra-ui/react';

<<<<<<< HEAD
<<<<<<< HEAD
=======
import { providers } from 'ethers';

>>>>>>> db68b24 (feat: init)
=======
>>>>>>> c7464d9 (feat: minor updates)
export type ProofType = {
  name: string;
  contractFunctionName: string;
};
const allowedProofs: ProofType[] = [
  { name: 'groth16', contractFunctionName: 'verifyGroth' },
  { name: 'plonk', contractFunctionName: 'verifyPlonk' },
];
type ProofSelectPropsType = {
  onChange?: (value?: ProofType) => void;
};
const ProofSelect = ({ onChange }: ProofSelectPropsType) => {
  const [selectedProof, setSelectProof] = useState<ProofType | undefined>();
  const handleProofSelect = async (event: any) => {
    const proof = allowedProofs.filter(
      (proof) => proof.name === event.target.value,
    )?.[0];
    if (proof == null) {
      return;
    }
    setSelectProof(proof);
    if (onChange) {
      onChange(proof);
    }
  };

  const ProofSelect = React.memo(() => (
    <FormControl width={'70%'}>
      <Select
        id="proof-select"
        value={selectedProof?.name}
        onChange={handleProofSelect}
        margin="none"
      >
        <option key={`1`} value={''}>{``}</option>
        {allowedProofs.map((proof: ProofType) => {
          return (
            <option
              key={`${proof.name}`}
              value={proof.name}
            >{`${proof.name} (${proof.contractFunctionName})`}</option>
          );
        })}
      </Select>
    </FormControl>
  ));
  return (
    <Flex justify={'space-between'} align="center">
      <Text> Proof:</Text>
      <ProofSelect />
    </Flex>
  );
};

export default ProofSelect;
