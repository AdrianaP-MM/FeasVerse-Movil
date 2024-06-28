import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, Pressable, ActivityIndicator, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import TextInputC from '../../components/inputs/Border_Down';

const { width } = Dimensions.get('window');

const Configuraciones = ({ navigation }) => {

    const showModal = (message) => {
        setModalMessage(message);
        setIsModalVisible(true);
    };


    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconPlaceholder} />
                <Text style={styles.title}>Tu perfil</Text>
                <Text style={styles.description}>
                    Apartado para visualizar tu información y modificarla en caso un dato esté incorrecto o si requiere actualización.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.cartIconPlaceholder} />
                <Text style={styles.title}>Carrito</Text>
                <Text style={styles.description}>
                    Apartado para poder visualizar tu carrito donde podrás visualizar cuáles zapatos quisieras comprar o si quieres más cantidad de zapato.
                </Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
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
    btnContainer: {
        marginTop: 20,
        width: '80%',
        backgroundColor: '#0D4560',
        height: 50,
        borderRadius: 4,
        overflow: 'hidden',
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
        marginHorizontal: 30,
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
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputs: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    containerFecha: {
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default Configuraciones;
