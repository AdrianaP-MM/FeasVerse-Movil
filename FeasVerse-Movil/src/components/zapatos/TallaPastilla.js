import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text from '../../components/utils/Text';

export default function Button({ action_button, tallaData, isSelected, onSelect }) {
    const handlePress = () => {
        onSelect(tallaData.id_talla);
        if (action_button) {
            action_button();
        }
    };

    return (
        <TouchableOpacity
            style={[styles.Pastilla, isSelected && styles.PastillaSelected]}
            onPress={handlePress}
        >
            <Text texto={`${tallaData.talla}`} style={isSelected ? styles.TextSelected : styles.Text} fontSize={16} />
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
    PastillaSelected: {
        backgroundColor: '#1591CC',
        borderColor: '#1591CC',
    },
    Text: {
        color: '#7D7D7D',
    },
    TextSelected: {
        color: 'white',
    },
});
