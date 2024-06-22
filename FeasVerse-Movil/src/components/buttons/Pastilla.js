import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Button({ text, action_button }) {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={action_button}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'white',
        padding: 10,
        width: 150,
        borderRadius: 100,
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontWeight: '500'
    }
});