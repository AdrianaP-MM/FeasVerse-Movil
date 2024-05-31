import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingLabelTextInput from 'react-native-floating-label-text-input';

const TextInputC = ({ label, keyboardType = 'default', maxLength = 200, editable = true }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View style={[styles.container, { borderBottomColor: isFocused ? 'black' : '#CBD5E1' }]}>
            <FloatingLabelTextInput
                placeholder={label}
                keyboardType={keyboardType}
                maxLength={maxLength}
                editable={editable}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: 'pink',
        width: '100%',
        borderBottomWidth: 1,
        marginBottom: 10
    },
});

export default TextInputC;
