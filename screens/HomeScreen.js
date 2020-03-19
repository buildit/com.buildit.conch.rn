import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import colornames from '../assets/data/colornames.json';

export default function HomeScreen() {
  return (
    <FlatList 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      data={colornames}
      keyExtractor={item => item.hex}
      renderItem={({item, index}) => {
        return customTableViewCell(item)
      }}
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
