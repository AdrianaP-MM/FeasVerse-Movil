import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Text from '../../components/utils/Text';
import CardMarca from '../../components/zapatos/cardMarca';
import CardZapato from '../../components/zapatos/cardZapato';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import Input from '../../components/inputs/AllBorders'
import { fillData } from '../../utils/fillData';

const window = Dimensions.get('window'); // Obtener dimensiones de la ventana

const Zapatos = ({ navigation }) => {
    // Calcular altura dinámica para porcentajes
    const screenHeight = window.height;
    const screenHeight2 = screenHeight * 1.5;

    const [selectedValue, setSelectedValue] = useState('');
    const [isBrandSelected, setIsBrandSelected] = useState(false);
    const slideAnim = useRef(new Animated.Value(-150)).current;
    const [idMarcaSelected, setIdMarca] = useState('');

    function handleBrandClick(id_marca) {
        readMarca(id_marca);
        setIsBrandSelected(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleCloseClick = () => {
        Animated.timing(slideAnim, {
            toValue: -150,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsBrandSelected(false));
        setIdMarca(0);
        readElements();
    };

    function handleViewDetalle(id_zapato) {
        if (id_zapato != null || id_zapato != 0) {
            navigation.navigate('Detalle', { id_zapato: id_zapato });
            console.log(id_zapato);
        }
    }

    const [zapatos, setZapatos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [marcaSelected, setMarcaSelected] = useState('');

    useEffect(() => {
        readElements();
    }, []);

    const readElements = async (searchResponse = null) => {
        try {
            let responseShoe, responseMarcas;

            if (searchResponse) {
                responseShoe = searchResponse;
            } else {
                const responses = await Promise.all([
                    fillData({ php: 'zapatos', accion: 'readResumeAllZapatos' }),
                    fillData({ php: 'marcas', accion: 'readAll' }),
                ]);

                [responseShoe, responseMarcas] = responses;

                if (Array.isArray(responseMarcas) && responseMarcas.length > 0) {
                    setMarcas(responseMarcas);
                } else {
                    Alert.alert('No hay Marcas', 'No se pudo obtener las marcas o no hay marcas disponibles.');
                }
            }

            if (responseShoe) {
                setZapatos(responseShoe);
            } else {
                Alert.alert('No hay Zapatos', 'No se pudo obtener los zapatos o no hay zapatos disponibles.');
            }

        } catch (error) {
            console.error('Error en leer los elementos:', error);
            //Alert.alert('Error', 'Hubo un error al obtener los datos.');
            readElements();
        }
    };

    const readMarca = async (id_marca) => {
        try {
            // Crear y llenar el formData
            const formData = new FormData();
            formData.append('idMarca', id_marca);
            console.log('id marca: ', id_marca);
            setIdMarca(id_marca);

            // Realizar las solicitudes de manera concurrente
            const [responseMarca, responseZapatos] = await Promise.all([
                fillData({
                    php: 'marcas',
                    accion: 'readOne',
                    method: 'POST',
                    formData: formData
                }),
                fillData({
                    php: 'zapatos',
                    accion: 'readResumeAllZapatosMarca',
                    method: 'POST',
                    formData: formData
                }),
            ]);

            if (responseMarca) {
                setMarcaSelected(responseMarca);
                console.log(responseMarca);
            } else {
                //Alert.alert('No hay zapatos', 'No se pudo obtener los zapatos o no hay zapatos disponibles.');
            }

            if (responseZapatos) {
                readElements(responseZapatos);
                console.log(responseZapatos);
            } else {
                //Alert.alert('No hay zapatos', 'No se pudo obtener los zapatos o no hay zapatos disponibles.');
            }
        } catch (error) {
            console.error('Error en leer la marca seleccionada:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    const searchZapatos = async (searchValue) => {
        let responseShoe;
        if (searchValue) {
            try {
                // Crear y llenar el formData
                const formData = new FormData();
                formData.append('search', searchValue);
                console.log(searchValue);

                if (idMarcaSelected == 0) {
                    responseShoe = await
                        fillData({
                            php: 'zapatos',
                            accion: 'searchValue',
                            method: 'POST',
                            formData: formData
                        });
                }
                else {
                    responseShoe = await
                        fillData({
                            php: 'zapatos',
                            accion: 'searchValueZapatoMarca',
                            method: 'POST',
                            formData: formData
                        });
                }
                if (responseShoe) {
                    readElements(responseShoe);
                    console.log(responseShoe);
                } else {
                    //Alert.alert('No hay zapatos', 'No se pudo obtener los zapatos o no hay zapatos disponibles.');
                }
            } catch (error) {
                console.error('Error en leer el zapato buscado:', error);
                Alert.alert('Error', 'Hubo un error.');
            }
        } else {
            if (idMarcaSelected == 0) {
                readElements();
                console.log('No marca seleccionada')
            }
            else {
                readMarca(idMarcaSelected);
                console.log('Marca seleccionada', idMarcaSelected)
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={[styles.containerTotal,
        { maxHeight: isBrandSelected ? null : null }]}>
            <StatusBar style="dark" backgroundColor="#1591CC" />
            <Animated.View style={[styles.animatedContainer, { marginTop: isBrandSelected ? 0 : -40 }]}>
                {isBrandSelected && (
                    <TouchableOpacity onPress={handleCloseClick} style={styles.contenedor}>
                        <View style={styles.colImage}>
                            <Image
                                source={marcaSelected.foto_marca ?
                                    { uri: `${Config.IP}/FeasVerse/api/helpers/images/marcas/${marcaSelected.foto_marca}` }
                                    : require('../../img/defaultImage.png')}
                                style={styles.marcaImg}
                            />
                        </View>
                        <View style={styles.colText}>
                            <Text texto={`${marcaSelected.descripcion_marca}`}
                                font='TTWeb-Regular' textAlign='center' />
                        </View>
                        <View style={styles.containerText}>
                            <Text texto={`${marcaSelected.nombre_marca}`} font='TTWeb-Bold' textAlign='center' fontSize={35} color='white' />
                        </View>
                    </TouchableOpacity>
                )}
            </Animated.View>
            <View style={styles.row}>
                <View style={[styles.containerFiltros, { top: isBrandSelected ? '0.5%' : '1%' }]}>
                    <Input
                        placeholder='Búsqueda...'
                        width='80%'
                        iconImage={require('../../img/icons/iconLupa.png')}
                        onChangeText={searchZapatos}
                    />

                    <View style={styles.pickerContainer}>
                        
                    </View>
                </View>
                <View style={styles.colMarcas}>
                    <Text texto='¿Te interesa alguna marca en especifico?' font='TTWeb-SemiBold' color='white' textAlign='center' />
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {marcas.map(marca => (
                            <CardMarca key={marca.id_marca}
                                marcaData={{
                                    foto: marca.foto_marca
                                }}
                                accionCard={() => handleBrandClick(marca.id_marca)}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.colZapatos}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {zapatos.length > 0 ? (
                            zapatos.map(zapato => (
                                <TouchableOpacity key={zapato.id_zapato} onPress={() => handleViewDetalle(zapato.id_zapato)}>
                                    <CardZapato
                                        zapatoData={{
                                            nombre: zapato.nombre_zapato,
                                            genero: zapato.genero_zapato,
                                            estrellas: zapato.estrellas,
                                            precio: zapato.precio_unitario_zapato,
                                            foto: zapato.foto_detalle_zapato
                                        }}
                                    />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text texto='No se encontraron coincidencias' font='TTWeb-SemiBold' textAlign='center' />
                        )}
                    </ScrollView>
                </View>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    containerTotal: {
        backgroundColor: 'white',
        flexGrow: 1,
        marginTop: 30,
        paddingBottom: 60,
    },
    row: {
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'pink',
    },
    scrollViewContent: {
        justifyContent: 'start',
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 15,
    },
    colMarcas: {
        width: '30%',
        paddingTop: 15,
        backgroundColor: '#1591CC',
        paddingTop: 200,
        paddingHorizontal: 0,
    },
    colZapatos: {
        width: '70%',
        backgroundColor: '#FAFBFF',
        paddingTop: 200,
    },
    containerFiltros: {
        width: '100%',
        position: 'absolute',
        minHeight: 150,
        zIndex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#1591CC',
        borderRadius: 15,
        width: '35%', // Puedes ajustar el ancho según sea necesario
        overflow: 'hidden', // Asegura que el borde redondeado se aplique correctamente
        backgroundColor: 'white',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    pickerItem: {
        fontSize: 15,
        fontFamily: 'TTWeb-Regular',
        color: '#7D7D7D',
    },
    animatedContainer: {
        width: '100%',
        backgroundColor: '#FAFBFF',
        alignItems: 'center',
        zIndex: 1,
    },
    contenedor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
    },
    containerText: {
        zIndex: 4,
        position: 'absolute',
        bottom: 0,
        left: '2%',
    },
    colImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        height: 250,
        backgroundColor: '#1591CC',
        borderBottomRightRadius: 15,
    },
    colText: {
        width: '55%',
        borderBottomWidth: 1,
        borderColor: '#D9D9D9',
        paddingVertical: 15,
    },
    marcaImg: {
        borderRadius: 15,
        width: 140,
        height: 140,
    },
});

export default Zapatos;
