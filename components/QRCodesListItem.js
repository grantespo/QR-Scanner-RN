import React from 'react';
import * as SQLite from 'expo-sqlite';

import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const qrDB = SQLite.openDatabase('qrDB');

const trashIcon = require("../assets/images/trash-icon.png")

export default class QRCodesListItem extends React.PureComponent { 

    render() {
      const openWebview = () => {
        this.props.navigation.navigate('WebView', {
           url: this.props.item.url
        })
      }
  
      const deleteItem = () => {
        qrDB.transaction(
          tx => {
            tx.executeSql(`delete from items where id = ?;`, [this.props.item.id]);
          },
          null,
          this.props._fetchQRCodes
        )
      }
  
     return (
      <TouchableOpacity onPress={() => openWebview()} style={styles.itemContainter}>
        <View style={styles.idContainer}>
     <Text style={styles.idText}>{this.props.item.id}</Text>
        </View>
        <View style={styles.itemURLContainer}>
     <Text style={styles.URLText}>{this.props.item.url}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteItem()} style={styles.itemDeleteContainer}>
          <Image source={trashIcon} style={styles.deleteImage}></Image>
        </TouchableOpacity>
      </TouchableOpacity>
      )}
  }

  const styles = StyleSheet.create({
    itemContainter: {
      flex: 1, 
      flexDirection: 'row',
      backgroundColor: '#D4D4D4',
      height: 75,
      marginTop: 3
    },
    idContainer: {
      flex: 0.15,
      justifyContent: 'center',
      alignContent: 'center'
    },
    idText: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 22,
    },
    itemURLContainer: {
      flex: 0.7,
      justifyContent: 'center'
    },
    URLText: {
      fontSize: 15,
    },
    itemDeleteContainer: {
      flex: 0.15,
      justifyContent: 'center',
      alignContent: 'center'
    },
    deleteImage: {
      width: 40,
      height: 40
    },
  });