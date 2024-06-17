import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from '../../components/inputs/CustomTextInput '; // Importamos nuestro componente CustomTextInput

const Code = ({ route, navigation }) => {
    const [code, setCode] = useState(''); // Estado para almacenar el código ingresado por el usuario
    const email = route.params?.email; // Obtenemos el email del parámetro route

    // Función para manejar el cambio en el campo de texto del código
    const handleCodeChange = (text) => {
        setCode(text); // Actualizamos el estado 'code' con el valor ingresado
    };

    // Función para manejar la verificación del código
    const handleVerify = () => {
        console.log('Código ingresado:', code); // Mostramos el código ingresado en la consola
        navigation.navigate('NewPassword'); // Navegamos a la pantalla 'NewPassword' (probablemente para establecer una nueva contraseña)
    };

    return (
        <View style={styles.container}>
            {/* Botón para retroceder */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#1591CC" />
            </TouchableOpacity>
            <View style={styles.content}>
                <View>
                    {/* Título y subtítulo */}
                    <Text style={styles.title}>Por favor, revisa tu correo electrónico</Text>
                    <Text style={styles.subtitle}>Hemos enviado un código a {email}</Text>
                    <Text style={styles.label}>Código</Text>
                </View>
                {/* Usamos nuestro componente CustomTextInput en lugar de TextInput estándar */}
                <CustomTextInput
                    placeholder="Ingresa el código"
                    keyboardType="numeric"
                    value={code}
                    onChangeText={handleCodeChange} // Proporcionamos la función para manejar el cambio en el texto
                />
                {/* Botón para verificar el código */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleVerify} // Llama a la función para verificar el código
                >
                    <Text style={styles.buttonText}>Verificar</Text>
                </TouchableOpacity>
            </View>
            {/* Texto para regresar */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backTextContainer}>
                <Text style={styles.backText}>Regresar</Text>
            </TouchableOpacity>
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
        textAlign: 'start',
    },
    subtitle: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'start',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#1591CC',
        marginBottom: 5,
        textAlign: 'start',
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#1591CC',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
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

export default Code; // Exportamos el componente Code para ser utilizado en otras partes de la aplicación
