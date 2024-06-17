import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Code = ({ route, navigation }) => {
    const [code, setCode] = useState(['', '', '', '']);
    const email = route.params?.email;

    const handleCodeChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
    };

    const handleVerify = () => {
        // Aquí iría la lógica para verificar el código
        console.log('Código ingresado:', code.join(''));
        navigation.navigate('NewPassword');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Por favor, revise tu correo electrónica</Text>
            <Text style={styles.subtitle}>Mandamos el correo a {email}</Text>
            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.codeInput}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleCodeChange(text, index)}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleVerify}>
                <Text style={styles.buttonText}>Verificar</Text>
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
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 20,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    codeInput: {
        width: '20%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#007aff',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Code;
