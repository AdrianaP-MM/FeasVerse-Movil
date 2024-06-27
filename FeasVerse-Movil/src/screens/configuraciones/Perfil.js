import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, Pressable, ActivityIndicator, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import TextInputC from '../../components/inputs/Border_Down';

const { width } = Dimensions.get('window');

const Perfil = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [dui, setDUI] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nacimiento, setNacimiento] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [direccion, setDireccion] = useState('');
    const [clave, setClave] = useState('');
    const [claveconfirmada, setCofirmarClave] = useState('');
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true); 

    useEffect(() => {
        fetchUsuario();
    }, []);

    const fetchUsuario = () => {
        setLoading(true);
        fetch(`${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=readCliente`)
            .then(response => response.json())
            .then(data => {
                console.log("Datos recibidos del servidor:", data); 
                if (data.dataset) {
                    const usuario = data.dataset;
                    setNombre(usuario.nombre_cliente);
                    setApellido(usuario.apellido_cliente);
                    setCorreo(usuario.correo_cliente);
                    setDUI(usuario.dui_cliente);
                    setTelefono(usuario.telefono_cliente);
                    setNacimiento(new Date(usuario.fecha_de_nacimiento));
                    setDireccion(usuario.direccion_cliente);
                    setClave(usuario.clave_cliente);
                    setLoading(false);
                } else {
                    console.error('Datos no están en el formato esperado:', data);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
                setLoading(false);
            });
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('idCliente', idCliente); 
            formData.append('nombreInput', nombre);
            formData.append('apellidosInput', apellido);
            formData.append('correoInput', correo);
            formData.append('duiInput', dui);
            formData.append('telefonoInput', telefono);
            formData.append('fechanInput', nacimiento.toISOString().split('T')[0]);
            formData.append('direccionInput', direccion);
            formData.append('contraInput', clave);
            formData.append('confirmContraseña', claveconfirmada);

            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=editProfile`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                Alert.alert('Éxito', data.message);
                setIsModalVisible(false);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al editar el usuario');
        }
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando...</Text>
            </View>
        );
    }

    const showModal = (message) => {
        setModalMessage(message);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLabel}>
                    <Ionicons name="person" size={40} color="#fff" />
                </View>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTextLight}>Hola, {nombre}</Text>
                    <Text style={styles.headerTextBold}>Tu Perfil</Text>
                </View>
            </View>
            <View style={styles.labelBackground} />
            <View style={styles.headerLine} />
            <TextInputC
                label="Nombre"
                valor={nombre}
                setValor={setNombre}
                keyboardType="default"
                placeholder="Introduce tu nombre"
                autoCapitalize="words"
            />
            <TextInputC
                label="Apellido"
                valor={apellido}
                setValor={setApellido}
                keyboardType="default"
                placeholder="Introduce tu apellido"
                autoCapitalize="words"
            />
            <TextInputC
                label="Correo electrónico"
                valor={correo}
                setValor={setCorreo}
                keyboardType="email-address"
                placeholder="Introduce tu correo"
                autoCapitalize="none"
            />
            <TextInputC
                label="DUI"
                valor={dui}
                maxLength={10}
                setValor={setDUI}
                keyboardType="default"
                placeholder="Introduce tu DUI"
                autoCapitalize="none"
            />
            <TextInputC
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
            <TextInputC
                label="Dirección"
                valor={direccion}
                setValor={setDireccion}
                keyboardType="default"
                placeholder="Introduce tu dirección"
                autoCapitalize="sentences"
            />
            <TextInputC
                label="Contraseña"
                valor={clave}
                setValor={setClave}
                keyboardType="default"
                placeholder="Introduce tu contraseña"
                secureTextEntry={true}
            />
            <TextInputC
                label="Confirma tu contraseña"
                valor={claveconfirmada}
                setValor={setCofirmarClave}
                keyboardType="default"
                placeholder="Confirma tu contraseña"
                secureTextEntry={true}
            />
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{modalMessage}</Text>
                    {isAuthenticated ? (
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={closeModal}
                        >
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                closeModal();
                                navigation.navigate('Login');
                            }}
                        >
                            <Text style={styles.textStyle}>Iniciar Sesión</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </SafeAreaView>
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
        marginHorizontal: 20,
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
});

export default Perfil;