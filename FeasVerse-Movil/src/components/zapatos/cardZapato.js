import React from 'react';
import Text from '../utils/Text';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Colors, FontSizes, Config } from '../../utils/constantes';

export default function CardZapato({ zapatoData }) {
    return (
        <View style={styles.containerTotal}>
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <Image
                        source={{ uri: `${Config.IP}/FeasVerse/api/helpers/images/zapatos/${zapatoData.foto}` }}
                        style={styles.zapatoImg}
                    />
                </View>
                <View style={styles.containerText}>
                    <View style={styles.text1}>
                        <Text texto={`${zapatoData.nombre}`} fontSize={16} font='TTWeb-Bold' />
                        <Text texto={`Zapato ${zapatoData.genero}`} color='#7D7D7D' />
                    </View>
                    <View style={styles.text2}>
                        <View style={styles.starGrap}>
                            <Image
                                source={require('../../img/icons/iconStar.png')}
                            />
                            <Text texto={`${zapatoData.estrellas || 0}`} fontSize={15} color='#FFA700' font='TTWeb-Bold' />
                        </View>
                        <Text texto={`$${zapatoData.precio}`} fontSize={16} font='TTWeb-Bold' />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerTotal: {
        width: 220,
        height: 260,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 15,
        borderColor: '#F2F2F2',
        borderWidth: 2,
    },
    container: {
        width: '100%',
        height: '100%',
    },
    containerImg: {
        width: '100%',
        height: '60%',
    },
    containerText: {
        borderTopWidth: 3,
        borderColor: '#1591CC',
        width: '100%',
        height: '40%',
        paddingHorizontal: 10,
    },
    zapatoImg: {
        width: '100%',
        height: '100%'
    },
    text1: {
        paddingTop: 8,
        marginBottom: 15,
    },
    text2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    starGrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
