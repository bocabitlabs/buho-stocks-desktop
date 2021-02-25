const { githubPublisherToken } = require("./src/utils/config");

module.exports = {
  packagerConfig: {
    icon: "src/icons/mac/icon.icns",
    name: "Buho-Stocks",
    packageManager: "yarn",
    ignore: [
      "/coverage",
      "/dev-data",
      "/docs",
      "/node_modules/.cache",
      "/node_modules/antd",
      "/node_modules/@ant-design",
      "/node_modules/@icons"
    ],
    asar: true
  },
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "bocabitlabs",
          name: "buho-stocks"
        },
        authToken: githubPublisherToken,
        prerelease: true,
        draft: true
      }
    }
  ],
  plugins: [["@electron-forge/plugin-auto-unpack-natives"]],
  makers: [
    {
      name: '@electron-forge/maker-dmg'
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "buho_stocks",
        authors: "BocabitLabs",
        description: "Long time investment stock manager app"
      }
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: "BocabitLabs",
          homepage: "https://bocabit.com",
          description: "Long time investment stock manager app"
        }
      }
    }
  ]
};
