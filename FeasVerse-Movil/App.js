import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Prueba from './src/screens/Prueba'
import { LogBox } from 'react-native'; // NO QUITAR

export default function App() {
  // Ignore all log notifications porque ka advertencia no supe como sacarla, entonces, que no se muestre lol, NO QUITAR
  LogBox.ignoreAllLogs();
  const [currentScreen, setCurrentScreen] = useState('App');

  const gotoPrueba = () => {
    setCurrentScreen('Prueba');
  };

  const gotoApp = () => {
    setCurrentScreen('App');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'App' ? (
        <View>
          <Text></Text>
          <Button title="Go to Prueba" onPress={gotoPrueba} />
        </View>
      ) : (
        <Prueba onBack={gotoApp} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});