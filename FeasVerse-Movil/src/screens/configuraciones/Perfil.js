import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, Modal, Pressable, ActivityIndicator, Alert, Button, StatusBar, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Colors, FontSizes, Config } from '../../utils/constantes';

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

    useFocusEffect(
        React.useCallback(() => {
            fetchUsuario();
        }, [])
    );

    const fetchUsuario = () => {
        setLoading(true);
        fetch(`${Config.IP}/FeasVerse-Api-main/api/services/publica/cliente.php?action=readCliente`)
            .then(response => response.json())
            .then(data => {
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
            formData.append('nombreInput', modalNombre);
            formData.append('apellidosInput', modalApellido);
            formData.append('correoInput', modalCorreo);
            formData.append('duiInput', modalDUI);
            formData.append('telefonoInput', modalTelefono);
            formData.append('fechanInput', modalNacimiento.toISOString().split('T')[0]);
            formData.append('direccion', modalDireccion);
    
            const response = await fetch(`${Config.IP}/FeasVerse-Api-main/api/services/publica/cliente.php?action=editProfile`, {
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

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text>Cargando...</Text>
            </View>
        );
    }

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

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Ionicons name="person-circle" size={80} color="#fff" />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTextLight}>Hola, {nombre}</Text>
                    <Text style={styles.headerTextBold}>Tu Perfil</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    placeholder="Nombre"
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    value={apellido}
                    placeholder="Apellido"
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    value={correo}
                    placeholder="Correo electrónico"
                    keyboardType="email-address"
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    value={dui}
                    placeholder="DUI"
                    maxLength={10}
                    editable={false}
                />
                <TextInput
                    style={styles.input}
                    value={telefono}
                    placeholder="Teléfono"
                    keyboardType="numeric"
                    maxLength={9}
                    editable={false}
                />
                <View style={styles.containerFecha}>
                    <Text style={styles.text}>Fecha de nacimiento: {nacimiento.toLocaleDateString()}</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={direccion}
                    placeholder="Dirección"
                    editable={false}
                />
                <TouchableOpacity style={styles.btnContainer} onPress={openModal}>
                    <Text style={styles.btnText}>Editar Información</Text>
                </TouchableOpacity>
            </ScrollView>
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
                            style={styles.modalInput}
                            onChangeText={setModalNombre}
                            value={modalNombre}
                            placeholder="Nombre"
                        />
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setModalApellido}
                            value={modalApellido}
                            placeholder="Apellido"
                        />
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setModalCorreo}
                            value={modalCorreo}
                            placeholder="Correo"
                            keyboardType="email-address"
                            editable={false}
                        />
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setModalDUI}
                            value={modalDUI}
                            placeholder="DUI"
                            maxLength={10}
                        />
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setModalTelefono}
                            value={modalTelefono}
                            placeholder="Teléfono"
                            keyboardType="numeric"
                            maxLength={9}
                        />
                        <TextInput
                            style={styles.modalInput}
                            onChangeText={setModalDireccion}
                            value={modalDireccion}
                            placeholder="Dirección"
                        />
                        <TouchableOpacity style={styles.modalBtnContainer} onPress={handleEdit}>
                            <Text style={styles.btnText}>Guardar</Text>
                        </TouchableOpacity>
                        <Pressable style={styles.modalCloseBtn} onPress={closeModal}>
                            <Text style={styles.modalCloseText}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    headerTextContainer: {
        marginLeft: 20,
    },
    headerTextLight: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '300',
    },
    headerTextBold: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    input: {
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#FFF',
    },
    btnContainer: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerFecha: {
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        color: '#6B7280',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: width * 0.9,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    modalInput: {
        width: '100%',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#F9FAFB',
    },
    modalBtnContainer: {
        backgroundColor: '#10B981',
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalCloseBtn: {
        marginTop: 15,
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        borderColor: '#D1D5DB',
        borderWidth: 1,
    },
    modalCloseText: {
        color: '#6B7280',
        fontSize: 16,
    },
});

export default Perfil;
