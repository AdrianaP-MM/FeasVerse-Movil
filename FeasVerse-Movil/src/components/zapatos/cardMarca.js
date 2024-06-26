import React from 'react';
import Text from '../utils/Text';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default function CardCita({ accionCard }) {
    return (
        <TouchableOpacity onPress={accionCard}>
            <View style={styles.containerTotal}>
                <Image
                    source={require('../../img/marcas/marca.png')}
                    style={styles.marcaImg}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerTotal: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 15,
        borderColor: '#F2F2F2',
        borderWidth: 2,
    },
    marcaImg:{
        width: '100%',
        height: '100%'
    },
});
