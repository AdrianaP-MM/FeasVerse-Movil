import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Correo = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleSendCode = () => {
        // Aquí iría la lógica para enviar el código de restablecimiento
        console.log('Enviar código a:', email);
        navigation.navigate('Code', { email });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Restablecer contraseña</Text>
            <Text style={styles.subtitle}>
                No te preocupes, te ayudaremos a restablecer tu contraseña, ingresa tu correo electrónico para mandar un código de restablecimiento.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese tu correo electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                <Text style={styles.buttonText}>Mandar código</Text>
            </TouchableOpacity>
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
    subtitle: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 5,
        marginBottom: 20,
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
    backText: {
        color: '#007aff',
        fontSize: 16,
    },
});

export default Correo;
