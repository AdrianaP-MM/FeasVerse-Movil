import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, Dimensions, Modal } from 'react-native';
import Text from '../../components/utils/Text';
import Pastilla from '../../components/buttons/Pastilla';
import CardMarca from '../../components/zapatos/cardMarca';
import CardZapato from '../../components/zapatos/cardZapato';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontSizes, Config } from '../../utils/constantes';

const window = Dimensions.get('window'); // Obtener dimensiones de la ventana

const Inicio = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Estado para autenticación

    const [zapatos, setZapatos] = useState([]);

    useEffect(() => {
        readUser();
    }, []);

    const fillData = async ({ php, accion, method, formData }) => {
        try {
            // Validar que los parámetros requeridos estén definidos
            if (!php || !accion) {
                throw new Error('Parámetros php, accion son obligatorios.');
            }

            let response;

            if (method !== 'POST') {
                // Petición GET si method no es POST
                response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/${php}.php?action=${accion}`);
            } else {
                // Petición POST si method es POST
                if (!formData) {
                    throw new Error('formData es obligatorio para el método POST.');
                }
                response = await fetch(`${Constantes.IP}/FeasVerse/api/services/publica/${php}.php?action=${accion}`, {
                    method: 'POST',
                    body: formData
                });
            }

            const result = await response.json();

            if (result.status) {
                return result.dataset; // Retorna el dataset si la respuesta es exitosa
            } else if (result.message === 'Acceso denegado') {
                setIsAuthenticated(false); // Manejo específico de "Acceso denegado"
                showModal('Necesitas iniciar sesión para ver los zapatos');
                return false;
            } else {
                // Manejo de otros errores
                showModal(result.message);
                return false;
            }
        } catch (error) {
            // Manejo de errores generales
            if (error instanceof TypeError) {
                showModal('Error de red: Por favor, verifica tu conexión.');
            } else {
                showModal(`Error: ${error.message}`);
            }
            console.error('Error en fillData:', error);
            return false;
        }
    };

    const showModal = (message) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const [userName, setUserName] = useState('');

    // Función para leer el nombre del cliente
    const readUser = async () => {
        try {
            // Llama a fillData con los parámetros correctos y espera la respuesta
            const response = await fillData({ php: 'cliente', accion: 'readCliente' });

            if (response) {
                setUserName(response.nombre_cliente);
            } else {
                Alert.alert('Error', 'No se pudo obtener el nombre del cliente.');
            }
        } catch (error) {
            console.error('Error en readUser:', error);
            Alert.alert('Error', 'Hubo un error al intentar obtener el nombre del cliente.');
        }
    };

    // Calcular altura dinámica para porcentajes
    const screenHeight = window.height;
    const fila1Height = screenHeight * 0.60;
    const whiteSpaceHeight = screenHeight * 0.85;

    return (
        <View style={styles.containerTotal}>
            <StatusBar style="dark" backgroundColor="#1591CC" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={[styles.whiteSpace, { minHeight: whiteSpaceHeight }]}>
                    <View style={[styles.fila1, { minHeight: fila1Height }]}>
                        <View style={styles.f1Header}>
                            <View style={styles.colTexto}>
                                <Text texto={`¿Qué tal ${userName}?`} fontSize={24} color='white' />
                                <View style={styles.rowGrap}>
                                    <Text texto='Somos' fontSize={24} color='white' font='TTWeb-Bold' />
                                    <Image
                                        source={require('../../img/icons/iconZapato.png')}
                                        style={styles.shoeImage}
                                    />
                                </View>
                                <Text texto='¡FeasVerse!' fontSize={24} color='white' font='TTWeb-Bold' />
                            </View>
                            <View style={styles.colImg}>
                                <Image
                                    source={require('../../img/zapatos/shoeImg.png')}
                                />
                            </View>
                        </View>
                        <View style={styles.f1Body}>
                            <Text texto='¿Qué quieres hacer hoy?' fontSize={18} color='white' font='TTWeb-Light' />
                            <View style={styles.rowGrap}>
                                <Pastilla text='Ir de compras' />
                                <Pastilla text='¡Ver los productos!' />
                                <Pastilla text='Actualizar mi usuario' />
                            </View>
                        </View>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardHeader}>
                                <Text texto='¡INCREIBLE! haz realizado un total de 69 pedidos de nuestros productos ¡en este mes de mayo!' fontSize={13} font='TTWeb-SemiBold' />
                            </View>
                            <View style={styles.cardBody}>
                                <Text texto='Par más vendido en este mes' color='#252525' />
                                <Image
                                    source={require('../../img/zapatos/shoeDefault.png')}
                                    style={styles.shoeImg}
                                />
                                <Text texto='Conseguir el mio >>' color='#0066FF' fontSize={15} textAlign='center' font='TTWeb-Black' />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.fila2}>
                    <View style={styles.containerScroll}>
                        <View style={styles.textContainer}>
                            <Text texto='Nuestras mejores marcas asociadas' fontSize={15} font='TTWeb-SemiBold' />
                        </View>
                        <ScrollView horizontal={true} style={styles.scrollHorizontal}>
                            <CardMarca />
                            <CardMarca />
                            <CardMarca />
                            <CardMarca />
                        </ScrollView>
                    </View>
                    <View style={styles.containerScroll}>
                        <View style={styles.textContainer}>
                            <Text texto='Selección especial de nuestro equipo' fontSize={15} font='TTWeb-SemiBold' />
                        </View>
                        <ScrollView horizontal={true} style={styles.scrollHorizontal}>
                            {zapatos.map(zapato => (
                                <CardZapato key={zapato.id_zapato}
                                    zapato={{
                                        zapatoImg: zapato.nombre_zapato,
                                        nombre_zapato: zapato.nombre_zapato,
                                        genero_zapato: zapato.genero_zapato,
                                        estrellas: zapato.estrellas,
                                        precio_unitario_zapato: zapato.precio_unitario_zapato,
                                    }} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{modalMessage}</Text>
                        <Button title="Cerrar" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    containerTotal: {
        flex: 1,
        backgroundColor: '#FAFBFF',
        alignItems: 'center',
        marginTop: 30,
        paddingBottom: 40,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    whiteSpace: {
        width: '100%',
    },
    fila1: {
        width: '100%',
        backgroundColor: '#1591CC',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    f1Header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '7%',
    },
    colTexto: {
        width: '50%',
    },
    rowGrap: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    shoeImage: {
        marginLeft: 20,
        width: 40,
        height: 39,
    },
    colImg: {
        width: '50%',
    },
    f1Body: {
        width: '93%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 0,
    },
    cardContainer: {
        position: 'absolute',
        top: '63%',
        bottom: 0,
        width: '85%',
        minHeight: '70%',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 25,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardHeader: {
        width: '100%',
        marginBottom: 35,
    },
    cardBody: {
        width: '100%'
    },
    shoeImg: {
        alignSelf: 'center',
        marginTop: 20,
        width: '75%',
    },
    fila2: {
        width: '100%',
    },
    containerScroll: {
        width: '100%',
        minHeight: 210,
        marginBottom: 15,
    },
    scrollHorizontal: {
        flexGrow: 1,
    },
    textContainer: {
        paddingLeft: 20,
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
});

export default Inicio;
