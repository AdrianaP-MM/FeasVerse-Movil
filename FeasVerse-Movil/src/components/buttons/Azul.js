import React from 'react';
import Text from '../utils/Text'; // Importa el componente de texto personalizado
import { StyleSheet, TouchableOpacity } from 'react-native'; // Importa los estilos y el componente TouchableOpacity de React Native

export default function Button({ textoBoton, accionBoton, fontSize = 15, width = 180, height = 55, marginTop = 0, marginBottom = 0,}) {
     // Define el estilo dinámico del botón basado en las propiedades recibidas
    const buttonStyle = {
        width: width,
        height: height,
        marginTop: marginTop,
        marginBottom: marginBottom,
    };
    
    return ( 
        // Componente de botón que devuelve un TouchableOpacity con el texto personalizado
        <TouchableOpacity style={[styles.button, buttonStyle,]} onPress={accionBoton}>
            <Text
                texto={textoBoton} // Propiedad para el texto del botón
                fontSize={fontSize} // Propiedad opcional para el tamaño de fuente, por defecto 15
                color='white' // Color del texto, fijo en blanco
                font='TTWeb-Regular' // Fuente del texto, fijo en PoppinsMedium
            />
        </TouchableOpacity>
    );
}

// Estilos del componente Button utilizando StyleSheet.create
const styles = StyleSheet.create({
    button: {
        alignItems: 'center', // Centra el contenido horizontalmente
        justifyContent: 'center', // Centra el contenido verticalmente
        backgroundColor: '#146A93', // Color de fondo del botón
        borderRadius: 10, // Borde redondeado del botón
    },
});
