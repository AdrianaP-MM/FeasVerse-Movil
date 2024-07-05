import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from '../../components/inputs/CustomTextInput '; // Importamos nuestro componente CustomTextInput
import { Colors, FontSizes, Config } from '../../utils/constantes';

// Componente funcional Code
const Code = ({ route, navigation }) => {
    const [code, setCode] = useState(''); // Estado para almacenar el código ingresado por el usuario
    const { email, codigo, id } = route.params; // Obtenemos el email, código y id del parámetro route

    // Función para manejar el cambio en el campo de texto del código
    const handleCodeChange = (text) => {
        setCode(text); // Actualizamos el estado 'code' con el valor ingresado
    };

    // Función para manejar la verificación del código
    const handleVerify = () => {
        if (code.trim() === codigo) {
            Alert.alert('Éxito', 'Código ingresado correctamente');
            navigation.navigate('NewPassword', { id }); // Navegamos a la pantalla 'NewPassword'
        } else {
            Alert.alert('Error', 'El código no coincide con el que se le envió en el correo.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#1591CC" />
            </TouchableOpacity>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>Por favor, revisa tu correo electrónico</Text>
                    <Text style={styles.subtitle}>Hemos enviado un código a {email}</Text>
                    <Text style={styles.label}>Código</Text>
                </View>
                <CustomTextInput
                    placeholder="Ingresa el código"
                    keyboardType="numeric"
                    value={code}
                    onChangeText={handleCodeChange}
                />
                <TouchableOpacity style={styles.button} onPress={handleVerify}>
                    <Text style={styles.buttonText}>Verificar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backTextContainer}>
                <Text style={styles.backText}>Regresar</Text>
            </TouchableOpacity>
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

// Exportamos el componente Code
export default Code;

