import { ethers } from 'ethers';
const Tree = require('incrementalquintree/build/IncrementalQuinTree');
//@ts-ignore
import * as circomlibjs from 'circomlibjs';

export const SnarkScalarField = BigInt(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617',
);
export const TreeZeroNode =
  BigInt(ethers.utils.solidityKeccak256(['string'], ['Semaphore'])) %
  SnarkScalarField;
const DEPTH = 20;
const LEAVES_PER_NODE = 2;

export const poseidonHash = (poseidon: any) => {
  return (data: Array<bigint>): bigint => {
    const hash = poseidon(data);
    return poseidon.F.toString(hash);
  };
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
export const generateMerkleProof = async (
  depth: number,
  zeroValue: number | BigInt,
  leavesPerNode: number,
  leaves: Array<bigint | string>,
  leaf: bigint | string,
): any => {
  const poseidon = await circomlibjs.buildPoseidon();
  const tree = new Tree.IncrementalQuinTree(
    depth,
    zeroValue,
    leavesPerNode,
    poseidonHash(poseidon),
  );
  const stringLeaves = leaves.map((l) => ethers.BigNumber.from(l).toString());
  const leafIndex = stringLeaves.indexOf(leaf.toString());
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
