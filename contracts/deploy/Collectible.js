module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const collectible = await deploy("GameItems", {
    from: deployer,
    log: true,
    args: [],
  });
};
