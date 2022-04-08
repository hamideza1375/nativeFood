import React from 'react';
import { View, Text } from 'react-native';
import WebView from 'react-native-webview';




function Payment({ navigation,route }) {


  return (
    <View style={{ width: '100%', height: '100%' }}>
      <WebView style={{ width: '100%', height: '100%' }} source={{ uri: route.params.uri }} />
    </View>
  )
}


export default Payment;
