import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomTextInput = ({ placeholder, value, onChangeText }) => {
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true); // Estado para controlar si el texto está oculto o visible

    // Función para alternar entre mostrar u ocultar el texto
    const toggleSecureEntry = () => {
        setIsSecureTextEntry(!isSecureTextEntry); // Invierte el estado actual de isSecureTextEntry
    };

    return (
        <View style={styles.inputContainer}>
            {/* Campo de entrada de texto */}
            <TextInput
                style={styles.input}
                placeholder={placeholder} // Propiedad para mostrar un texto de ejemplo cuando el campo está vacío
                value={value} // Propiedad para almacenar y mostrar el valor actual del campo
                onChangeText={onChangeText} // Propiedad para manejar cambios en el texto ingresado
                secureTextEntry={isSecureTextEntry} // Propiedad para ocultar el texto (enmascarar con asteriscos)
                autoCapitalize="none" // Propiedad para deshabilitar la auto-capitalización del texto
                autoCorrect={false} // Propiedad para deshabilitar la corrección automática del texto
            />
            {/* Botón para alternar entre mostrar/ocultar la contraseña */}
            <TouchableOpacity onPress={toggleSecureEntry} style={styles.iconContainer}>
                <Ionicons
                    name={isSecureTextEntry ? 'eye-off-outline' : 'eye-outline'} // Icono dependiendo del estado de isSecureTextEntry
                    size={24}
                    color="#6c757d" // Color del icono
                />
            </TouchableOpacity>
        </View>
    );
};

// Estilos para los componentes del CustomTextInput
const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1591CC',
        borderRadius: 5,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        padding: 15,
    },
    iconContainer: {
        padding: 10,
    },
});

export default CustomTextInput; // Exporta el componente CustomTextInput para ser utilizado en otras partes de la aplicación
