import { ethers } from 'ethers';
const Tree = require('incrementalquintree/build/IncrementalQuinTree');
import * as circomlibjs from 'circomlibjs';

export const SnarkScalarField = BigInt(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617',
);
export const TreeZeroNode =
  BigInt(ethers.utils.solidityKeccak256(['string'], ['ZkGamesXYZ'])) %
  SnarkScalarField;
const DEPTH = 10;
const LEAVES_PER_NODE = 2;

export const poseidonHash = (data: Array<bigint>): bigint => {
  const poseidon = circomlibjs.buildPoseidon();
  const hash = poseidon([data]);

  console.log('test======>.', poseidon.F.toString(hash));
  return hash;
};
export const generateZkProof = (leaves: any, leaf: any) => {
  return generateMerkleProof(
    DEPTH,
    TreeZeroNode,
    LEAVES_PER_NODE,
    leaves,
    leaf,
  );
};
export const generateMerkleProof = (
  depth: number,
  zeroValue: number | BigInt,
  leavesPerNode: number,
  leaves: Array<bigint | string>,
  leaf: bigint | string,
): any => {
  const tree = new Tree.IncrementalQuinTree(
    depth,
    zeroValue,
    leavesPerNode,
    poseidonHash,
  );
  const leafIndex = leaves.indexOf(leaf);
  if (leafIndex === -1) throw new Error('Leaf does not exists');

  for (const leaf of leaves) {
    tree.insert(leaf);
  }

  const merkleProof = tree.genMerklePath(leafIndex);
  return {
    root: tree.root,
    ...merkleProof,
  };
};
