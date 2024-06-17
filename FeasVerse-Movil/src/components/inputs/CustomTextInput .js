import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CustomTextInput = ({ placeholder, keyboardType, value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input} // Estilo para el TextInput definido en los estilos
            placeholder={placeholder} // Propiedad para mostrar un texto de ejemplo cuando el campo está vacío
            keyboardType={keyboardType} // Propiedad para especificar el tipo de teclado (numérico, email, etc.)
            value={value} // Propiedad para almacenar y mostrar el valor actual del campo
            onChangeText={onChangeText} // Propiedad para manejar cambios en el texto ingresado
        />
    );
};

// Estilos para el componente CustomTextInput
const styles = StyleSheet.create({
    input: {
        width: '100%', // Ocupa el 100% del ancho disponible
        padding: 15, // Relleno interior del TextInput
        borderWidth: 1, // Ancho del borde
        borderColor: '#1591CC', // Color del borde
        borderRadius: 5, // Radio de borde para esquinas redondeadas
        marginBottom: 20, // Margen inferior para separación con otros elementos
    },
});

export default CustomTextInput; // Exporta el componente CustomTextInput para ser utilizado en otras partes de la aplicación
