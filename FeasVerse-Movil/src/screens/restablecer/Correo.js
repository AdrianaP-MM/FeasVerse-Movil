import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from '../../components/inputs/CustomTextInput '; // Importamos nuestro componente CustomTextInput

const Correo = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    const handleSendCode = () => {
        console.log('Enviar código a:', email);
        navigation.navigate('Code', { email });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (email) => {
        setEmail(email);
        setIsValidEmail(validateEmail(email));
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#1591CC" />
            </TouchableOpacity>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>Restablecer contraseña</Text>
                    <Text style={styles.subtitle}>
                        No te preocupes, te ayudaremos a restablecer tu contraseña. Ingresa tu correo electrónico para mandar un código de restablecimiento.
                    </Text>
                    <Text style={styles.label}>Correo electrónico</Text>
                </View>
                {/* Usamos CustomTextInput en lugar de TextInput */}
                <CustomTextInput
                    placeholder="Ingrese tu correo electrónico"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={handleEmailChange}
                />
                <TouchableOpacity
                    style={[styles.button, !isValidEmail && styles.buttonDisabled]}
                    onPress={handleSendCode}
                    disabled={!isValidEmail}
                >
                    <Text style={styles.buttonText}>Mandar código</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backTextContainer}>
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
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#1591CC',
        borderRadius: 5,
        backgroundColor: '#fff',
        zIndex: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1591CC',
        marginBottom: 10,
        textAlign: 'start', // Ajustado a 'start'
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'start', // Ajustado a 'start'
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#1591CC',
        marginBottom: 5,
        textAlign: 'start', // Ajustado a 'start'
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#1591CC',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc', // Color de fondo cuando el botón está deshabilitado
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backTextContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    backText: {
        color: '#6c757d',
        fontSize: 16,
    },
});

export default Correo;
