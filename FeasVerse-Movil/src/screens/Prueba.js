import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import TextInput from '../components/inputs/Border_Down';
import Pastilla from '../components/buttons/Pastilla';

const Prueba = ({ onBack }) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerBlue}> 
                <Text> 
        aaaaaa
                </Text>
            </View>
            <TextInput
                label="Nombre Completo"
                maxLength={20}
                editable={true}
                keyboardType="number" />
            <TextInput
                label="Apellido Completo"
                maxLength={20}
                editable={true} />
                <Pastilla
                text="Ir de compras" />
            <View style={styles.btn}>
                <Button title="Go to App" onPress={onBack} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBlue:
    {
        width: '100%',
        flex: 1,
        backgroundColor: '#1591CC',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    btn: {
        width: 200,
        marginTop: 25,
    },
});

export default Prueba;
