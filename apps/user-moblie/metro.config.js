import { getDefaultConfig, mergeConfig } from '@react-native/metro-config';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// ESM에서 __dirname 대체
const __dirname = resolve(fileURLToPath(import.meta.url), '..');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [resolve(__dirname, '../../node_modules')],
  resolver: {
    nodeModulesPaths: [
      resolve(__dirname, 'node_modules'),
      resolve(__dirname, '../../node_modules'),
    ],
  },
};

export default mergeConfig(getDefaultConfig(__dirname), config);
