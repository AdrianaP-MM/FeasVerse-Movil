import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Text, Button } from 'react-native';
import Correo from './src/screens/restablecer/Correo';
import Code from './src/screens/restablecer/Code';
import NewPassword from './src/screens/restablecer/NewPassword';
import Message from './src/screens/restablecer/Message';
import Carrito from './src/screens/configuraciones/Carrito';
import LogIn from './src/screens/Login/Login';
import Inicio from './src/screens/Zapatos/Inicio';
import Zapatos from './src/screens/Zapatos/Zapatos';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Registrarse from './src/screens/Login/Registrarse';
import DetalleZapato from './src/screens/Zapatos/DetallesZapato'
import Perfil from './src/screens/configuraciones/Perfil'

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Bienvenido a la pantalla principal</Text>
            <Button title="Go to Mail" onPress={() => navigation.navigate('Correo')} />
            <Button title="Go to Code" onPress={() => navigation.navigate('Code', { email: '' })} />
            <Button title="Go to Carrito" onPress={() => navigation.navigate('Carrito')} />
            <Button title="Go to LogIn" onPress={() => navigation.navigate('LogIn')} />
            <Button title="Go to Zapatos" onPress={() => navigation.navigate('Zapatos')} />
            <Button title="Go to Detale Zapato" onPress={() => navigation.navigate('Detalle')} />
            <Button title="Go to Inicio" onPress={() => navigation.navigate('Inicio')} />
            <Button title="Go to Perfil" onPress={() => navigation.navigate('Perfil')} />
        </View>
    );
};

const App = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded] = useFonts({
        'TTWeb-Black': require('../FeasVerse-Movil/assets/fonts/TitilliumWeb-Black.ttf'),
        'TTWeb-Bold': require('../FeasVerse-Movil/assets/fonts/TitilliumWeb-Bold.ttf'),
        'TTWeb-Regular': require('../FeasVerse-Movil/assets/fonts/TitilliumWeb-Regular.ttf'),
        'TTWeb-Light': require('../FeasVerse-Movil/assets/fonts/TitilliumWeb-Light.ttf'),
        'TTWeb-SemiBold': require('../FeasVerse-Movil/assets/fonts/TitilliumWeb-SemiBold.ttf'),
    });

    useEffect(() => {
        async function prepareApp() {
            try {
                if (fontsLoaded) {
                    setAppIsReady(true);
                }
            } catch (e) {
                console.warn(e);
            }
        }
        prepareApp();
    }, [fontsLoaded]);

    if (!appIsReady) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="App" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="App" component={MainScreen} />
                <Stack.Screen name="Correo" component={Correo} />
                <Stack.Screen name="Code" component={Code} />
                <Stack.Screen name="NewPassword" component={NewPassword} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="Carrito" component={Carrito} />
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="Zapatos" component={Zapatos} />
                <Stack.Screen name="Registrarse" component={Registrarse} />
                <Stack.Screen name="Detalle" component={DetalleZapato} />
                <Stack.Screen name="Inicio" component={Inicio} />
                <Stack.Screen name="Perfil" component={Perfil} />
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
