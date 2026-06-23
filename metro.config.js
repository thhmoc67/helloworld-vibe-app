const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const projectRoot = __dirname;
const hwVibeAssets = path.resolve(projectRoot, 'assets/hw-vibe');
const config = getDefaultConfig(projectRoot);

const { transformer, resolver } = config;

config.watchFolders = [...(config.watchFolders ?? []), hwVibeAssets];

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
};

config.resolver = {
  ...resolver,
  unstable_enableSymlinks: true,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = config;
