import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Image, Text, Alert } from 'react-native';
import TextInputC from '../../components/inputs/Border_Down';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import * as Font from 'expo-font';

const logoImg = require("../../img/LogoFeasVerse.png");

const LogIn = ({ logueado, setLogueado }) => {
    const [correo, setCorreo] = useState('fer12@gmail.com');
    const [clave, setClave] = useState('clave12345');
    const [fontsLoaded, setFontsLoaded] = useState(false);


    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'Black': require('../../../assets/fonts/TitilliumWeb-Black.ttf'),
                'Bold': require('../../../assets/fonts/Roboto-Black.ttf'),
                'Medium': require('../../../assets/fonts/Roboto-Medium.ttf'),
                'Regular': require('../../../assets/fonts/Roboto-Regular.ttf')
            });

            setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return <View />;
    }

    const handlerLogin = async () => {
        let url = `${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=logIn`;
        const formData = new FormData();
        formData.append('correo', correo)
        formData.append('clave', clave)
        console.log('Datos enviados:', { correo, clave });

        //Realizar la petición http 
        const fetchApi = await fetch(url, {
            method: 'POST',
            body: formData
        })
        const datos = await fetchApi.json();
        if (datos.status) {
            Alert.alert('Yei', datos.error);
        }
        else {
            console.log(datos);
            // Alert the user about the error
            Alert.alert('Error sesion', datos.error);
        }


    };

    const handleLogOut = async () => {
        const url = `${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=logOut`;
        //Realizar la petición http 
        const fetchApi = await fetch(url)
        const datos = await fetchApi.json();
        if (datos.status) {
            setLogueado(false)
        }
        else {
            console.log(datos);
            // Alert the user about the error
            Alert.alert('Error sesion', datos.error);
        }


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
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                placeholder="Introduce tu correo"
                autoCapitalize="none"
            />
            <TextInputC
                value={clave}
                onChangeText={setClave}
                label="Contraseña"
                placeholder="Introduce tu contraseña"
                secureTextEntry={true}
            />
            <View style={styles.btnContainer}>
                <Button
                    title="Iniciar Sesión"
                    onPress={handlerLogin}
                />
            </View>
            <View style={styles.btnContainer}>
                <Button
                    title="Cerrar"
                    onPress={handleLogOut}
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
