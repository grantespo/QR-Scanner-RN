import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Button, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as SQLite from 'expo-sqlite';
import Colors from '../constants/Colors';

const qrDB = SQLite.openDatabase('qrDB');

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  qrDB.transaction(tx => {
    tx.executeSql(
      "create table if not exists items (id integer primary key not null, url text);"
    );
  });

add = (url) => {
  if (url === null || !isString(url) || !validURL(url)) {
    alert("Unable to add this QR Code to database because there was no URL associated with it.")
  } else {
    qrDB.transaction(
      tx => {
        tx.executeSql("insert into items (url) values (?)", [url], () => {
          alert("Your code has been added!");
        });
      }
    );
  }
};

function isString(val) {
  return typeof val === 'string' || ((!!val && typeof val === 'object') && Object.prototype.toString.call(val) === '[object String]');
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    add(data);
  };
  
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  
  return (
    <SafeAreaView
      style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
  
      {scanned && (
        <View style={styles.scanAgainButtonContainer}>
          <Button color={Platform.OS === 'ios' ? 'white' : Colors.tabIconSelected} title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        </View>
      )}
    </SafeAreaView>
  );
}

ScannerScreen.navigationOptions = {
  title: 'QR Code Scanner',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  scanAgainButtonContainer: {
    backgroundColor: Colors.tabIconSelected,
    color: Colors.tabIconSelected,
    height: 40,
  }
});
