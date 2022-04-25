# Zk-Block

### Getting started

Create a file `private.json` ( refer `private.example.json` ) and add your private key.

##### Compile contracts

`yarn compile`

##### Compile cicuits

`yarn compile:circuits`

Please do use this to compile circuits for production. Proper ceremony is required.

##### Run tests

`yarn test`

##### Deploy Contract

Select network - `chain.ts` contains network configuration. Network selected for deployment is mentioned in `hardhat.config.ts` file. Default is "ONE" ( HARMONY Network).

Run below command to deploy

`yarn deploy:agecheck --network testnet`
