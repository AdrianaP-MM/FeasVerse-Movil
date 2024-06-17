import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CustomTextInput = ({ placeholder, keyboardType, value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#1591CC',
        borderRadius: 5,
        marginBottom: 20,
    },
});

export default CustomTextInput;
