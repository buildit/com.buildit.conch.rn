import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function LinksScreen() {
  const [code, setCode] = useState("Click button below to capture code");
  const [hasPermission, setHasPermission] = useState(null);
  const [scannerHidden, setScannerVisibility] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setCode(`Code with type ${type} and data ${data} has been scanned!`);
    setScannerVisibility(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.codeLabel}>{code}</Text>
      {
        scannerHidden ? (
          <Button 
            title={"Capture QR Code"}
            onPress={() => {
              setScannerVisibility(false);
            }}
          />
        ) : (
          <View style={styles.scanner}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          </View>    
        )
      }
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
  },
  scanner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
});
