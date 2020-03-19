import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import colornames from '../assets/data/colornames.json';

const PAGE_SIZE = 100;

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(colornames.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE));
  const [refreshing, setRefreshing] = useState(false);
  return (
    <FlatList 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      data={items}
      keyExtractor={item => item.hex}
      renderItem={({item, index}) => {
        return customTableViewCell(item)
      }}
      onEndReached={() => {
        if (items.length < colornames.length) {
          let nextPage = page+1;
          setItems([...items, ...colornames.slice(page*PAGE_SIZE, nextPage*PAGE_SIZE)]);
          setPage(nextPage);
        }
      }}
      onRefresh={() => {
        setRefreshing(true);
        setPage(1);
        setItems(colornames.slice(0, PAGE_SIZE));
        setRefreshing(false);
      }}
      refreshing={refreshing}
      onEndReachedThreshold={0.5}
      initialNumToRender={PAGE_SIZE}
    />
  );
}

function customTableViewCell(item) {
    return (
      <View style={styles.customCell}>
        <View style={[styles.colorCell, {backgroundColor: item.hex}]}></View>
        <Text style={[styles.labelCell, {color: item.hex}]}>{item.name}</Text>
      </View>
    )
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 40,
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'column'
  },
  customCell: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    flex: 1,
    alignSelf: 'stretch'
  },
  colorCell: {
    borderRadius: 20,
    height: 40,
    width: 40
  },
  labelCell: {
    flexGrow: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    paddingVertical: 12
  }
});
