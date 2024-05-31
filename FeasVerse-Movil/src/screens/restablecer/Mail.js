import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
    
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
