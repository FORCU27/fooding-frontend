import React from 'react';

import { Text, View } from 'react-native';

import { WebView } from './lib/webview-bridge';
// TODO: <WebView /> keyboardDisplayRequiresUserAction={false} -> inputRef.current.focus() 등으로 인풋 포커스 시 가상키보드 노출
// TODO: <WebView /> hideKeyboardAccessoryView={true} -> 아이폰에서 가상키보드 위에 표시되는 툴바 제거

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
