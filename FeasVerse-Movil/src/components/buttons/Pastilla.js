import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from '../utils/Text';
import { useNavigation } from '@react-navigation/native';

export default function Button({ text, action}) {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(action); // 'Zapatos' es la pantalla a la que quieres navegar
    };
    
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={handlePress}
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