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
    });

    const loadFonts = async () => {
        await Font.loadAsync({
            'Black': require('../../../assets/fonts/TitilliumWeb-Black.ttf'),
        });

        setFontsLoaded(true);
    }
    if (!fontsLoaded) {
        return ( <View/>)

    }
    return (
        <View style={styles.container}>
            <View style={styles.containerBlue}>
                <Image source={logoImg} style={styles.logo} />
            </View>
            <Text style={style = styles.text}>
                FEASVERSE
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
            <View style={styles.btn}>
                <Button title="Go to App" onPress={onBack} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputStyles: {
        color: 'black',
        paddingHorizontal: 0,
    },
    containerBlue: {
        width: '100%',
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    btn: {
        width: 200,
        marginTop: 25,
    },
    text: {
        color: Colors.Titulos,
        fontSize: FontSizes.Titulos,
        fontFamily: 'Black'
    }
});

export default LogIn;
