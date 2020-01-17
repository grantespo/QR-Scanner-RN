import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as SQLite from 'expo-sqlite';

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const qrDB = SQLite.openDatabase('qrDB');

  qrDB.transaction(tx => {
    tx.executeSql(
      "create table if not exists items (id integer primary key not null, url text);"
    );
  });

add = (url) => {
  if (url === null || url === "") {
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
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
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
  }
});
