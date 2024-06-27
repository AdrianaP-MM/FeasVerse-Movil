import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from '../../components/utils/Text';

export default function Button({ text, action_button }) {
    return (
        <TouchableOpacity
            style={styles.Pastilla}
            onPress={action_button}
        >
            <Text texto='30' fontSize={16} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    Pastilla: {
        padding: 24,
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#7D7D7D',
        margin: 9,
    },
});


