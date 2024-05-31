import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Prueba from './src/screens/Prueba'

export default function App() {
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
          <Text>Open up App.js to start working on your app!</Text>
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