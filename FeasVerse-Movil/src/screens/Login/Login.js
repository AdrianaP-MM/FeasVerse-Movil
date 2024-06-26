import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Image, Text, Alert, TouchableOpacity } from 'react-native';
import TextInputC from '../../components/inputs/Border_Down';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import * as Font from 'expo-font';

const logoImg = require("../../img/LogoFeasVerse.png");

const LogIn = ({ logueado, setLogueado, navigation }) => {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Función para cambiar de pantalla
    const handelViewInicio = () => {
        navigation.navigate('Inicio'); 
    };

    const handelViewRestablecer = () => {
        navigation.navigate('Correo'); 
    };

    const handelViewRegistrar = () => {
        navigation.navigate('Registrarse'); 
    };

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

        //Realizar la petición http 
        const fetchApi = await fetch(url, {
            method: 'POST',
            body: formData
        })
        const datos = await fetchApi.json();
        if (datos.status) {
            Alert.alert('Has iniciado correctamente sesion');
            handelViewInicio();
        }
        else {
            console.log(datos);
            Alert.alert('Error de sesion', datos.error);
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
                valor={correo}
                setValor={setCorreo}
                keyboardType="email-address"
                placeholder="Introduce tu correo"
                autoCapitalize="none"
            />
            <TextInputC
                valor={clave}
                setValor={setClave}
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
            <View style={styles.row}>
                <Text style={styles.text}>
                    ¿Olvidaste tu contraseña? 
                </Text>
                <TouchableOpacity onPress={handelViewRestablecer}>
                    <Text style={styles.link}>Restablecer</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={styles.text1}>
                    ¿No tienes cuenta? 
                </Text>
                <TouchableOpacity onPress={handelViewRegistrar}>
                    <Text style={styles.link1}>Crea una cuenta</Text>
                </TouchableOpacity>
            </View>
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    text: {
        color: Colors.pass,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
        
    },
    link: {
        color: Colors.TituloL,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
    text1: {
        color: Colors.pass,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
        marginTop: 50
        
    },
    link1: {
        color: Colors.TituloL,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
        marginLeft: 5,
        marginTop: 50
    },
    text2: {
        marginTop: 100,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
    },
});

export default LogIn;
