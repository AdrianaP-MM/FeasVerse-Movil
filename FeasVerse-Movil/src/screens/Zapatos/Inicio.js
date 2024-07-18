import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, Dimensions, Modal, TouchableOpacity } from 'react-native';
import Text from '../../components/utils/Text';
import Pastilla from '../../components/buttons/Pastilla';
import CardMarca from '../../components/zapatos/cardMarca';
import CardZapato from '../../components/zapatos/cardZapato';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import { fillData } from '../../utils/fillData';
import { useFocusEffect } from '@react-navigation/native';

const window = Dimensions.get('window'); // Obtener dimensiones de la ventana

// Pantalla de Inicio
const Inicio = ({ navigation }) => {
    const [zapatos, setZapatos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [masVendido, setMasVendido] = useState('');
    const [userName, setUserName] = useState('');
    const [cantdPedidos, setCantdPedidosPorMes] = useState('');

    // Función para comprobar si hay un carrito existente
    const comprobarCarrito = async () => {
        const DATA0 = await fetchData('services/publica/carrito.php', 'readAllCarrito');

        if (DATA0.status) {
            console.log('Si hay carrito');
        } else {
            const FORM1 = new FormData();
            FORM1.append('estado_pedido', 4);

            const DATA2 = await fetchData('services/publica/carrito.php', 'createRow', FORM1);

            if (DATA2.status) {
                sweetAlert(4, DATA.error, true);
            } else {
                sweetAlert(4, DATA.error, true);
            }
        }
    };


    // Efecto para cargar los datos del carrito
    useFocusEffect(
        React.useCallback(() => {
            readElements(); // Leer elementos de la API
            comprobarCarrito(); // Comprobar si hay un carrito
        }, [])
    );

    // Función para leer datos de la API
    const readElements = async () => {
        try {
            const responses = await Promise.all([
                fillData({ php: 'cliente', accion: 'readCliente' }),
                fillData({ php: 'zapatos', accion: 'readAllEspecial' }),
                fillData({ php: 'marcas', accion: 'readAll' }),
                fillData({ php: 'zapatos', accion: 'readMasVendido' }),
                fillData({ php: 'cliente', accion: 'readCantidadPedidosPorMes' })
            ]);

            const [response, responseShoe, responseMarcas, responseShoeVendido, responsePedidosPorMes] = responses;

            if (responsePedidosPorMes) {
                setCantdPedidosPorMes(responsePedidosPorMes);
            } else {
                Alert.alert('Error', 'No se pudo obtener los pedidos');
            }

            if (response) {
                setUserName(response.nombre_cliente);
            } else {
                Alert.alert('Error', 'No se pudo obtener el nombre del cliente.');
            }

            if (Array.isArray(responseShoe) && responseShoe.length > 0) {
                setZapatos(responseShoe);
            } else {
                //Alert.alert('No hay zapatos', 'No se pudo obtener los zapatos o no hay zapatos disponibles.');
            }

            if (Array.isArray(responseMarcas) && responseMarcas.length > 0) {
                setMarcas(responseMarcas);
            } else {
                //Alert.alert('No hay Marcas', 'No se pudo obtener las marcas o no hay marcas disponibles.');
            }

            if (responseShoeVendido) {
                setMasVendido(responseShoeVendido);
            } else {
                Alert.alert('No hay zapato mas vendido', 'No se pudo obtener el zapato o no hay zapato disponible.');
            }

        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    // Función para cambiar de pantalla al detalle del zapato más vendido
    function handleViewDetalleMas() {
        if (masVendido.id_zapato != null || masVendido.id_zapato != 0) {
            navigation.navigate('Detalle', { id_zapato: masVendido.id_zapato });
        }
    };

    // Función para cambiar de pantalla al detalle de un zapato específico
    function handleViewDetalle(id_zapato) {
        if (id_zapato != null || id_zapato != 0) {
            navigation.navigate('Detalle', { id_zapato: id_zapato });
            console.log(id_zapato);
        }
    }

    // Calcular altura dinámica para porcentajes
    const screenHeight = window.height;
    //const fila1Height = screenHeight * 0.85;
    //const whiteSpaceHeight = screenHeight * 0.85;

    return (
        <View style={styles.containerTotal}>
            <StatusBar style="dark" backgroundColor="#1591CC" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.whiteSpace}>
                    <View style={styles.fila1}>
                        <View style={styles.f1Header}>
                            <View style={styles.colTexto}>
                                <Text texto={`¿Qué tal ${userName}?`} fontSize={24} color='white' font='TTWeb-SemiBold' />
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
                                <Pastilla text='Ir de compras' action={'Carrito'}/>
                                <Pastilla text='¡Ver los productos!' action={'Zapatos'} />
                                <Pastilla text='Actualizar mi usuario' action={'Perfil'}/>
                            </View>
                        </View>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardHeader}>
                                <Text texto={`¡INCREIBLE! haz realizado un total de ${cantdPedidos.cantidad_pedidos} pedido/s de nuestros productos ¡en este mes de ${cantdPedidos.mes_actual}`} fontSize={13} font='TTWeb-SemiBold' />
                            </View>
                            <View style={styles.cardBody}>
                                <Text texto='Par más vendido en este mes' color='#252525' />
                                <TouchableOpacity onPress={handleViewDetalleMas}>
                                    <Image
                                        source={masVendido.foto_detalle_zapato ?
                                            { uri: `${Config.IP}/FeasVerse/api/helpers/images/zapatos/${masVendido.foto_detalle_zapato}` }
                                            : require('../../img/defaultImage.png')}
                                        style={styles.shoeImg}
                                    />
                                </TouchableOpacity>
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
                            {marcas.map(marca => (
                                <CardMarca key={marca.id_marca}
                                    marcaData={{
                                        foto: marca.foto_marca
                                    }} />
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.containerScroll}>
                        <View style={styles.textContainer}>
                            <Text texto='Selección especial de nuestro equipo' fontSize={15} font='TTWeb-SemiBold' />
                        </View>
                        <ScrollView horizontal={true} style={styles.scrollHorizontal}>
                            {zapatos.map(zapato => (
                                <TouchableOpacity key={zapato.id_zapato} onPress={() => handleViewDetalle(zapato.id_zapato)}>
                                    <CardZapato
                                        zapatoData={{
                                            nombre: zapato.nombre_zapato,
                                            genero: zapato.genero_zapato,
                                            estrellas: zapato.estrellas_zapato,
                                            foto: zapato.foto_detalle_zapato,
                                            precio: zapato.precio_unitario_zapato
                                        }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    containerTotal: {
        flex: 1,
        backgroundColor: '#FAFBFF',
        alignItems: 'center',
        marginTop: 30,
        paddingBottom: 60,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    whiteSpace: {
        width: '100%',
        minHeight: 700,
    },
    fila1: {
        width: '100%',
        backgroundColor: '#1591CC',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: 500,
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
        minHeight: 360,
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
        height: 190,
        borderRadius: 10,
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
