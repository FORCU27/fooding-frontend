import React from 'react';

import { Text, View } from 'react-native';

import { WebView } from './lib/webview-bridge';

function App(): React.JSX.Element {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Text style={{ fontSize: 36, fontWeight: 600 }}>user-mobile</Text>
      <WebView />
    </View>
  );
}

export default App;
