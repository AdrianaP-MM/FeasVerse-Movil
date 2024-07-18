import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import * as Font from 'expo-font';
import DateTimePicker from '@react-native-community/datetimepicker';

// Componente funcional Registrarse
const Registrarse = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [dui, setDUI] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nacimiento, setNacimiento] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [direccion, setDireccion] = useState('');
    const [clave, setClave] = useState('');
    const [claveconfirmada, setConfirmarClave] = useState('');
    const [registro, setFechaRegistro] = useState(new Date());
    const [fontsLoaded, setFontsLoaded] = useState(false);

    // Función para navegar a la pantalla de inicio de sesión
    const handelViewLogIn = () => {
        navigation.navigate('LogIn');
    };

    // Cargar fuentes personalizadas cuando el componente se monta
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

        // Establecer la fecha de registro a la fecha actual al montar el componente
        setFechaRegistro(new Date());
    }, []);

    // Mostrar una vista vacía mientras se cargan las fuentes
    if (!fontsLoaded) {
        return <View />;
    }

    // Manejar el cambio de fecha en el selector de fecha
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || nacimiento;
        setShowPicker(false);
        setNacimiento(currentDate);
    };

    // Validar que el usuario sea mayor de 18 años
    const validarEdad = () => {
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad >= 18;
    };

    // Manejar el registro del usuario
    const handlerRegistrar = async () => {
        if (!validarEdad()) {
            Alert.alert('Error', 'Debes ser mayor de 18 años para registrarte.');
            return;
        }

        let url = `${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=signUp`;
        const formData = new FormData();
        formData.append('nombreInput', nombre);
        formData.append('apellidosInput', apellido);
        formData.append('correoInput', correo);
        formData.append('duiInput', dui);
        formData.append('telefonoInput', telefono);
        formData.append('fechanInput', nacimiento.toISOString().split('T')[0]); // Formato YYYY-MM-DD
        formData.append('fecharInput', registro.toISOString().split('T')[0]); // Formato YYYY-MM-DD
        formData.append('direccionInput', direccion);
        formData.append('contraInput', clave);
        formData.append('confirmContraseña', claveconfirmada);

        const fetchApi = await fetch(url, {
            method: 'POST',
            body: formData
        });
        
        const datos = await fetchApi.json();
        if (datos.status) {
            Alert.alert('Te has registrado correctamente');
            handelViewLogIn();
        } else {
            console.log(datos);
            Alert.alert('Error de sesión', datos.error);
        }
    };

    // Estructura de la pantalla
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Registrarse</Text>
            <TextInput
                label="Nombre"
                valor={nombre}
                setValor={setNombre}
                keyboardType="default"
                placeholder="Introduce tu nombre"
                autoCapitalize="words"
            />
            <TextInput
                label="Apellido"
                valor={apellido}
                setValor={setApellido}
                keyboardType="default"
                placeholder="Introduce tu apellido"
                autoCapitalize="words"
            />
            <TextInput
                label="Correo electrónico"
                valor={correo}
                setValor={setCorreo}
                keyboardType="email-address"
                placeholder="Introduce tu correo"
                autoCapitalize="none"
            />
            <TextInput
                label="DUI"
                valor={dui}
                maxLength={10}
                setValor={setDUI}
                keyboardType="default"
                placeholder="Introduce tu DUI"
                autoCapitalize="none"
            />
            <TextInput
                label="Teléfono"
                valor={telefono}
                maxLength={9}
                setValor={setTelefono}
                keyboardType="numeric"
                placeholder="Introduce tu número de teléfono"
                autoCapitalize="none"
            />
            <View style={styles.containerFecha}>
                <Button onPress={() => setShowPicker(true)} title="Seleccionar fecha de nacimiento" />
                {showPicker && (
                    <DateTimePicker
                        mode="date"
                        value={nacimiento}
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <Text style={styles.text}>Fecha seleccionada: {nacimiento.toLocaleDateString()}</Text>
            </View>
            <View style={styles.containerFecha}>
                <Text style={styles.text}>Fecha de registro: {registro.toLocaleDateString()}</Text>
            </View>
            <TextInput
                label="Dirección"
                valor={direccion}
                setValor={setDireccion}
                keyboardType="default"
                placeholder="Introduce tu dirección"
                autoCapitalize="sentences"
            />
            <TextInput
                label="Contraseña"
                valor={clave}
                setValor={setClave}
                keyboardType="default"
                placeholder="Introduce tu contraseña"
                secureTextEntry={true}
            />
            <TextInput
                label="Confirma tu contraseña"
                valor={claveconfirmada}
                setValor={setConfirmarClave}
                keyboardType="default"
                placeholder="Confirma tu contraseña"
                secureTextEntry={true}
            />
            <View style={styles.btnContainer}>
                <Button
                    title="Registrarse"
                    onPress={handlerRegistrar}
                />
            </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={handelViewLogIn}>
                    <Text style={styles.link}>Regresar a inicio de sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Estilos para los componentes de la pantalla
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerFecha: {
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    btnContainer: {
        marginTop: 20,
        width: '80%',
        height: 50,
        borderRadius: 4,
        overflow: 'hidden',
    },
    textTitle: {
        color: Colors.TituloInicio,
        fontSize: FontSizes.Titulos,
        fontFamily: 'Bold',
        marginBottom: 30,
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
    text2: {
        marginTop: 100,
        fontSize: FontSizes.medium,
        fontFamily: 'Regular',
    },
});

// Exportar el componente
export default Registrarse;