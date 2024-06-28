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

const Zapatos = ({ route }) => {
    const { id_zapato } = route.params;
    const [selectedValue, setSelectedValue] = useState('');
    const [infoZapato, setInfo] = useState([]);

    useEffect(() => {
        readZapato();
        //console.log(infoZapato);
    }, []);


    const readZapato = async () => {
        try {
            // Crear y llenar el formData
            const formData = new FormData();
            formData.append('id_zapato', id_zapato);

            // Llamar a fillData y esperar la respuesta
            const response = await fillData({
                php: 'zapatos',
                accion: 'readOneDetail',
                method: 'POST',
                formData: formData
            });

            if (Array.isArray(response) && response.length > 0) {
                setInfo(response);
                console.log(response);
            } else {
                Alert.alert('No hay zapatos', 'No se pudo obtener los zapatos o no hay zapatos disponibles.');
            }

        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };


    return (
        <ScrollView style={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#1591CC" />
            <View style={styles.contenedorZapato}>
                <View style={styles.zapatoInfo}>
                    <View style={styles.colImg}>
                        <Image
                            source={infoZapato[0].foto_detalle_zapato ?
                                { uri: `${Config.IP}/FeasVerse/api/helpers/images/zapatos/${infoZapato[0].foto_detalle_zapato})` }
                                : require('../../img/zapatos/shoeDefault.png')}
                            style={styles.shoeImg}
                        />
                    </View>
                    <View style={styles.colInfo}>
                        <View style={styles.shoeHeader}>
                            <Text texto={`${infoZapato[0].nombre_zapato}`} font='TTWeb-Regular' fontSize={24} />
                            <Text texto={`${infoZapato.genero_zapato}`} font='TTWeb-SemiBold' color='#7D7D7D' />
                        </View>
                        <View style={styles.shoeBody}>
                            <Text texto='$285' fontSize={20} font='TTWeb-Bold' />
                            <View style={styles.starGrap}>
                                <Image
                                    source={require('../../img/icons/iconStar.png')}
                                />
                                <Text texto='5' fontSize={20} color='#FFA700' font='TTWeb-Bold' />
                            </View>
                        </View>
                        <View style={styles.shoeFooter}>
                            <Text texto='Colores disponibles' font='TTWeb-Light' color='#7D7D7D' />
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedValue}
                                    style={styles.picker}
                                    itemStyle={styles.pickerItem}
                                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                >
                                    <Picker.Item label="Colores" value="0" />
                                    <Picker.Item label="Rojo" value="1" />
                                    <Picker.Item label="Amarillo" value="2" />
                                    <Picker.Item label="Azul" value="3" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.zapatoDesc}>
                    <Text texto='Descripción' font='TTWeb-SemiBold' fontSize={18} />
                    <Text color='white' />
                    <Text texto='Zapatos de tacón alto de alta calidad y atractivos. Nos especializamos en tallas grandes, llegando hasta la talla italiana 46. Diseñados para mujeres altas, hombres que disfrutan de usar tacones y cualquier persona que ame lucir zapatos de tacón alto. Nuestra colección ofrece elegancia y comodidad, con atención especial a los detalles y un enfoque inclusivo que celebra la diversidad de estilos y tallas. Descubre la moda sin límites con nuestros zapatos que combinan estilo y sofisticación, ideales para aquellos que desean destacar con confianza en cualquier ocasión.'
                        font='TTWeb-Regular' />
                </View>
                <View style={styles.zapatoTallas}>
                    <Text texto='Tallas' font='TTWeb-SemiBold' fontSize={18} />
                    <ScrollView style={styles.innerScrollView} contentContainerStyle={styles.row}>
                        <Talla />
                        <Talla />
                        <Talla />
                        <Talla />
                        <Talla />
                        <Talla />
                        <Talla />
                        <Talla />
                        <Talla />
                        <Talla />
                    </ScrollView>
                </View>
                <View style={styles.contenedorBoton}>
                    <Button textoBoton='Agregar al Carrito' width='80%' />
                </View>
            </View>
            <View style={styles.contenedorResenas}>
                <View style={styles.resenasHeader}>
                    <Text texto='Reseñas' font='TTWeb-SemiBold' fontSize={18} color='white' />
                </View>
                <ScrollView style={styles.innerScrollView2} contentContainerStyle={styles.col}>
                    <CardResena />
                    <CardResena />
                    <CardResena />
                    <CardResena />
                    <CardResena />
                    <CardResena />
                    <CardResena />
                    <CardResena />
                    <CardResena />
                    <CardResena />
                </ScrollView>
            </View>
        </ScrollView>
    );
};

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
        maxHeight: 250,
        paddingTop: 15
    },
    zapatoTallas: {
        marginVertical: 30,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
        maxHeight: 250,

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


export default Zapatos;
