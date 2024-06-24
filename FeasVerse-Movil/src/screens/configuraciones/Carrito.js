import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Constantes from '../../utils/constantes';
import ProductCard from '../../components/Cards/ProductCard'; // Importa el componente ProductCard

const { width } = Dimensions.get('window');

const Carrito = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Estado para autenticación

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await fetch(`${Constantes.IP}/FeasVerse/api/services/publica/zapatos.php?action=readAll`);
            const result = await response.json();
            if (result.status) {
                setProducts(result.dataset);
                calculateTotal(result.dataset);
            } else if (result.message === 'Acceso denegado') {
                setIsAuthenticated(false);
                showModal('Necesitas iniciar sesión para ver el carrito');
            } else {
                showModal(result.message);
            }
        } catch (error) {
            showModal('Error al cargar los datos del carrito');
            console.error(error);
        }
    };

    const calculateTotal = (products) => {
        const totalAmount = products.reduce((sum, product) => sum + product.precio_total, 0);
        setTotal(totalAmount);
    };

    const handleDelete = async (id) => {
        try {
            const formData = new FormData();
            formData.append('idDetallesPedido', id);

            const response = await fetch(`${Constantes.IP}/FeasVerse/api/services/publica/zapatos.php?action=deleteRow`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.status) {
                fetchCartData();
            } else {
                showModal(result.message);
            }
        } catch (error) {
            showModal('Error al eliminar el producto');
            console.error(error);
        }
    };

    const handleUpdateQuantity = async (id, quantity) => {
        try {
            const formData = new FormData();
            formData.append('idDetallesPedido', id);
            formData.append('cantidad', quantity);

            const response = await fetch(`${Constantes.IP}/FeasVerse/api/services/publica/zapatos.php?action=updateRow`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.status) {
                fetchCartData();
            } else {
                showModal(result.message);
            }
        } catch (error) {
            showModal('Error al actualizar la cantidad');
            console.error(error);
        }
    };

    const handleBuy = async () => {
        try {
            if (total === 0) {
                showModal('No hay productos en el carrito');
                return;
            }

            const formData = new FormData();
            formData.append('precio_total', total);

            const response = await fetch(`${Constantes.IP}/FeasVerse/api/services/publica/zapatos.php?action=update`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.status) {
                fetchCartData();
            } else {
                showModal(result.message);
            }
        } catch (error) {
            showModal('Error al realizar la compra');
            console.error(error);
        }
    };

    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLabel}>
                    <Ionicons name="cart" size={40} color="#fff" />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTextLight}>Hola, Adri</Text>
                    <Text style={styles.headerTextBold}>Tu carrito de compras</Text>
                </View>
            </View>
            <View style={styles.labelBackground} />
            <View style={styles.headerLine} />
            <ScrollView style={styles.scrollView}>
                {products.map(product => (
                    <ProductCard key={product.id_detalles_pedido} product={{
                        image: product.foto_detalle_zapato,
                        name: product.nombre_zapato,
                        gender: product.genero,
                        size: product.num_talla,
                        color: product.nombre_color,
                        quantity: product.cantidad_pedido,
                        price: product.precio_unitario_zapato
                    }} />
                ))}
            </ScrollView>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${total}</Text>
            </View>
            <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
                <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        {isAuthenticated ? (
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={closeModal}
                            >
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </Pressable>
                        ) : (
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    closeModal();
                                    navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión
                                }}
                            >
                                <Text style={styles.textStyle}>Iniciar Sesión</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </Modal>
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
        textAlign: 'left', // Alinea el texto a la izquierda
    },
    headerTextBold: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left', // Alinea el texto a la izquierda
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
    totalContainer: {
        marginBottom: 20,
        marginHorizontal: 20,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buyButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Carrito;
