const { githubPublisherToken } = require("./src/utils/config");

module.exports = {
  packagerConfig: {
    icon: "src/icons/mac/icon.icns",
    name: "Buho-Stocks",
    asar: true
  },
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "bocabitlabs",
          name: "buho-stocks",
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
        name: "buho_stocks"
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
    }
  ]
};
