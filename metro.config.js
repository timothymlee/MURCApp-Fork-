// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
