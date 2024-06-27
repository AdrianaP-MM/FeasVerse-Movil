import React from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';

const CustomTextInput = ({ placeholder, keyboardType, value, onChangeText, iconImage, maxLength, width = '100%', textAlign = 'left', heightI = 24, widthI = 24, secureTextEntry }) => {
    return (
        <View style={[styles.container, { width }]}>
            <TextInput
                style={[styles.input, { textAlign }]} // Estilo para el TextInput definido en los estilos
                placeholder={placeholder} // Propiedad para mostrar un texto de ejemplo cuando el campo está vacío
                keyboardType={keyboardType} // Propiedad para especificar el tipo de teclado (numérico, email, etc.)
                value={value} // Propiedad para almacenar y mostrar el valor actual del campo
                onChangeText={onChangeText} // Propiedad para manejar cambios en el texto ingresado
                maxLength={maxLength} // Propiedad para limitar la longitud máxima del texto
                secureTextEntry={secureTextEntry} // Propiedad para ocultar el texto para contraseñas
            />
            {iconImage && (
                <Image
                    source={iconImage} // Fuente de la imagen del ícono
                    style={[styles.icon, { width: widthI, height: heightI }]} // Estilos del ícono
                />
            )}
        </View>
    );
};

// Estilos para el componente CustomTextInput
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Alinea los elementos en una fila
        alignItems: 'center', // Centra verticalmente los elementos en el contenedor
        borderWidth: 1, // Ancho del borde
        borderColor: '#E4E5EB', // Color del borde
        borderRadius: 15, // Radio de borde para esquinas redondeadas
        marginTop: 12, // Margen superior para separación con otros elementos
        marginBottom: 12, // Margen inferior para separación con otros elementos
        backgroundColor: 'white',
    },
    icon: {
        marginRight: 10, // Espaciado a la derecha del ícono
        tintColor: '#A8AFB9', // Color gris para el ícono
    },
    input: {
        flex: 1, // Ocupa el espacio restante en la fila
        paddingHorizontal: 15, // Relleno interior del TextInput
        paddingVertical: 6,
        fontSize: 14, // Tamaño de la fuente
        fontFamily: 'TTWeb-SemiBold', // Familia de la fuente
    },
});

export default CustomTextInput; // Exporta el componente CustomTextInput para ser utilizado en otras partes de la aplicación
