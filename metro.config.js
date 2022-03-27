/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const { getDefaultConfig } = require('metro-config');
 
 async function getConfig() {
   const defaultConfig = await getDefaultConfig();
   const config = { ...defaultConfig };
   // 将 md 文件加入到打包范围
   config.resolver.assetExts.push('md', 'svg');
   console.log('config:', config);
   const rtn = {
     transformer: {
       getTransformOptions: async () => ({
         transform: {
           experimentalImportSupport: false,
           inlineRequires: true,
         },
       }),
     },
     resolver: {
       assetExts: config.resolver.assetExts,
     },
   };
   console.log('rtn:', rtn);
   return rtn;
 }
 
 module.exports = getConfig();
