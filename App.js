import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading
      startAsync={bootstrap}
      onFinish={() => setIsReady(true)}
      onError={console.log}
    />
  }
  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
