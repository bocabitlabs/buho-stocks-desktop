const { githubPublisherToken } = require("./src/utils/config");

module.exports = {
  packagerConfig: {
    icon: "src/icons/mac/icon.icns",
    name: "Buho-Stocks",
    packageManager: "yarn",
    ignore: [
      "/coverage",
      "/data",
      "/docs",
      "/node_modules/.cache",
      // "!node_modules/module-x/*" //prevent module x to be included
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
        prerelease: true
      }
    }
  ],
  plugins: [["@electron-forge/plugin-auto-unpack-natives"]],
  makers: [
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
          homepage: "https://bocabit.com"
        }
      }
    }
  ]
};
