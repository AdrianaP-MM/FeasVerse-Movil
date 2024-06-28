import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Text from '../../components/utils/Text';
import CardMarca from '../../components/zapatos/cardMarca';
import CardZapato from '../../components/zapatos/cardZapato';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontSizes, Config } from '../../utils/constantes';
import Input from '../../components/inputs/AllBorders'

const window = Dimensions.get('window'); // Obtener dimensiones de la ventana

const Zapatos = ({navigation}) => {
    // Calcular altura dinámica para porcentajes
    const screenHeight = window.height;
    const screenHeight2 = screenHeight * 1.5;

    const [selectedValue, setSelectedValue] = useState('');
    const [isBrandSelected, setIsBrandSelected] = useState(false);
    const slideAnim = useRef(new Animated.Value(-150)).current;

    const handleBrandClick = () => {
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
    };


    return (
        <ScrollView contentContainerStyle={[styles.containerTotal,
        { maxHeight: isBrandSelected ? null : screenHeight }]}>
            <StatusBar style="dark" backgroundColor="#1591CC" />
            <Animated.View style={[styles.animatedContainer, { marginTop: isBrandSelected ? 0 : -40 }]}>
                {isBrandSelected && (
                    <TouchableOpacity onPress={handleCloseClick} style={styles.contenedor}>
                        <View style={styles.colImage}>
                            <Image
                                source={require('../../img/marcas/marca.png')}
                                style={styles.marcaImg}
                            />
                        </View>
                        <View style={styles.colText}>
                            <Text texto='Zapatos de tacón alto de alta calidad y atractivos. Nos especializamos en tallas grandes, llegando hasta la talla italiana 46. Diseñados para mujeres altas, hombres que disfrutan de usar tacones y cualquier persona que ame lucir zapatos de tacón alto. Nuestra colección ofrece elegancia y comodidad, con atención especial a los detalles.'
                                font='TTWeb-Regular' textAlign='center' />
                        </View>
                        <View style={styles.containerText}>
                            <Text texto='Adidas' font='TTWeb-Bold' textAlign='center' fontSize={35} color='white' />
                        </View>
                    </TouchableOpacity>
                )}
            </Animated.View>
            <View style={styles.row}>
                <View style={[styles.containerFiltros, { top: isBrandSelected ? '2%' : '5%' }]}>
                    <Input
                        placeholder='Búsqueda...'
                        width='80%'
                        iconImage={(require('../../img/icons/iconLupa.png'))} // Icono de lupa
                    />
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedValue}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Tallas" value="0" />
                            <Picker.Item label="Pequeña" value="small" />
                            <Picker.Item label="Mediana" value="medium" />
                            <Picker.Item label="Grande" value="large" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.colMarcas}>
                    <Text texto='¿Te interesa alguna marca en especifico?' font='TTWeb-SemiBold' color='white' textAlign='center' />
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <CardMarca square={100} accionCard={handleBrandClick} />
                        <CardMarca square={100} accionCard={handleBrandClick} />
                        <CardMarca square={100} accionCard={handleBrandClick} />
                        <CardMarca square={100} accionCard={handleBrandClick} />
                        <CardMarca square={100} accionCard={handleBrandClick} />
                        <CardMarca square={100} accionCard={handleBrandClick} />
                        <CardMarca square={100} accionCard={handleBrandClick} />
                        <CardMarca square={100} accionCard={handleBrandClick} />
                    </ScrollView>
                </View>
                <View style={styles.colZapatos}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
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
        justifyContent: 'space-around',
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 15,
    },
    colMarcas: {
        width: '30%',
        paddingTop: 15,
        backgroundColor: '#1591CC',
        paddingTop: 200,
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
