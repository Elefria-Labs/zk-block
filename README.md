## ZK-Block Boilerplate for ZK Dapps

Website- [ZkBlock](https://zkblock.app)
The current sample zk-dapp has an age verification circuit.

### Getting started

#### Frontend / UI

Run the following command on your local environment:

```
git clone

cd zk-block

yarn install

```

Then, you can run locally in development mode with live reload:

```
yarn dev
```

Open http://localhost:3000 with your favorite browser to see your project.

### Backend ( Smart Contracts & Circuits)

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

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.
