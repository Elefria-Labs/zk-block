# Zk-Block

### Getting started

Create a file `private.json` ( refer `private.example.json` ) inside `backend` folder and add your private key.

##### Install deps

`cd zk-block/backend`
`yarn install`

##### Compile contracts

`yarn compile`

##### Compile cicuits

- Using groth16

`yarn compile:circuits`

Please do use this to compile circuits for production. Proper ceremony is required.

- Using Plonk

`yarn compile:pks`

Note: Plonks doesnt require phase 2 trusted ceremony per circuit, it's enough with the powers of tau ceremony which is universal.

This repo uses [Hermez Cryptographic Setup](https://blog.hermez.io/hermez-cryptographic-setup/) with power of 14, which is more than enough for this repo purpose.

##### Run tests

`yarn test`

##### Deploy Contract

Select network - `chain.ts` contains network configuration. Network selected for deployment is mentioned in `hardhat.config.ts` file. Default is "ONE" ( HARMONY Network).

Run below command to deploy

`yarn deploy:agecheck --network testnet`
