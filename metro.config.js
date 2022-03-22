/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('metro-config');

async function getConfig() {
  const defaultConfig = await getDefaultConfig();
  // 将 md 文件加入到打包范围
  defaultConfig.resolver.assetExts.push('md');
  // TODO: 注释掉 console.log()
  console.log('defaultConfig:', defaultConfig);
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      resolver: {
        assetExts: defaultConfig.resolver.assetExts,
      },
    },
  };
}

module.exports = getConfig();
