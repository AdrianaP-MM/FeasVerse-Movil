import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Image, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import CustomTextInput from '../../components/inputs/CustomTextInput ';
import CustomTextInputPassword from '../../components/inputs/CustomTextInputPassword';

import * as Font from 'expo-font';

// Importar el componente de inicio de sesión
const logoImg = require("../../img/LogoFeasVerse.png");

// Componente funcional LogIn
const LogIn = ({ logueado, setLogueado, navigation }) => {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Función para cambiar de pantalla a 'Inicio'
    const handelViewInicio = () => {
        navigation.navigate('Inicio'); 
    };

    // Función para cambiar de pantalla a 'Correo' (restablecer contraseña)
    const handelViewRestablecer = () => {
        navigation.navigate('Correo'); 
    };

    // Función para cambiar de pantalla a 'Registrarse'
    const handelViewRegistrar = () => {
        navigation.navigate('Registrarse'); 
    };

    // Cargar fuentes personalizadas al montar el componente
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

    // Mostrar una vista vacía mientras se cargan las fuentes
    if (!fontsLoaded) {
        return <View />;
    }

    // Manejar el inicio de sesión
    const handlerLogin = async () => {
        let url = `${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=logIn`;
        const formData = new FormData();
        formData.append('correo', correo);
        formData.append('clave', clave);
        console.log(datos);
        // Realizar la petición HTTP
        const fetchApi = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const datos = await fetchApi.json();
        console.log(datos);
        if (datos.status) {
            Alert.alert('Has iniciado correctamente sesión');
            handelViewInicio();
        } else {
            console.log(datos);
            Alert.alert('Error de sesión', datos.error);
        }
    };

    // Manejar el cierre de sesión
    const handleLogOut = async () => {
        const url = `${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=logOut`;
        // Realizar la petición HTTP
        const fetchApi = await fetch(url);
        const datos = await fetchApi.json();
        if (datos.status) {
            setLogueado(false);
        } else {
            console.log(datos);
            Alert.alert('Error de sesión', datos.error);
        }
    };

    // Estructura de la pantalla
    return (
        <View style={styles.container}>
            <Image source={logoImg} style={styles.logo} />
            <Text style={styles.title}>
                FEASVERSE
            </Text>
            <Text style={styles.textTitle}>
                Inicio de sesión
            </Text>
            <CustomTextInput
                label="Correo electrónico"
                valor={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                placeholder="Introduce tu correo"
            />
            <CustomTextInputPassword
                valor={clave}
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

// Estilos para los componentes del inicio de sesión
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
    },
    text1: {
        color: Colors.pass,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
        marginTop: 50,
    },
    link1: {
        color: Colors.TituloL,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
        marginLeft: 5,
        marginTop: 50,
    },
    text2: {
        marginTop: 100,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
    },
});

// Exportar el componente
export default LogIn;
