import React, {useState, useContext, useEffect} from 'react';
import { NavigationContext } from 'react-navigation';
import { NavigationEvents } from "react-navigation";
import * as SQLite from 'expo-sqlite';
import QRCodeListItem from '../components/QRCodesListItem.js'

import {
  FlatList,
  YellowBox,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

YellowBox.ignoreWarnings(['Failed child context type']);

const qrDB = SQLite.openDatabase('qrDB');

export default function HomeScreen() {
  const [qrCodes, setQRCodes] = useState([]);
  const navigation = useContext(NavigationContext);

  useEffect(() => {
    _fetchQRCodes()
  }, []);

  const _fetchQRCodes = () => {
    (async () => {
      qrDB.transaction(tx => {
        tx.executeSql(
          "create table if not exists items (id integer primary key not null, url text);"
        );
        tx.executeSql("select * from items", [], (_, { rows }) => 
              {
                var len = rows._array.length;
                var data = [];

                for (let i = 0; i < len; i++) {
                  data.push(rows._array[i]);
                }
                setQRCodes(data);
              }
            );
      });
    })();
  }

   const _renderItem = (item) => {
    return (
      <QRCodeListItem
        _fetchQRCodes={_fetchQRCodes()}
        item={item.item}
        navigation={navigation}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents
          onWillFocus={() => {
            _fetchQRCodes()
          }}
        />
      {qrCodes.length > 0 ?
       <FlatList
          data={Object.values(qrCodes)} 
          renderItem={item => _renderItem(item)}
          />  
        : 
        <Text style={styles.emptyDBText}>You do not have any QR Codes saved</Text>}  
    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Platform.OS === 'android' ? 20 : 0
  },
  emptyDBText: {
    textAlign: 'center',
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 25
  }
});
