import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import OrderCard from '../../components/Cards/OrderCard';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const PEDIDOS_API = 'services/publica/pedidos.php';

const Pedidos = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [products, setProducts] = useState([]);

    const fetchData = async (api, action, formData = null) => {
        const url = `${Config.IP}/FeasVerse/api/${api}?action=${action}`;
        const options = formData ? { method: 'POST', body: formData } : { method: 'GET' };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    };

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

    const fetchPedidosData = async () => {
        try {
            const response = await fetchData(PEDIDOS_API, 'readAllOrdersOfClients');
            if (response.status) {
                setProducts(response.dataset);
            } else if (response.message === 'Acceso denegado') {
                Alert.alert('Necesitas iniciar sesión para ver tus pedidos');
            } else {
                Alert.alert(response.error);
            }
        } catch (error) {
            Alert.alert('Error al cargar los datos del carrito');
            console.error('Fetch error:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUsuario();
            fetchPedidosData();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLabel}>
                    <FontAwesome name="truck" size={40} color="#fff" />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTextLight}>Hola, {nombre}</Text>
                    <Text style={styles.headerTextBold}>Tu historial de pedidos</Text>
                </View>
            </View>
            <View style={styles.labelBackground} />
            <View style={styles.headerLine} />
            <ScrollView style={styles.scrollView}>
                {products.map(product => (
                    <OrderCard
                        key={product.id_pedido}
                        order={product}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Regresar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

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
    backButton: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Pedidos;
