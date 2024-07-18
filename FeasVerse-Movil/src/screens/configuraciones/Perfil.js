import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, Pressable, ActivityIndicator, Alert, Button, StatusBar, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

// para conseguir el width de la pantalla
const { width } = Dimensions.get('window');

// Componente funcional Perfil
const Perfil = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [dui, setDUI] = useState('');
    const [idCliente, setID] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nacimiento, setNacimiento] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [direccion, setDireccion] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalNombre, setModalNombre] = useState('');
    const [modalApellido, setModalApellido] = useState('');
    const [modalCorreo, setModalCorreo] = useState('');
    const [modalDUI, setModalDUI] = useState('');
    const [modalTelefono, setModalTelefono] = useState('');
    const [modalNacimiento, setModalNacimiento] = useState(new Date());
    const [modalDireccion, setModalDireccion] = useState('');
    const [modalID, setModalID] = useState('');

    // Efecto para cargar los datos del carrito
    useFocusEffect(
        React.useCallback(() => {
            fetchUsuario();
        }, [])
    );

    // Función para obtener los datos del usuario
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
                    setID(usuario.id_cliente);
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

    // Función para editar los datos del usuario
    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('idCliente', idCliente); 
            formData.append('nombreInput', modalNombre);
            formData.append('apellidosInput', modalApellido);
            formData.append('correoInput', modalCorreo);
            formData.append('duiInput', modalDUI);
            formData.append('telefonoInput', modalTelefono);
            formData.append('fechanInput', modalNacimiento.toISOString().split('T')[0]);
            formData.append('direccion', modalDireccion);
    
            const response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/cliente.php?action=editProfile`, {
                method: 'POST',
                body: formData
            });
    
            const data = await response.json();
            if (data.status) {
                Alert.alert('Éxito', data.message);
                setNombre(modalNombre);
                setApellido(modalApellido);
                setCorreo(modalCorreo);
                setDUI(modalDUI);
                setTelefono(modalTelefono);
                setNacimiento(modalNacimiento);
                setDireccion(modalDireccion);
                setID(modalID);
                setIsModalVisible(false);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al editar el usuario');
        }
    };

    // Verificar si la carga de datos está en proceso
    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando...</Text>
            </View>
        );
    }

    // Función para abrir el modal de edición
    const openModal = () => {
        setModalNombre(nombre);
        setModalApellido(apellido);
        setModalCorreo(correo);
        setModalDUI(dui);
        setModalTelefono(telefono);
        setModalNacimiento(nacimiento);
        setModalDireccion(direccion);
        setModalID(idCliente); 
        setIsModalVisible(true);
    };

    // Función para cerrar el modal de edición
    const closeModal = () => {
        setIsModalVisible(false);
    };

    // Estructura de la pantalla
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
            <View style={styles.inputs}>
                <TextInput
                    label="Nombre"
                    valor={nombre}
                    onChangeText={setNombre}
                    keyboardType="default"
                    placeholder="Introduce tu nombre"
                    autoCapitalize="words"
                    editable={false}
                />
                <TextInput
                    label="Apellido"
                    valor={apellido}
                    onChangeText={setApellido}
                    keyboardType="default"
                    placeholder="Introduce tu apellido"
                    autoCapitalize="words"
                    editable={false}
                />
                <TextInput
                    label="Correo electrónico"
                    valor={correo}
                    onChangeText={setCorreo}
                    keyboardType="email-address"
                    placeholder="Introduce tu correo"
                    autoCapitalize="none"
                    editable={false}
                />
                <TextInput
                    label="DUI"
                    valor={dui}
                    maxLength={10}
                    onChangeText={setDUI}
                    keyboardType="default"
                    placeholder="Introduce tu DUI"
                    autoCapitalize="none"
                    editable={false}
                />
                <TextInput
                    label="Teléfono"
                    valor={telefono}
                    maxLength={9}
                    onChangeText={setTelefono}
                    keyboardType="numeric"
                    placeholder="Introduce tu número de teléfono"
                    autoCapitalize="none"
                    editable={false}
                />
                <View style={styles.containerFecha}>
                    <Text style={styles.text}>Fecha de nacimiento: {nacimiento.toLocaleDateString()}</Text>
                </View>
                <TextInput
                    label="Dirección"
                    valor={direccion}
                    onChangeText={setDireccion}
                    keyboardType="default"
                    placeholder="Introduce tu dirección"
                    autoCapitalize="sentences"
                    editable={false}
                />
                <View style={styles.btnContainer}>
                    <Button
                        title="Editar Informacion"
                        onPress={openModal}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Editar Información</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setModalNombre}
                            value={modalNombre}
                            placeholder="Nombre"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setModalApellido}
                            value={modalApellido}
                            placeholder="Apellido"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setModalCorreo}
                            value={modalCorreo}
                            placeholder="Correo"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setModalDUI}
                            value={modalDUI}
                            placeholder="DUI"
                            maxLength={10}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setModalTelefono}
                            value={modalTelefono}
                            placeholder="Teléfono"
                            keyboardType="numeric"
                            maxLength={9}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setModalDireccion}
                            value={modalDireccion}
                            placeholder="Dirección"
                        />
                        <View style={styles.btnContainer}>
                            <Button
                                title="Guardar"
                                onPress={handleEdit}
                            />
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={closeModal}
                        >
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

// Estilos para los componentes de la pantalla
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
        paddingHorizontal: 10,
        borderBottomRightRadius: 20,
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
        width: '90%',
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
});

// Exportar el componente Perfil
export default Perfil;