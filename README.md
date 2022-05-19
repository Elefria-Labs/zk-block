## ZK-Block Boilerplate for ZK Dapps

Website- [ZkBlock](https://zkblock.app)
The current sample zk-dapp has an age verification circuit.

[Read walkthrough guide on Hackernoon](https://hackernoon.com/how-to-use-a-zero-knowledge-dapp-boilerplate)

![](https://i.imgur.com/waxVImv.png)

### Getting started

#### Pre-Requisite

- Install [rust](https://www.rust-lang.org/tools/install)
- Install [circom](https://docs.circom.io/getting-started/installation/)
- Install [nodejs](https://nodejs.org/en/download/)

#### How it Works?

- Walkthrough [here](https://hackernoon.com/how-to-use-a-zero-knowledge-dapp-boilerplate)
- Diagram [here](./ui/public/assets/images/howitworks.png)

![](https://i.imgur.com/waxVImv.png)

#### Frontend / UI

Run the following command on your local environment:

```
git clone https://github.com/heypran/zk-block.git

cd zk-block/ui

yarn install

```

Then, you can run locally in development mode with live reload:

```
yarn dev
```

Open http://localhost:3000 in the browser.

Now you play around with Age Verification UI, ( currently deployed on Polygon, and Harmony)

![](https://i.imgur.com/waxVImv.png)

### Backend ( Smart Contracts & Circuits)

Create a file `private.json` ( refer `private.example.json` ) inside `backend` folder and add your private key.

##### Install deps

```
cd zk-block/backend
yarn install
```

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

Note: Frontend already has deployed contract address configured ( inside `ui/src/config/constants`).

```
Polygon Testnet: 0xD8bfe046B2b2B66672841196E9aE3785200D5FE0
Harmony Testnet: 0x457900273036dB9C5157Fcb1072294C0E7e720F4
```

Select network - `chain.ts` contains network configuration. Network selected for deployment is mentioned in `hardhat.config.ts` file. Default is "ONE" ( HARMONY Network).

Run below command to deploy

`yarn deploy:agecheck --network testnet`

### Contributions

> Everyone is welcome to contribute to this project.

- Add more beginner friendly circuits
- Improve the site's codebase
- Write tests
- Discuss ideas in issues
- Improve documentation
