import React, {useContext} from 'react';
import { NavigationContext } from 'react-navigation';
import { WebView } from 'react-native-webview';
import {StyleSheet} from 'react-native';
  import { SafeAreaView } from 'react-navigation';
  
  export default function WebViewScreen() {
    const navigation = useContext(NavigationContext);
    const {params} = navigation.state
    return (
      <SafeAreaView style={styles.container}>
         <WebView 
            source={{uri: params.url}}
            style={styles.webView}>
        </WebView>
      </SafeAreaView>
    );
  }
  
  WebViewScreen.navigationOptions = {
    title: 'QR WebView',
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    webView: {
        marginTop: 10
    }
  });