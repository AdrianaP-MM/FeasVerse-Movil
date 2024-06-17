import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from '../../components/inputs/CustomTextInputPassword'; // Importamos nuestro componente CustomTextInput

const NewPassword = ({ navigation }) => {
    const [password, setPassword] = useState(''); // Estado para almacenar la nueva contraseña
    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para almacenar la confirmación de la contraseña
    const [isValidPassword, setIsValidPassword] = useState(false); // Estado para verificar si la contraseña es válida

    useEffect(() => {
        // Validar las contraseñas cuando cambian
        setIsValidPassword(password === confirmPassword && validatePassword(password));
    }, [password, confirmPassword]);

    // Función para restablecer la contraseña
    const handleResetPassword = () => {
        console.log('Contraseña restablecida'); // Mostrar mensaje en consola
        navigation.navigate('Message'); // Navegar a la pantalla 'Message' (probablemente para mostrar un mensaje de éxito)
    };

    // Función para validar la contraseña
    const validatePassword = (password) => {
        // Aquí puedes aplicar tus reglas de validación para la contraseña
        return password.length >= 6; // Ejemplo: al menos 6 caracteres
    };

    // Función para manejar el cambio en el campo de texto de la contraseña
    const handlePasswordChange = (password) => {
        setPassword(password); // Actualizar el estado 'password' con el valor ingresado
    };

    // Función para manejar el cambio en el campo de texto de confirmación de contraseña
    const handleConfirmPasswordChange = (confirmPassword) => {
        setConfirmPassword(confirmPassword); // Actualizar el estado 'confirmPassword' con el valor ingresado
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Título y subtítulo */}
                <Text style={styles.title}>Restablecer contraseña</Text>
                <Text style={styles.subtitle}>Por favor, ingresa algo que recuerdes.</Text>
                <Text style={styles.label}>Nueva contraseña</Text>
                
                {/* Input para la nueva contraseña */}
                <CustomTextInput
                    placeholder="Ingresa tu nueva contraseña"
                    value={password}
                    onChangeText={handlePasswordChange} // Proporcionamos la función para manejar el cambio en el texto
                />
                <Text style={styles.label}>Confirmar contraseña</Text>
                
                {/* Input para confirmar la contraseña */}
                <CustomTextInput
                    placeholder="Confirma tu contraseña"
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange} // Proporcionamos la función para manejar el cambio en el texto
                />
                
                {/* Botón para restablecer contraseña, se deshabilita si la contraseña no es válida */}
                <TouchableOpacity
                    style={[styles.button, !isValidPassword && styles.buttonDisabled]}
                    onPress={handleResetPassword}
                    disabled={!isValidPassword}
                >
                    <Text style={styles.buttonText}>Restablecer contraseña</Text>
                </TouchableOpacity>
            </View>
            {/* Barra de estado de la aplicación */}
            <StatusBar style="auto" />
        </View>
    );
};

// Estilos para los componentes de la pantalla
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
