import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Config } from '../../utils/constantes';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Componente funcional Configuraciones
const Configuraciones = ({ navigation }) => {
    // Estado para almacenar el nombre del usuario
    const [nombre, setNombre] = useState('');

    // Efecto para cargar los datos del carrito
    useFocusEffect(
        React.useCallback(() => {
            fetchUsuario();
        }, [])
    );
    
    // Función para obtener el nombre del usuario
    const fetchUsuario = () => {
        fetch(`${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=readCliente`)
            .then(response => response.json())
            .then(data => {
                if (data.dataset) {
                    const usuario = data.dataset;
                    setNombre(usuario.nombre_cliente);
                } else {
                    console.error('Datos no están en el formato esperado:', data);
                }
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
            });
    };

    // Función para cerrar la sesión del usuario
    const handleLogOut = async () => {
        const url = `${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=logOut`;
        const fetchApi = await fetch(url);
        const datos = await fetchApi.json();
        if (datos.status) {
            navigation.navigate('LogIn');
        } else {
            console.log(datos);
            Alert.alert('Error sesión', datos.error);
        }
    };

    // Estructura de la pantalla
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLabel}>
                    <Ionicons name="settings" size={40} color="#fff" />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTextLight}>Hola, {nombre}</Text>
                    <Text style={styles.headerTextBold}>Configuraciones</Text>
                </View>
            </View>
            <View style={styles.labelBackground} />
            <View style={styles.headerLine} />

            <ScrollView style={styles.scrollView}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Perfil')}>
                    <Ionicons name="person-circle" size={50} color="#007BFF" style={styles.iconPlaceholder} />
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.title}>Tu perfil</Text>
                        <Text style={styles.description}>
                            Apartado para visualizar tu información y modificarla en caso un dato esté incorrecto o si requiere actualización.
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pedidos')}>
                    <FontAwesome name="truck" size={50} color="#007BFF" style={styles.iconPlaceholder} />
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.title}>Tus pedidos</Text>
                        <Text style={styles.description}>
                            Apartado para visualizar tus pedidos, donde podas visualizar tus pedidos pendientes, en camino y entregados.
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Carrito')}>
                    <Ionicons name="cart" size={50} color="#007BFF" style={styles.iconPlaceholder} />
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.title}>Carrito</Text>
                        <Text style={styles.description}>
                            Apartado para poder visualizar tu carrito donde podrás visualizar cuáles zapatos quisieras comprar o si quieres más cantidad de zapato.
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                    <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

// Estilos de la pantalla Configuraciones
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        paddingVertical: 20,
        paddingHorizontal: 15,
        position: 'relative',
        zIndex: 3,
    },
    headerLabel: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerTextLight: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'left',
    },
    headerTextBold: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    labelBackground: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: width * 0.4,
        height: 160,
        backgroundColor: '#007BFF',
        zIndex: 2,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 40,
    },
    headerLine: {
        height: 15,
        backgroundColor: '#007BFF',
        opacity: 0.5,
    },
    scrollView: {
        marginHorizontal: 20,
        marginTop: 50,
        marginBottom: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    iconPlaceholder: {
        marginRight: 10,
    },
    cardTextContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 100,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

// Exportar el componente Configuraciones
export default Configuraciones;