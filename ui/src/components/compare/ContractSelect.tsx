import React, { useState } from 'react';

import { Flex, FormControl, Select, Text } from '@chakra-ui/react';
import { contractAddresses } from '@config/constants';

const allowedContracts: string[] = Object.keys(contractAddresses);
type ContractSelectPropsType = {
  onChange?: (value: string) => void;
};
const ContractSelect = ({ onChange }: ContractSelectPropsType) => {
  const [selectedContract, setSelectedContract] = useState<
    string | undefined
  >();
  const handleContractSelect = async (event: any) => {
    const contractName = event.target.value;
    if (contractName == null || contractName.length === 0) {
      return;
    }

    setSelectedContract(contractName);
    if (onChange) {
      onChange(contractName);
    }
  };

  const ContractSelect = React.memo(() => (
    <FormControl width={'70%'}>
      <Select
        id="contract-select"
        onChange={handleContractSelect}
        value={selectedContract}
        margin="none"
      >
        <option key={`1`} value={undefined}>
          {''}
        </option>
        {allowedContracts.map((contractName: string) => {
          return (
            <option key={`${contractName}`} value={contractName}>
              {contractName}
            </option>
          );
        })}
      </Select>
    </FormControl>
  ));
  return (
    <Flex justify={'space-between'} align="center">
      <Text> Contract:</Text>
      <ContractSelect />
    </Flex>
  );
};

export default ContractSelect;
