import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Image, Text } from 'react-native';
import TextInputC from '../../components/inputs/Border_Down';
import { Colors, FontSizes } from '../../utils/constantes';
import * as Font from 'expo-font';
const logoImg = require("../../img/LogoFeasVerse.png");

const LogIn = ({ onBack }) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        if (!fontsLoaded) {
            loadFonts();
        }
    }, []);

    const loadFonts = async () => {
        await Font.loadAsync({
            'Black': require('../../../assets/fonts/TitilliumWeb-Black.ttf'),
            'Bold': require('../../../assets/fonts/Roboto-Black.ttf'),
            'Medium': require('../../../assets/fonts/Roboto-Medium.ttf'),
            'Regular': require('../../../assets/fonts/Roboto-Regular.ttf')
        });

        setFontsLoaded(true);
    }

    if (!fontsLoaded) {
        return <View />;
    }

    return (
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            <Text style={styles.title}>
                FEASVERSE
            </Text>
            <Text style={styles.textTitle}>
                Inicio de sesión
            </Text>
            <TextInputC
                label="Correo electrónico"
                keyboardType="email-address"
                placeholder="Introduce tu correo"
            />
            <TextInputC
                label="Contraseña"
                maxLength={20}
                secureTextEntry={true}
                placeholder="Introduce tu contraseña"
            />
            <View style={styles.btnContainer}>
                <Button
                    title="Iniciar Sesión"
                    onPress={() => {
                        // Lógica para iniciar sesión
                    }}
                />
            </View>
            <Text style={styles.text}>
                ¿Olvidaste tu contraseña? <Text style={styles.text1}>Restablecer</Text>
            </Text>
            <Text style={styles.text2}>
                ¿No tienes cuenta? <Text style={styles.text1}>Crea una cuenta</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    btnContainer: {
        marginTop: 20,
        width: '80%',
        height: 50,
        borderRadius: 4,
        color: Colors.TituloL,
        overflow: 'hidden',
    },
    title: {
        color: Colors.TituloL,
        fontSize: FontSizes.Titulos,
        fontFamily: 'Black',
        marginBottom: 30,
    },
    textTitle: {
        color: Colors.TituloInicio,
        fontSize: FontSizes.Titulos,
        fontFamily: 'Bold',
        marginBottom: 60,
    },
    text: {
        color: Colors.pass,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
        marginTop: 10,
    },
    text1: {
        color: Colors.TituloL,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
    },
    text2: {
        marginTop: 100,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
    },
});

export default LogIn;
