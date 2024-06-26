import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from '../utils/Text';

export default function Button({ text, action_button }) {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={action_button}
        >
            <Text
                texto={text}
                textAlign='center'
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginRight: 9,
        marginVertical: 10,
        width: '(100%) / 3',
        borderRadius: 100,
    },
});