import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Dimensions, Alert, TouchableOpacity, Modal, Pressable, TextInput, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import OrderProductCard from '../../components/Cards/OrderProductCard';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';
import { Rating } from 'react-native-ratings'; // Importa Rating desde react-native-ratings
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');
const PEDIDOS_API = 'services/publica/pedidos.php';

const MostrarDetalles = ({ route, navigation }) => {
    const { idPedido, estadoPedido } = route.params;
    const [nombre, setNombre] = useState('');
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedZapato, setSelectedZapato] = useState('0');
    const [tituloComentario, setTituloComentario] = useState('');
    const [descripcionComentario, setDescripcionComentario] = useState('');
    const [calificacion, setCalificacion] = useState(0);
    const [coloresZapato, setColoresZapato] = useState([]);

    const fetchData = async (api, action, formData = null) => {
        const url = `${Config.IP}/FeasVerse-Api-main/api/${api}?action=${action}`;
        const options = formData ? { method: 'POST', body: formData } : { method: 'GET' };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
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

    const fetchUsuario = () => {
        fetch`${Config.IP}/FeasVerse-Api-main/api/services/publica/cliente.php?action=readCliente)`
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

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleCommentSubmit = async () => {
        if (!selectedZapato || !tituloComentario || !descripcionComentario || calificacion <= 0) {
            Alert.alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const FORM = new FormData();
            FORM.append('idDetalleZapato', selectedZapato);
            FORM.append('tituloComentario', tituloComentario);
            FORM.append('descripcionComentario', descripcionComentario);
            FORM.append('fecha', new Date().toISOString());
            FORM.append('calificacion', calificacion);
            FORM.append('estado', 'pendiente');

            const response = await fetchData(PEDIDOS_API, 'comentarioCreate', FORM);
            if (response.status) {
                Alert.alert('Comentario creado exitosamente');
                closeModal();
            } else {
                Alert.alert(response.error);
            }
        } catch (error) {
            Alert.alert('Error al enviar el comentario');
            console.error('Fetch error:', error);
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
            <TouchableOpacity
                style={styles.commentButton}
                onPress={openModal}
            >
                <Text style={styles.commentButtonText}>Comentar pedido</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Comentar productos</Text>
                        <Picker
                            selectedValue={selectedZapato}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedZapato(itemValue)}
                        >
                            <Picker.Item label="Selecciona el zapato" value="0" />
                            {products.map((product) => (
                                <Picker.Item key={product.id_detalles_pedido} label={product.nombre_zapato} value={product.id_detalles_pedido} />
                            ))}
                        </Picker>
                        <TextInput
                            style={styles.input}
                            onChangeText={setTituloComentario}
                            value={tituloComentario}
                            placeholder="Título del comentario"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setDescripcionComentario}
                            value={descripcionComentario}
                            placeholder="Descripción del comentario"
                            multiline
                        />
                        <Text style={styles.modalText}>Calificación:</Text>
                        <Rating
                            type='star'
                            startingValue={calificacion}
                            imageSize={30}
                            onFinishRating={(rating) => setCalificacion(rating)}
                            style={styles.rating}
                        />
                        <View style={styles.btnContainer}>
                            <Button
                                title="Guardar Comentario"
                                color="white"
                                onPress={handleCommentSubmit}
                            />
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={closeModal}
                        >
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </Pressable>
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
    },
    headerLabel: {
        marginRight: 10,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTextLight: {
        color: '#fff',
        fontSize: 16,
    },
    headerTextBold: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    labelBackground: {
        backgroundColor: '#007BFF',
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    headerLine: {
        backgroundColor: '#fff',
        height: 2,
    },
    estadoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    estadoText: {
        fontSize: 18,
    },
    scrollView: {
        flex: 1,
    },
    totalContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 15,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    commentButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 15,
    },
    commentButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
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
    picker: {
        height: 50,
        width: width * 0.8,
    },
    input: {
        width: width * 0.8,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btnContainer: {
        marginTop: 15,
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
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
        fontSize: 20,
    },
    rating: {
        marginVertical: 10,
    },
});

export default MostrarDetalles;