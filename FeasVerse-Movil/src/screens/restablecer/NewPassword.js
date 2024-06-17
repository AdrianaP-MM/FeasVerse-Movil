import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const New = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nueva contraseña</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>Regresar</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007aff',
        marginBottom: 20,
    },
    backText: {
        color: '#007aff',
        fontSize: 16,
    },
});

export default New;
