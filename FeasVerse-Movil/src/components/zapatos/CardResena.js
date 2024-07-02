import React from 'react';
import Text from '../utils/Text';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default function CardResena({resenaData}) {
    return (
        <View style={styles.containerTotal}>
            <View style={styles.cardHeader}>
                <Text texto={`${resenaData.nombre}`} />
                <Text texto={`${resenaData.fecha}`} />
            </View>
            <View style={styles.cardBody}>
                <Text texto={`${resenaData.titulo}`} font='TTWeb-SemiBold' fontSize={15} />
                <Text texto={`${resenaData.cuerpo}`}  />
            </View>
            <View style={styles.cardFooter}>
                <Image
                    source={require('../../img/icons/iconStarGrup.png')}
                    style={styles.zapatoImg}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerTotal: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 15,
        marginVertical: 20,
    },
    cardHeader: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardBody: {
        width: '80%',
        marginVertical: 20,
    },
    cardFooter:{
        width: '100%',
        alignItems: 'flex-end',
    },
});
