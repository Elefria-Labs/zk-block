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

#### Testnet Addresses

- Poseidon3 - 0x87BbbFD587A5A1200B712715A37aA5c98D24d68b
- IncrementalBinTree - 0x2237458fCC956F787d5dedCfd7AD77d28Ad3e455
- Verifier Address - 0x04D88583d8cc4e8e6597CD2850e096572B27F07d
- Voting Contract - 0xDaC7C69F0C3ef580344801142dc9d87021CEBB98
- 0x708513fb4C817b0438FE874737b8AC55D3bb3186

##### Harmony Devnet

- Poseidon3 - 0x7197DD5B5A1c3B6e4eA9b21d1A2F406CFb683655
- IncrementalBinTree - 0xBa133E6A9bE8077354B0A2675868b28cf0195E46
- Verifier Address - 0xA1BCA1dBd58b2f90ce4dCCA5E8a3e7F926a879A9
- Voting Contract - 0xC0fD6B7D04858b6C1B90Bac369b18c4B5424A0d0
