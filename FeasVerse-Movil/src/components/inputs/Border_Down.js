import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingLabelTextInput from 'react-native-floating-label-text-input';

const TextInputC = ({ label, keyboardType = 'default', maxLength = 200, editable = true, secureTextEntry = false }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View style={[styles.container, { borderBottomColor: isFocused ? 'black' : '#000000' }]}>
            <FloatingLabelTextInput
                placeholder={label}
                keyboardType={keyboardType}
                maxLength={maxLength}
                editable={editable}
                secureTextEntry={secureTextEntry}
                onFocus={handleFocus}
                onBlur={handleBlur}
                customLabelStyles={{
                    colorFocused: 'black',
                    colorBlurred: '#000000',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '85%',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
});

export default TextInputC;
