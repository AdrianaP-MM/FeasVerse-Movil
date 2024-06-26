import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, Dimensions } from 'react-native';
import Text from '../../components/utils/Text';
import CardMarca from '../../components/zapatos/cardMarca';
import CardZapato from '../../components/zapatos/cardZapato';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontSizes, Config } from '../../utils/constantes';

const window = Dimensions.get('window'); // Obtener dimensiones de la ventana

const Zapatos = () => {

    // Calcular altura dinámica para porcentajes
    const screenHeight = window.height;
    const fila1Height = screenHeight * 0.60;

    return (
        <View style={styles.containerTotal}>
            <StatusBar style="dark" backgroundColor="#1591CC" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View>
                    
                </View>
                <View style={styles.colMarcas}>

                </View>
                <View style={styles.colZapatos}>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerTotal: {
        flex: 1,
        backgroundColor: '#FAFBFF',
        marginTop: 30,
        paddingBottom: 40,
    },
    scrollViewContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1,
    },
    colMarcas: {
        width: '30%',
        height: 300,
        backgroundColor: 'pink',
    },
    colZapatos: {
        width: '65%',
        height: 300,
        backgroundColor: 'pink',
    },
});

export default Zapatos;
