import React from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingLabelTextInput from 'react-native-floating-label-text-input';

const TextInputC = ({ label, keyboardType = 'default', maxLength = 200, editable = true }) => {
    return (
        <View style={styles.container}>
            <FloatingLabelTextInput
                placeholder={label}
                keyboardType={keyboardType}
                maxLength={maxLength}
                editable={editable}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: 'pink',
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: 'black'
    },
    focused: {
        color: "pink"
    }
});

export default TextInputC;