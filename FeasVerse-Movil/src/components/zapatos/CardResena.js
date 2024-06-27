import React from 'react';
import Text from '../utils/Text';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default function CardCita({ }) {
    return (
        <View style={styles.containerTotal}>
            <View style={styles.cardHeader}>
                <Text texto='Margarita Osorio' />
                <Text texto='05/02/2024' color='#8F8F8F' />
            </View>
            <View style={styles.cardBody}>
                <Text texto='¡Muy buen zapato!' font='TTWeb-SemiBold' fontSize={15} />
                <Text texto='El mejor zapato que he probado en mi vida, muy buen diseño bla bla bla bla bla bla....' />
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
