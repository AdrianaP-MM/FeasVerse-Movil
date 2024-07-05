import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import CustomTextInput from '../../components/inputs/CustomTextInput '; // Importamos nuestro componente CustomTextInput

// Componente funcional Correo
const Correo = ({ navigation }) => {
    const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico ingresado
    const [isValidEmail, setIsValidEmail] = useState(false); // Estado para verificar si el correo es válido

    // Función para enviar el código de verificación al correo ingresado
    const handleSendCode = async () => {
        const formData = new FormData();
        formData.append('correo_electronico_paso1', email);

        try {
            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=searchMail`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status) {
                const form2 = new FormData();
                form2.append('correo_electronico_paso1', email);
                form2.append('nombre_destinatario', data.dataset.nombre_trabajador);

                const response2 = await fetch(`${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=enviarCodigoRecuperacion`, {
                    method: 'POST',
                    body: form2,
                });

                const data2 = await response2.json();

                if (data2.status) {
                    Alert.alert('Éxito', 'Se ha enviado correctamente al correo electrónico, ingrese el código enviado');
                    console.log(data2.codigo);
                    navigation.navigate('Code', { email, codigo: data2.codigo, id: data.dataset.id_cliente });
                } else {
                    Alert.alert('Error', data2.error);
                }
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al enviar el código.');
        }
    };

    // Función para validar el formato del correo electrónico utilizando una expresión regular
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de email
        return emailRegex.test(email); // Devuelve true si el email cumple con el formato, false si no
    };

    // Función para manejar el cambio en el campo de texto del correo electrónico
    const handleEmailChange = (email) => {
        setEmail(email); // Actualiza el estado 'email' con el valor ingresado
        setIsValidEmail(validateEmail(email)); // Actualiza el estado 'isValidEmail' con el resultado de la validación
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#1591CC" />
            </TouchableOpacity>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>Restablecer contraseña</Text>
                    <Text style={styles.subtitle}>No te preocupes, te ayudaremos a restablecer tu contraseña. Ingresa tu correo electrónico para mandar un código de restablecimiento.</Text>
                    <Text style={styles.label}>Correo electrónico</Text>
                </View>
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
    buttonDisabled: {
        backgroundColor: '#ccc',
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

// Exportar el componente Correo
export default Correo;
