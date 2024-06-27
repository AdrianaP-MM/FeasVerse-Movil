import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, Dimensions } from 'react-native';
import Text from '../../components/utils/Text';
import Pastilla from '../../components/buttons/Pastilla';
import CardMarca from '../../components/zapatos/cardMarca';
import CardZapato from '../../components/zapatos/cardZapato';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontSizes, Config } from '../../utils/constantes';

const window = Dimensions.get('window'); // Obtener dimensiones de la ventana

const Inicio = () => {
    const [userName, setUserName] = useState('');

    // Función para leer el nombre del cliente
    const readUser = async () => {
        try {
            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=readCliente`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                setUserName(data.name.nombre_cliente);
            } else {
                //Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error(error);
            //Alert.alert('Error', 'Hubo un problema al leer el usuario');
        }
    };

    useEffect(() => {
        readUser();
    }, []);

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
                                    <Text texto='Somos' fontSize={24} color='white' font='TTWeb-Bold'/>
                                    <Image
                                        source={require('../../img/icons/iconZapato.png')}
                                        style={styles.shoeImage}
                                    />
                                </View>
                                <Text texto='¡FeasVerse!' fontSize={24} color='white' font='TTWeb-Bold'/>
                            </View>
                            <View style={styles.colImg}>
                                <Image
                                    source={require('../../img/zapatos/shoeImg.png')}
                                />
                            </View>
                        </View>
                        <View style={styles.f1Body}>
                            <Text texto='¿Qué quieres hacer hoy?' fontSize={18} color='white' font='TTWeb-Light'/>
                            <View style={styles.rowGrap}>
                                <Pastilla text='Ir de compras' />
                                <Pastilla text='¡Ver los productos!' />
                                <Pastilla text='Actualizar mi usuario' />
                            </View>
                        </View>
                        <View style={styles.cardContainer}>
                            <View style={styles.cardHeader}>
                                <Text texto='¡INCREIBLE! haz realizado un total de 69 pedidos de nuestros productos ¡en este mes de mayo!' fontSize={13} font='TTWeb-SemiBold'/>
                            </View>
                            <View style={styles.cardBody}>
                                <Text texto='Par más vendido en este mes' color='#252525' />
                                <Image
                                    source={require('../../img/zapatos/shoeDefault.png')}
                                    style={styles.shoeImg}
                                />
                                <Text texto='Conseguir el mio >>' color='#0066FF' fontSize={15} textAlign='center' font='TTWeb-Black'/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.fila2}>
                    <View style={styles.containerScroll}>
                        <View style={styles.textContainer}>
                            <Text texto='Nuestras mejores marcas asociadas' fontSize={15} font='TTWeb-SemiBold'/>
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
                            <Text texto='Selección especial de nuestro equipo' fontSize={15} font='TTWeb-SemiBold'/>
                        </View>
                        <ScrollView horizontal={true} style={styles.scrollHorizontal}>
                            <CardZapato />
                            <CardZapato />
                            <CardZapato />
                            <CardZapato />
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
});

export default Inicio;
