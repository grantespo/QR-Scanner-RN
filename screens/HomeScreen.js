import React, {useState, useContext, useEffect} from 'react';
import { NavigationContext } from 'react-navigation';
import * as SQLite from 'expo-sqlite';

import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default function HomeScreen() {
  const [qrCodes, setQRCodes] = useState([]);
  const qrDB = SQLite.openDatabase('qrDB');
  const navigation = useContext(NavigationContext);

  useEffect(() => {
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
  }, []);

   const _renderItem = (item) => {
    return (
      <CodeListItem
        item={item.item}
        navigation={navigation}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={Object.values(qrCodes)} 
          renderItem={item => _renderItem(item)}
          /> 
    </SafeAreaView>
  );
}

//TODO Navigation not working
class CodeListItem extends React.PureComponent { 

  render() {
    const openWebview = () => {
      /*alert("yo") 
      const navigateAction = NavigationActions.navigate({
        routeName: 'WebView',
        params: {url: this.props.item.url},
      
        // navigate can have a nested navigate action that will be run inside the child router
        //action: NavigationActions.navigate({ routeName: 'SubProfileRoute' }),
      });
  
      this.props.navigation.dispatch(navigateAction)*/
      this.props.navigation.navigate('WebView', {
         url: this.props.item.url
      })
    }

   return (
    <TouchableOpacity onPress={() => openWebview()} style={styles.itemContainter}>
      <View style={styles.idContainer}>
   <Text style={styles.idText}>{this.props.item.id}</Text>
      </View>
      <View style={styles.itemURLContainer}>
   <Text style={styles.URLText}>{this.props.item.url}</Text>
      </View>
      <TouchableOpacity style={styles.itemDeleteContainer}>
        <Image style={styles.deleteImage}></Image>
      </TouchableOpacity>
    </TouchableOpacity>
    )}
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    width: 25,
    height: 25,
    backgroundColor: 'black',
  },
});
