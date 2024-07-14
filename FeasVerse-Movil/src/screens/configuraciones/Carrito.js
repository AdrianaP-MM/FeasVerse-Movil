import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, Pressable, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../../components/Cards/ProductCard'; // Importa el componente ProductCard
import { Colors, FontSizes, Config } from '../../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
// URL de la API de zapatos
const ZAPATOS_API = 'services/publica/zapatos.php';
// URL de la API del carrito
const CARRITO_API = 'services/publica/carrito.php';

const Carrito = ({ navigation }) => {
    // Define los estados
    const [nombre, setNombre] = useState('');
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState('');

    // Función para obtener los datos de la API
    const fetchData = async (api, action, formData = null) => {
        const url = `${Config.IP}/FeasVerse/api/${api}?action=${action}`;
        const options = formData ? { method: 'POST', body: formData } : { method: 'GET' };
        const response = await fetch(url, options);
        const text = await response.text();
        return JSON.parse(text);
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
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
                setLoading(false);
            });
    };

    // Función para mostrar un mensaje de alerta
    const sweetAlert = (type, message, timer = false) => {
        Alert.alert(
            type === 3 ? 'Error' : 'Success',
            message,
            [{ text: 'OK' }],
            { cancelable: true }
        );
    };

    // Efecto para cargar los datos del carrito
    useFocusEffect(
        React.useCallback(() => {
            fetchUsuario();
            fetchCartData();  // Esta línea ya está presente
        }, [])
    );



    const fetchCartData = async () => {
        try {
            console.log("Fetching cart data...");  // Agrega este log
            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/carrito.php?action=readAll`);
            const text = await response.text();
            try {
                const result = JSON.parse(text);
                if (result.status) {
                    setProducts(result.dataset);
                    calculateTotal(result.dataset);
                } else if (result.message === 'Acceso denegado') {
                    setIsAuthenticated(false);
                    showModal('Necesitas iniciar sesión para ver el carrito');
                } else {
                    showModal(result.error);
                }
            } catch (jsonError) {
                showModal('Error al parsear los datos del carrito');
                console.error('JSON parse error:', jsonError);
            }
        } catch (error) {
            showModal('Error al cargar los datos del carrito');
            console.error('Fetch error:', error);
        }
    };


    // Función para calcular el total de la compra
    const calculateTotal = (products) => {
        const totalAmount = products.reduce((sum, product) => sum + parseFloat(product.precio_total), 0);
        setTotal(totalAmount);
    };

    // Función para eliminar un producto del carrito
    const handleDelete = async (id) => {
        try {
            const formData = new FormData();
            formData.append('idDetallesPedido', id);

            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/carrito.php?action=deleteRow`, {
                method: 'POST',
                body: formData
            });

            const text = await response.text();
            try {
                const result = JSON.parse(text);
                if (result.status) {
                    fetchCartData();
                } else {
                    showModal(result.message);
                }
            } catch (jsonError) {
                showModal('Error al parsear los datos de la eliminación');
                console.error('JSON parse error:', jsonError);
            }
        } catch (error) {
            showModal('Error al eliminar el producto');
            console.error('Fetch error:', error);
        }
    };



    // Función para actualizar la cantidad de un producto en el carrito
    const handleUpdateQuantity = async (id, id_detalle_zapato, quantity) => {
        if (!quantity || isNaN(quantity) || quantity <= 0) {
            showModal('Por favor, introduce una cantidad válida.');
            return;
        }

        try {
            // Verificar stock
            const formData = new FormData();
            formData.append('id_detalle_zapato', id_detalle_zapato);
            console.log(id);
            const response = await fetch(`${Config.IP}/FeasVerse/api/${ZAPATOS_API}?action=validationCantidad`, {
                method: 'POST',
                body: formData
            });

            const text = await response.text();
            const result = JSON.parse(text);
            console.log(result);
            if (result.status) {
                const { cantidad_zapato } = result.dataset;
                if (quantity > cantidad_zapato) {
                    showModal(`Ingrese otra cantidad, nuestro stock actual de este zapato es: ${cantidad_zapato}`);
                    return;
                }
            } else {
                showModal(result.error);
                return;
            }

            const updateFormData = new FormData();
            updateFormData.append('idDetallesPedido', id);
            updateFormData.append('cantidad', quantity);

            const updateResponse = await fetch(`${Config.IP}/FeasVerse/api/services/publica/carrito.php?action=updateRow`, {
                method: 'POST',
                body: updateFormData
            });

            const updateText = await updateResponse.text();
            const updateResult = JSON.parse(updateText);
            console.log(updateResult);
            if (updateResult.status) {
                showModal('Se ha actualizado correctamente');
                await fetchCartData();
                closeEditModal(); // Llama a la función closeEditModal aquí para limpiar el campo de cantidad
            } else {
                showModal(updateResult.message);
            }
        } catch (error) {
            showModal('Error al actualizar la cantidad');
            console.error('Fetch error:', error);
        }
    };


    // Función para realizar la compra
    const handleBuy = async () => {
        try {
            if (total === 0) {
                showModal('No hay productos en el carrito');
                return;
            }

            const DATA0 = await fetchData(CARRITO_API, 'leerPrecios');
            if (DATA0.status) {
                const ROW0 = DATA0.dataset;
                const idPrecio = ROW0.id_costo_de_envio_por_departamento;

                const repartidorData = await fetchData(CARRITO_API, 'leerRepartidor');
                if (repartidorData.status) {
                    const repartidorRow = repartidorData.dataset;
                    const idRepartidor = repartidorRow.id_trabajador;

                    const today = new Date();
                    const year = today.getFullYear();
                    const month = String(today.getMonth() + 1).padStart(2, '0');
                    const day = String(today.getDate()).padStart(2, '0');
                    const formattedDate = `${year}-${month}-${day}`;

                    const formData = new FormData();
                    formData.append('fecha_de_inicio', formattedDate);
                    formData.append('id_costo_de_envio_por_departamento', idPrecio);
                    formData.append('estado_pedido', 1);

                    const carritoData = await fetchData(CARRITO_API, 'readAll');
                    if (carritoData.status) {
                        const carritoRow = carritoData.dataset[0];
                        const idPedidoCliente = carritoRow.id_pedido_cliente;

                        formData.append('id_pedido_cliente', idPedidoCliente);
                        formData.append('id_repartidor', idRepartidor);
                        formData.append('precio_total', total);

                        const updateData = await fetchData(CARRITO_API, 'update', formData);
                        if (updateData.status) {
                            Alert.alert('Compra realizada con éxito');
                            navigation.navigate('Configuraciones');
                        } else {
                            if (updateData.message === 'Acceso denegado') {
                                sweetAlert(3, 'Debes de iniciar sesión', false);
                                navigation.navigate('LogIn');
                            } else {
                                showModal(updateData.error);
                            }
                        }
                    } else {
                        showModal(carritoData.error);
                    }
                } else {
                    if (repartidorData.message === 'Acceso denegado') {
                        sweetAlert(3, 'Debes de iniciar sesión', false);
                        navigation.navigate('Login');
                    } else {
                        showModal(repartidorData.error);
                    }
                }
            } else {
                showModal(DATA0.error);
            }
        } catch (error) {
            showModal('Error al realizar la compra');
            console.error('Fetch error:', error);
        }
    };

    // Función para mostrar un mensaje modal
    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    // Función para abrir el modal
    const closeModal = () => {
        setModalVisible(false);
    };

    // Función para cerrar el modal de editar
    const closeEditModal = () => {
        setEditModalVisible(false);
        setSelectedProduct(null);
        setQuantity(''); // Limpia el campo de cantidad
    };

    // Función para abrir el modal de editar
    const openEditModal = (product) => {
        setSelectedProduct(product);
        setQuantity(product.cantidad_pedido.toString());
        setEditModalVisible(true);
    };
    // Función para abrir el modal de eliminar
    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setDeleteModalVisible(true);
    };

    // Función para cerrar el modal de eliminar
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
                    <Text style={styles.headerTextLight}>Hola, {nombre}</Text>
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
                <Text style={styles.totalText}>Total: ${!isNaN(total) ? total.toFixed(2) : '0.00'}</Text>
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
                                        onPress={() => handleUpdateQuantity(selectedProduct.id_detalles_pedido, selectedProduct.id_detalle_zapato, quantity)}
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