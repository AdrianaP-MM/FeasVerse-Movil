// CustomTextInput.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomTextInput = ({ placeholder, value, onChangeText }) => {
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setIsSecureTextEntry(!isSecureTextEntry);
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isSecureTextEntry}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity onPress={toggleSecureEntry} style={styles.iconContainer}>
                <Ionicons
                    name={isSecureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#6c757d"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1591CC',
        borderRadius: 5,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        padding: 15,
    },
    iconContainer: {
        padding: 10,
    },
});

export default CustomTextInput;
