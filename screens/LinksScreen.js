import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.codeLabel}>CODE: CODE</Text>
      <Button 
        title={"Capture QR Code"}
        onPress={() => {
                    
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'space-between',
    padding: 16
  },
  codeLabel: {
    textAlign: 'center',
    paddingVertical: 12
  }
});
