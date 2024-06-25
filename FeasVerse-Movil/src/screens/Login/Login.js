import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Image, Text, Alert } from 'react-native';
import TextInputC from '../../components/inputs/Border_Down';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import * as Font from 'expo-font';
const logoImg = require("../../img/LogoFeasVerse.png");

const LogIn = ({ logueado, setLogueado }) => {

    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
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

    const handlerLogin = async () => {
        let url = `${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=logIn`;
        const formData = new FormData();
        formData.append('correo', correo);
        formData.append('clave', clave);
    
        try {
            const fetchApi = await fetch(url, {
                method: 'POST',
                body: formData
            });
            
            // Verifica si la respuesta es HTML
            const textResponse = await fetchApi.text();
            if (textResponse.startsWith('<')) {
                console.error('La respuesta es HTML:', textResponse);
                Alert.alert('Error de servidor', 'La respuesta del servidor no es válida.');
                return;
            }
    
            // Intenta convertir a JSON
            const datos = JSON.parse(textResponse);
            if (datos.status) {
                setLogueado(!logueado);
            } else {
                console.log(datos);
                Alert.alert('Error sesión', datos.error);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            Alert.alert('Error', 'Hubo un problema con la solicitud.');
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
                value={correo}
                onChangeText={setCorreo}
                label="Correo electrónico"
                keyboardType="email-address"
                placeholder="Introduce tu correo"
            />
            <TextInputC
                value={clave}
                onChangeText={setClave}
                label="Contraseña"
                maxLength={20}
                secureTextEntry={true}
                placeholder="Introduce tu contraseña"
            />
            <View style={styles.btnContainer}>
                <Button
                    title="Iniciar Sesión"
                    onPress={handlerLogin}
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
