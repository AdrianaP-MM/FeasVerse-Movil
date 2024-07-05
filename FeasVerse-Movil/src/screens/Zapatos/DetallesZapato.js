import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Text from '../../components/utils/Text';
import Talla from '../../components/zapatos/TallaPastilla';
import Button from '../../components/buttons/Azul';
import CardResena from '../../components/zapatos/CardResena'
import { StatusBar } from 'expo-status-bar';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import { fillData } from '../../utils/fillData';
import Input from '../../components/inputs/AllBorders'

// Función para mostrar la pantalla de detalles de un zapato
const Zapatos = ({ route }) => {
    // Obtener el id del zapato de la ruta
    const { id_zapato } = route.params;
    // Estados para rastrear el color y la talla seleccionados
    const [selectedColor, setSelectedValue] = useState(0);
    const [infoZapato, setInfo] = useState('');
    const [coloresZapato, setColores] = useState([]);
    const [tallasZapato, setTallas] = useState([]);
    const [resenasZapato, setResenas] = useState([]);
    const [selectedTalla, setSelectedTalla] = useState(0);
    const [cantidad, setCantidad] = useState(0);

    // Función para manejar la selección de una talla
    const handleSelect = (talla) => {
        setSelectedTalla(talla);
        console.log('Talla:', talla);
    };

    // Leer los datos del zapato con hook de efecto
    useEffect(() => {
        readZapato();
        //console.log(infoZapato);
    }, []);

    // Función para leer los datos del zapato
    const readZapato = async () => {
        try {
            // Crear y llenar el formData
            const formData = new FormData();
            formData.append('id_zapato', id_zapato);
            console.log('id zapato: ', id_zapato);

            // Realizar las solicitudes de manera concurrente
            const [responseZapato, responseColores, responseTallas, responseRenas] = await Promise.all([
                fillData({
                    php: 'zapatos',
                    accion: 'readOneDetail',
                    method: 'POST',
                    formData: formData
                }),
                fillData({
                    php: 'zapatos',
                    accion: 'readOneColoresZapato',
                    method: 'POST',
                    formData: formData
                }),
                fillData({
                    php: 'zapatos',
                    accion: 'readOneTallas',
                    method: 'POST',
                    formData: formData
                }),
                fillData({
                    php: 'zapatos',
                    accion: 'readOneReseñas',
                    method: 'POST',
                    formData: formData
                })
            ]);

            // Validar la respuesta de zapatos
            if (responseZapato) {
                setInfo(responseZapato);
            } else {
                Alert.alert('No hay zapatos', 'No se pudo obtener los zapatos o no hay zapatos disponibles.');
            }

            // Validar y usar la respuesta de colores
            if (responseColores) {
                setColores(responseColores);
            } else {
                //Alert.alert('No se pudo obtener los colores o no hay colores disponibles.');
                console.log('No se pudo obtener los colores o no hay colores disponibles.');
            }

            if (responseTallas) {
                setTallas(responseTallas);
            } else {
                //Alert.alert('No se pudo obtener las tallas o no hay tallas disponibles.');
                console.log('No se pudo obtener las tallas o no hay tallas disponibles');
            }

            if (Array.isArray(responseRenas) && responseRenas.length > 0) {
                setResenas(responseRenas);
            } else {
                //Alert.alert('No hay reseñas disponibles.');
                console.log('No hay reseñas disponibles');
            }

        } catch (error) {
            console.error('Error en leer los elementos:', error);
            //Alert.alert('Error', 'Hubo un error.');
        }
    };

    // Función para leer las tallas por color
    const readTallasPorColor = async (id_color) => {
        try {
            setSelectedTalla(0);
            console.log('Talla:', selectedTalla);
            setSelectedValue(id_color);
            // Crear y llenar el formData
            const formData = new FormData();
            formData.append('id_zapato', id_zapato);
            formData.append('id_color', id_color);
            console.log('id zapato y clr:', id_zapato, id_color);

            // Definir la acción en función de id_color
            const accion = id_color != 0 ? 'readTallasDisponiblesForColor' : 'readOneTallas';

            // Realizar la solicitud
            const responseTallas = await fillData({
                php: 'zapatos',
                accion: accion,
                method: 'POST',
                formData: formData
            });

            // Validar y usar la respuesta de tallas
            if (responseTallas) {
                setTallas(responseTallas);
            } else {
                Alert.alert('No se pudo obtener las tallas o no hay tallas disponibles.');
            }

        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    // Función para leer el detalle del zapato
    const readDetalle = async () => {
        try {
            // Crear y llenar el formData
            const formData = new FormData();
            formData.append('id_zapato', id_zapato);
            formData.append('id_color', selectedColor);
            formData.append('id_talla', selectedTalla);
            console.log('id zapato, clr y talla:', id_zapato, selectedColor, selectedTalla);

            // Realizar la solicitud
            const responseDetalle = await fillData({
                php: 'zapatos',
                accion: 'searchDetalle',
                method: 'POST',
                formData: formData
            });

            // Validar y usar la respuesta de tallas
            if (responseDetalle) {
                return responseDetalle.id_detalle_zapato;
            } else {
                Alert.alert('No se pudo obtener el detalle');
                return null;
            }

        } catch (error) {
            console.error('Error en leer el detalle:', error);
            Alert.alert('Error', 'Hubo un error.');
            return null;
        }
    };

    // Función para leer la cantidad de un zapato
    const readCantidad = async (id_detalle_zapato) => {
        try {
            // Crear y llenar el formData
            const formData = new FormData();
            formData.append('id_detalle_zapato', id_detalle_zapato);

            // Realizar la solicitud
            const responseCantidad = await fillData({
                php: 'zapatos',
                accion: 'validationCantidad',
                method: 'POST',
                formData: formData
            });

            // Validar y usar la respuesta de tallas
            if (responseCantidad) {
                return responseCantidad.cantidad_zapato;
            } else {
                Alert.alert('No se pudo obtener la cantidad');
                return null;
            }
        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    // Función para crear un detalle de pedidoz
    const ceateDetallePedido = async () => {
        try {
            console.log('Talla final: ', selectedTalla, 'Color final: ', selectedColor, 'Cantidad final: ', cantidad);

            let id_detalle = await readDetalle(); // Espera a que readDetalle termine y devuelva el resultado

            if (id_detalle > 0) {
                console.log('Detalle encontrado: ', id_detalle);
                let cantidadBase = await readCantidad(id_detalle);
                if (cantidad <= 0) {
                    Alert.alert('Advertencia', 'Por favor, ingrese una cantidad a pedir');
                }
                else {
                    if (cantidad > cantidadBase) {
                        Alert.alert('La cantidad supera el stock', `Ingrese otra cantidad, nuestro stock actual de este zapato con esa talla y color es: ${cantidadBase}`);
                    }
                    else {
                        try {
                            // Crear y llenar el formData
                            const formData = new FormData();
                            formData.append('cantidad_pedido', cantidad);
                            formData.append('id_detalle_zapato', id_detalle);
                            formData.append('precio_del_zapato', infoZapato.precio_unitario_zapato);

                            // Realizar la solicitud
                            const responseInsert = await fillData({
                                php: 'pedidos',
                                accion: 'createDetallePedido',
                                method: 'POST',
                                formData: formData
                            });

                            // Validar y usar la respuesta de tallas
                            if (responseInsert) {
                                Alert.alert('¡Se ha agregado al carrito!', 'El zapato ha sido exitosamente añadido al carrito de compras.');
                                readZapato();
                                setSelectedTalla(0);
                                setSelectedValue(0);
                                setCantidad('');
                            } else {
                                Alert.alert('No se pudo insertar al carrito');
                            }
                        } catch (error) {
                            console.error('Error en insertar los elementos:', error);
                            Alert.alert('Algo salió mal', 'No se puedo agregar al carrito error: ', error);
                        }
                    }
                }

            } else {
                Alert.alert('Advertencia', 'Por favor, seleccione un color y una talla');
            }

        } catch (error) {
            console.error('Error en insertar el pedido:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    // Retornar la vista de la pantalla de detalles de un zapato
    return (
        <ScrollView style={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#1591CC" />
            <View style={styles.contenedorZapato}>
                <View style={styles.zapatoInfo}>
                    <View style={styles.colImg}>
                        <Image
                            source={infoZapato.foto_detalle_zapato ?
                                { uri: `${Config.IP}/FeasVerse/api/helpers/images/zapatos/${infoZapato.foto_detalle_zapato}` }
                                : require('../../img/defaultImage.png')}
                            style={styles.shoeImg}
                        />
                    </View>
                    <View style={styles.colInfo}>
                        <View style={styles.shoeHeader}>
                            <Text texto={`${infoZapato.nombre_zapato}`} font='TTWeb-Regular' fontSize={24} />
                            <Text texto={`${infoZapato.genero_zapato}`} font='TTWeb-SemiBold' color='#7D7D7D' />
                        </View>
                        <View style={styles.shoeBody}>
                            <Text texto={`$${infoZapato.precio_unitario_zapato}`} fontSize={20} font='TTWeb-Bold' />
                            <View style={styles.starGrap}>
                                <Image
                                    source={require('../../img/icons/iconStar.png')}
                                />
                                <Text texto={`${infoZapato.estrellas || 0}`} fontSize={15} color='#FFA700' font='TTWeb-Bold' />
                            </View>
                        </View>
                        <View style={styles.shoeFooter}>
                            <Text texto='Colores disponibles' font='TTWeb-Light' color='#7D7D7D' />
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedColor}
                                    style={styles.picker}
                                    itemStyle={styles.pickerItem}
                                    onValueChange={(itemValue) => {
                                        setSelectedValue(itemValue);
                                        console.log('Color seleccionado:', itemValue);
                                        readTallasPorColor(itemValue);
                                    }}
                                >
                                    <Picker.Item label="Colores" value="0" />
                                    {coloresZapato.map((color) => (
                                        <Picker.Item key={color.id_color} label={color.nombre_color} value={color.id_color} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.zapatoDesc}>
                    <Text texto='Descripción' font='TTWeb-SemiBold' fontSize={18} />
                    <Text color='white' />
                    <Text texto={`${infoZapato.descripcion_zapato}`}
                        font='TTWeb-Regular' />
                </View>
                <View style={styles.zapatoTallas}>
                    <Text texto='Tallas' font='TTWeb-SemiBold' fontSize={18} />
                    <ScrollView style={styles.innerScrollView} contentContainerStyle={styles.row}>
                        {tallasZapato.map(talla => (
                            <Talla
                                key={talla.id_talla}
                                tallaData={{
                                    talla: talla.num_talla,
                                    id_talla: talla.id_talla
                                }}
                                isSelected={talla.id_talla === selectedTalla}
                                onSelect={handleSelect}
                            />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.contenedorBoton}>
                    <Input
                        placeholder='Cantidad'
                        width='80%'
                        keyboardType='numeric'
                        onChangeText={setCantidad}
                        value={cantidad}
                    />
                    <Button textoBoton='Agregar al Carrito' width='80%' accionBoton={ceateDetallePedido} />
                </View>
            </View>
            <View style={styles.contenedorResenas}>
                <View style={styles.resenasHeader}>
                    <Text texto='Reseñas' font='TTWeb-SemiBold' fontSize={18} color='white' />
                </View>
                <ScrollView style={styles.innerScrollView2} contentContainerStyle={styles.col}>
                    {resenasZapato.map(resena => (
                        <CardResena key={resena.id_comentario}
                            resenaData={{
                                nombre: resena.nombre_cliente,
                                fecha: resena.fecha_del_comentario,
                                titulo: resena.titulo_comentario,
                                cuerpo: resena.descripcion_comentario,
                                estrellas: resena.calificacion_comentario
                            }} />
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

// Estilos para la pantalla de detalles de un zapato
const styles = StyleSheet.create({
    contenedorTotal: {
        marginTop: 30,
        flex: 1,
        backgroundColor: '#FAFBFF',
    },
    contenedorZapato: {
        width: '100%',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    zapatoInfo: {
        flexDirection: 'row',
        width: '100%',
        minHeight: 250,
        backgroundColor: '#FAFBFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    colImg: {
        marginRight: 15,
        width: '55%',
        justifyContent: 'center'
    },
    colInfo: {
        width: '45%'
    },
    shoeImg: {
        width: '100%',
        height: 200,
    },
    innerScrollView: {
        width: '90%',
        //maxHeight: 250,
        paddingTop: 15
    },
    zapatoTallas: {
        marginVertical: 30,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
        //maxHeight: 250,
        flex: 1,

        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Elevación para Android
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    shoeBody: {
        marginVertical: 15,
        flexDirection: 'row',
    },
    starGrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '20%',
    },
    pickerContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#1591CC',
        borderRadius: 15,
        width: '85%', // Puedes ajustar el ancho según sea necesario
        overflow: 'hidden', // Asegura que el borde redondeado se aplique correctamente
        backgroundColor: 'white',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    pickerItem: {
        fontSize: 12,
        fontFamily: 'TTWeb-Regular',
        color: '#7D7D7D',
    },
    zapatoDesc: {
        width: '90%',
        justifyContent: 'space-between'
    },
    contenedorBoton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    contenedorResenas: {
        width: '100%',
        maxHeight: 600,
        marginTop: 25,
    },
    innerScrollView2: {
        width: '100%',
        maxHeight: 600,
    },
    resenasHeader: {
        width: '100%',
        backgroundColor: '#1591CC',
        paddingVertical: 20,
        paddingLeft: 30,
    },
    col: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// Exportar la pantalla de detalles de un zapato
export default Zapatos;
