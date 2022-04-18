const generateWitnessJs = require('./witness_calculator.js');
const snarkjs = require('snarkjs');
const ff = require('ffjavascript');
const { unstringifyBigInts } = ff.utils;

const spawningWasm = 'snarks/circuit.wasm';
const zkey = 'snarks/circuit_final.zkey';

const getBinaryPromise = (wasmFile: any) =>
  new Promise((resolve, reject) => {
    fetch(wasmFile, { mode: 'no-cors' })
      .then((response) => {
        console.log(response);
        if (!response['ok']) {
          throw "failed to load wasm binary file at '" + spawningWasm + "'";
        }
        return response['arrayBuffer']();
      })
      .then(resolve)
      .catch(reject);
  });

export async function generateBroadcastParams(params: any): Promise<any> {
  // read wasm file as buffer
  const buffer = await getBinaryPromise(spawningWasm);
  // generate witness
  const witnessCalculator = await generateWitnessJs(buffer);
  console.log('params.....', params);
  const buff = await witnessCalculator.calculateWTNSBin(params, 0);

  const provingKey = await fetch(zkey);
  const provingKeyBuffer = await provingKey.arrayBuffer();

  const { proof, publicSignals } = await snarkjs.groth16.prove(
    new Uint8Array(provingKeyBuffer),
    buff,
    null,
  );
  //console.log("Pub: ", publicSignals);
  //console.log("Proof: ", proof);
  //return { proof, publicSignals };
  const editedPublicSignals = unstringifyBigInts(publicSignals);
  const editedProof = unstringifyBigInts(proof);
  //return { proof: editedProof, publicSignals: editedPublicSignals };
  //console.log(`proof===>`, editedProof);
  //console.log(`publicSignals===>`, editedPublicSignals);
  const callData = await snarkjs.groth16.exportSolidityCallData(
    editedProof,
    editedPublicSignals,
  );
  //console.log(JSON.parse(`[${callData}]`));
  console.log(`callData-->`, callData);
  return JSON.parse(`[${callData}]`);
}
