import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import TextInput from '../components/inputs/Border_Down';

const Prueba = ({ onBack }) => {
    return (
        <View style={styles.container}>
            <TextInput
                label="Nombre Completo"
                maxLength={20}
                editable={true}/>
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
        padding: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        width: 200,
        marginTop: 25,
    },
});

export default Prueba;
