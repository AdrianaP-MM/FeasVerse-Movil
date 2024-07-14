import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import OrderProductCard from '../../components/Cards/OrderProductCard';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const PEDIDOS_API = 'services/publica/pedidos.php';

const MostrarDetalles = ({ route, navigation }) => {
    const { idPedido, estadoPedido } = route.params;
    const [nombre, setNombre] = useState('');
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

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
            const FORM = new FormData();
            FORM.append('idPedido', idPedido);
            const response = await fetchData(PEDIDOS_API, 'ReadAllShoesOfOneOrder', FORM);
            if (response.status) {
                setProducts(response.dataset);
                calculateTotal(response.dataset);
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

    const calculateTotal = (products) => {
        const totalAmount = products.reduce((sum, product) => sum + parseFloat(product.precio_total), 0);
        setTotal(totalAmount);
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUsuario();
            fetchPedidosData();
        }, [idPedido])
    );

    const getEstadoIcon = (estado) => {
        switch (estado) {
            case 'Pendiente':
                return <FontAwesome name="clock-o" size={24} color="red" />;
            case 'En camino':
                return <FontAwesome name="truck" size={24} color="orange" />;
            case 'Entregado':
                return <FontAwesome name="check" size={24} color="green" />;
            default:
                return <FontAwesome name="question" size={24} color="gray" />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLabel}>
                    <FontAwesome name="truck" size={40} color="#fff" />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTextLight}>Pedido #{idPedido}</Text>
                    <Text style={styles.headerTextBold}>Detalles del pedido</Text>
                </View>
            </View>
            <View style={styles.labelBackground} />
            <View style={styles.headerLine} />
            <View style={styles.estadoContainer}>
                <Text style={styles.estadoText}>Estado: {estadoPedido}</Text>
                {getEstadoIcon(estadoPedido)}
            </View>
            <ScrollView style={styles.scrollView}>
                {products.map((product) => (
                    <OrderProductCard
                        key={product.id_producto}
                        product={{
                            id: product.id_detalles_pedido,
                            image: product.foto_detalle_zapato,
                            name: product.nombre_zapato,
                            gender: product.genero,
                            size: product.num_talla,
                            color: product.nombre_color,
                            quantity: product.cantidad_pedido,
                            price: product.precio_unitario_zapato
                        }}
                    />
                ))}
            </ScrollView>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${!isNaN(total) ? total.toFixed(2) : '0.00'}</Text>
            </View>
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
    estadoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 40,
    },
    estadoText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    scrollView: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    totalContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
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

export default MostrarDetalles;
