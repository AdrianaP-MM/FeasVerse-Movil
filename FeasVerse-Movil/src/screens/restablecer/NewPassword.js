import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from '../../components/inputs/CustomTextInputPassword'; // Importamos nuestro componente CustomTextInput

const NewPassword = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);

    useEffect(() => {
        // Validar las contraseñas cuando cambian
        setIsValidPassword(password === confirmPassword && validatePassword(password));
    }, [password, confirmPassword]);

    const handleResetPassword = () => {
        console.log('Contraseña restablecida');
        navigation.navigate('Message');
    };

    const validatePassword = (password) => {
        // Aquí puedes aplicar tus reglas de validación para la contraseña
        return password.length >= 6; // Ejemplo: al menos 6 caracteres
    };

    const handlePasswordChange = (password) => {
        setPassword(password);
    };

    const handleConfirmPasswordChange = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                
                    <Text style={styles.title}>Restablecer contraseña</Text>
                    <Text style={styles.subtitle}>Por favor, ingresa algo que recuerdes.</Text>
                    <Text style={styles.label}>Nueva contraseña</Text>
                
                {/* Input para la nueva contraseña */}
                <CustomTextInput
                    placeholder="Ingresa tu nueva contraseña"
                    value={password}
                    onChangeText={handlePasswordChange}
                />
                <Text style={styles.label}>Confirmar contraseña</Text>
                {/* Input para confirmar la contraseña */}
                <CustomTextInput
                    placeholder="Confirma tu contraseña"
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                />
                {/* Botón para restablecer contraseña */}
                <TouchableOpacity
                    style={[styles.button, !isValidPassword && styles.buttonDisabled]}
                    onPress={handleResetPassword}
                    disabled={!isValidPassword}
                >
                    <Text style={styles.buttonText}>Restablecer contraseña</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1591CC',
        marginBottom: 10,
        textAlign: 'start',
        width: '100%',
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'start',
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: '#1591CC',
        marginBottom: 5,
        textAlign: 'start',
        width: '100%',
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#1591CC',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#ccc', // Color de fondo cuando el botón está deshabilitado
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NewPassword;
