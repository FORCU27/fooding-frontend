import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{uri: 'https://app.fooding.im/'}}
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
