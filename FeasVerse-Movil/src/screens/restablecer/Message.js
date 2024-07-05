import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Componente funcional Message
const Message = ({ navigation }) => {
    // Función para manejar el retorno al inicio de sesión
    const handleReturnToLogin = () => {
        navigation.navigate('LogIn'); // Navegar de regreso a la pantalla inicial de sesión ('App' podría ser el nombre de la pantalla principal de la aplicación)
    };

    return (
        <View style={styles.container}>
            {/* Contenido del componente */}
            <View style={styles.content}>
                <Text style={styles.title}>Contraseña restablecida</Text>
                <Text style={styles.subtitle}>Tu contraseña ha sido restablecida correctamente.</Text>
                {/* Botón para regresar al inicio de sesión */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleReturnToLogin}
                >
                    <Text style={styles.buttonText}>Regresar al inicio de sesión</Text>
                </TouchableOpacity>
            </View>
            {/* Barra de estado de la aplicación */}
            <StatusBar style="auto" />
        </View>
    );
};

// Estilos para los componentes del mensaje
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Fondo blanco
        paddingHorizontal: 20, // Relleno horizontal
        justifyContent: 'center', // Centrado vertical
    },
    content: {
        flex: 1,
        justifyContent: 'center', // Centrado vertical
        alignItems: 'center', // Centrado horizontal
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1591CC', // Color azul
        marginBottom: 10, // Margen inferior
        textAlign: 'center', // Alineación centrada
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d', // Color gris
        textAlign: 'center', // Alineación centrada
        marginBottom: 20, // Margen inferior
    },
    button: {
        width: '100%', // Ancho completo
        padding: 15, // Relleno
        backgroundColor: '#1591CC', // Color de fondo azul
        borderRadius: 5, // Bordes redondeados
        alignItems: 'center', // Centrado horizontal
        marginTop: 10, // Margen superior
    },
    buttonText: {
        color: '#fff', // Color de texto blanco
        fontSize: 16,
        fontWeight: 'bold', // Texto en negrita
    },
});

export default Message; // Exporta el componente Message para ser utilizado en otras partes de la aplicación
