const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'), // 모노레포 루트의 node_modules
  ],
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'), // app-mobile 내부
      path.resolve(__dirname, '../../node_modules'), // 모노레포 루트
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
