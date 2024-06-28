import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, Pressable, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import ProductCard from '../../components/Cards/ProductCard'; // Importa el componente ProductCard

const { width } = Dimensions.get('window');

const Carrito = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Estado para autenticación
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/carrito.php?action=readAll`);
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

            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/carrito.php?action=deleteRow`, {
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
        if (!quantity || isNaN(quantity) || quantity <= 0) {
            showModal('Por favor, introduce una cantidad válida.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('idDetallesPedido', id);
            formData.append('cantidad', quantity);

            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/carrito.php?action=updateRow`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.status) {
                fetchCartData();
                closeEditModal();
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

            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/carrito.php?action=update`, {
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

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setQuantity(product.cantidad_pedido.toString());
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
    };

    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setDeleteModalVisible(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalVisible(false);
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
                    <ProductCard
                        key={product.id_detalles_pedido}
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
                        onEdit={() => openEditModal(product)}
                        onDelete={() => openDeleteModal(product)}
                    />
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={closeEditModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Editar cantidad</Text>
                        {selectedProduct && (
                            <>
                                <Text>Producto: {selectedProduct.nombre_zapato}</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={quantity}
                                    onChangeText={setQuantity}
                                    placeholder="Cantidad"
                                />
                                <View style={styles.buttonRow}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => handleUpdateQuantity(selectedProduct.id_detalles_pedido, quantity)}
                                    >
                                        <Text style={styles.textStyle}>Actualizar</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={closeEditModal}
                                    >
                                        <Text style={styles.textStyle}>Cancelar</Text>
                                    </Pressable>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={closeDeleteModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>¿Estás seguro de que quieres eliminar este producto?</Text>
                        {selectedProduct && (
                            <>
                                <Text>Producto: {selectedProduct.nombre_zapato}</Text>
                                <View style={styles.buttonRow}>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => {
                                            handleDelete(selectedProduct.id_detalles_pedido);
                                            closeDeleteModal();
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Eliminar</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={closeDeleteModal}
                                    >
                                        <Text style={styles.textStyle}>Cancelar</Text>
                                    </Pressable>
                                </View>
                            </>
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        marginTop: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
});

export default Carrito;
