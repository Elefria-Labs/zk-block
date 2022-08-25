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

Please do not use this to compile circuits for production. Proper ceremony is required.

- Using Plonk

`yarn compile:pks`

Note: Plonks does not require phase 2 trusted ceremony per circuit, it's enough with the powers of tau ceremony which is universal.

This repo uses [Hermez Cryptographic Setup](https://blog.hermez.io/hermez-cryptographic-setup/) with power of 14, which is more than enough for this repo purpose.

##### Run tests

`yarn test`

##### Deploy Contract

Select network - `chain.ts` contains network configuration. Network selected for deployment is mentioned in `hardhat.config.ts` file. Default is "ONE" ( HARMONY Network).

Run below command to deploy

`yarn deploy:agecheck --network testnet`

#### Voting Testnet Addresses

##### Mumbai

- Poseidon3 - 0x1DFBC400911fc51EFC38D9f52137B4118B101237
- IncrementalBinTree - 0x1CA4a4dA8D4290FE47573A9AB00112FCc7eeDF18
- Verifier Address - 0xe42aBe0c80D7f355E7D8eac0D27e305Dd4F4D75C
- Voting Contract - 0x7F4fB1448D3d8a72e312Bab54368Ad1D4FF10a52

##### Harmony Devnet

- Poseidon3 - 0x7197DD5B5A1c3B6e4eA9b21d1A2F406CFb683655
- IncrementalBinTree - 0xBa133E6A9bE8077354B0A2675868b28cf0195E46
- Verifier Address - 0xA1BCA1dBd58b2f90ce4dCCA5E8a3e7F926a879A9
- Voting Contract - 0xC0fD6B7D04858b6C1B90Bac369b18c4B5424A0d0
