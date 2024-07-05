import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInputPassword from '../../components/inputs/CustomTextInputPassword';
import { Colors, FontSizes, Config } from '../../utils/constantes'; // Importamos nuestro componente CustomTextInput

const NewPassword = ({ route, navigation }) => {
    const [password, setPassword] = useState(''); // Estado para almacenar la nueva contraseña
    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para almacenar la confirmación de la nueva contraseña
    const { id } = route.params; // Obtenemos el id del parámetro route

    // Función para manejar el cambio en el campo de texto de la contraseña
    const handlePasswordChange = (text) => {
        setPassword(text); // Actualizamos el estado 'password' con el valor ingresado
    };

    // Función para manejar el cambio en el campo de texto de la confirmación de la contraseña
    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text); // Actualizamos el estado 'confirmPassword' con el valor ingresado
    };

    // Función para manejar el restablecimiento de la contraseña
    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        // Creamos un objeto FormData para enviar los datos al servidor
        const formData = new FormData();
        formData.append('idCliente', id);
        formData.append('claveCliente', password);
        formData.append('confirmarCliente', confirmPassword);

        try {
            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=changePasswordLogin`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status) {
                Alert.alert('Éxito', 'Contraseña restablecida correctamente');
                navigation.navigate('Message'); // Navegamos a la pantalla 'Login'
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al restablecer la contraseña.');
        }
    };

    // Estructura de la pantalla
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>Restablecer contraseña</Text>
                    <Text style={styles.subtitle}>Ingresa tu nueva contraseña a continuación.</Text>
                    <Text style={styles.label}>Nueva contraseña</Text>
                </View>
                <CustomTextInputPassword
                    placeholder="Ingrese tu nueva contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={handlePasswordChange}
                />
                <Text style={styles.label}>Confirmar nueva contraseña</Text>
                <CustomTextInputPassword
                    placeholder="Confirme su nueva contraseña"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                />
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Restablecer contraseña</Text>
                </TouchableOpacity>
            </View>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'start',
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
});

// Exportar el componente NewPassword
export default NewPassword;
