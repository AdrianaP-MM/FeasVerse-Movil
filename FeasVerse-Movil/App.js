import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Prueba from './src/screens/Prueba';
import Correo from './src/screens/restablecer/Correo';
import Code from './src/screens/restablecer/Code';
import New from './src/screens/restablecer/NewPassword';
import { LogBox } from 'react-native'; // NO QUITAR

export default function App() {
  // Ignore all log notifications porque la advertencia no supe como sacarla, entonces, que no se muestre lol, NO QUITAR
  LogBox.ignoreAllLogs();
  const [currentScreen, setCurrentScreen] = useState('App');
  const [email, setEmail] = useState('');

  const gotoPrueba = () => {
    setCurrentScreen('Prueba');
  };

  const gotoMail = () => {
    setCurrentScreen('Correo');
  };

  const gotoCode = (email) => {
    setEmail(email);
    setCurrentScreen('Code');
  };

  const gotoNewPassword = () => {
    setCurrentScreen('NewPassword');
  };

  const gotoApp = () => {
    setCurrentScreen('App');
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'App' && (
        <View>
          <Text>Bienvenido a la pantalla principal</Text>
          <Button title="Go to Prueba" onPress={gotoPrueba} />
          <Button title="Go to Mail" onPress={gotoMail} />
          <Button title="Go to Code" onPress={() => gotoCode(email)} />
          <Button title="Go to New Password" onPress={gotoNewPassword} />
        </View>
      )}
      {currentScreen === 'Prueba' && <Prueba onBack={gotoApp} />}
      {currentScreen === 'Correo' && <Correo onSendCode={gotoCode} onBack={gotoApp} />}
      {currentScreen === 'Code' && <Code email={email} onVerify={gotoNewPassword} onBack={gotoApp} />}
      {currentScreen === 'NewPassword' && <New onBack={gotoApp} />}
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
