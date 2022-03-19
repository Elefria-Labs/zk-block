module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const owners = [deployer]; // TODO add more address
  const numOfApprovals = Math.ceil(1);

  const multiSig = await deploy("MultiSig", {
    from: deployer,
    log: true,
    args: [owners, numOfApprovals],
  });
};
