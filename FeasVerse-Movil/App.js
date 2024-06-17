import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, Button } from 'react-native';
import Prueba from './src/screens/Prueba';
import Correo from './src/screens/restablecer/Correo';
import Code from './src/screens/restablecer/Code';
import NewPassword from './src/screens/restablecer/NewPassword';
import Message from './src/screens/restablecer/Message';

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Bienvenido a la pantalla principal</Text>
            <Button title="Go to Prueba" onPress={() => navigation.navigate('Prueba')} />
            <Button title="Go to Mail" onPress={() => navigation.navigate('Correo')} />
            <Button title="Go to Code" onPress={() => navigation.navigate('Code', { email: '' })} />
            {/* Button title="Go to New Password" onPress={() => navigation.navigate('NewPassword')}  */}
            {/* Button title="Go to Message" onPress={() => navigation.navigate('Message')} */}
        </View>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="App" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="App" component={MainScreen} />
                <Stack.Screen name="Prueba" component={Prueba} />
                <Stack.Screen name="Correo" component={Correo} />
                <Stack.Screen name="Code" component={Code} />
                <Stack.Screen name="NewPassword" component={NewPassword} />
                <Stack.Screen name="Message" component={Message} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default App;
