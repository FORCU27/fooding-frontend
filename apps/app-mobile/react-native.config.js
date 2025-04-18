module.exports = {
  dependencies: {
    'react-native-webview': {
      platforms: {
        android: {
          android: null, // 💣 Codegen 완전 제거
        },
      },
    },
  },
};
