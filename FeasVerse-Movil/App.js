import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen1 from './src/screens/SplashScreen1';
import Correo from './src/screens/restablecer/Correo';
import Code from './src/screens/restablecer/Code';
import NewPassword from './src/screens/restablecer/NewPassword';
import Message from './src/screens/restablecer/Message';
import Carrito from './src/screens/configuraciones/Carrito';
import LogIn from './src/screens/Login/Login';
import Inicio from './src/screens/Zapatos/Inicio';
import Zapatos from './src/screens/Zapatos/Zapatos';
import { useFonts } from 'expo-font';
import Registrarse from './src/screens/Login/Registrarse';
import DetalleZapato from './src/screens/Zapatos/DetallesZapato';
import Perfil from './src/screens/configuraciones/Perfil';
import Navigator from './src/Navigator/TabNavigator';
import Configuraciones from './src/screens/configuraciones/Configuraciones';
import MostrarDetalles from './src/screens/configuraciones/MostrarDetalles';
import Pedidos from './src/screens/configuraciones/Pedidos';
import { Config } from './src/utils/constantes';

const Stack = createStackNavigator();

const App = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [splashScreenIndex, setSplashScreenIndex] = useState(1);
    const [initialRoute, setInitialRoute] = useState('LogIn');

    const fetchData = async (api, action, formData = null) => {
        const url = `${Config.IP}/FeasVerse/api/${api}?action=${action}`;
        const options = formData ? { method: 'POST', body: formData } : { method: 'GET' };
        const response = await fetch(url, options);
        const text = await response.text();
        return JSON.parse(text);
    };

    const comprobarCarrito = async () => {
        const DATA0 = await fetchData('services/publica/carrito.php', 'readAllCarrito');

        if (DATA0.status) {
            console.log('Si hay carrito');
        } else {
            const FORM1 = new FormData();
            FORM1.append('estado_pedido', 4);

            const DATA2 = await fetchData('services/publica/carrito.php', 'createRow', FORM1);

            if (DATA2.status) {
                sweetAlert(4, DATA.error, true);
            } else {
                sweetAlert(4, DATA.error, true);
            }
        }
    };

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
                    const DATA = await fetchData('services/publica/cliente.php', 'getUser');
                    if (DATA.session) {
                        comprobarCarrito();
                        setInitialRoute('Inicio');
                    }
                    setAppIsReady(true);
                }
            } catch (e) {
                console.warn(e);
            }
        }
        prepareApp();
    }, [fontsLoaded]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSplashScreenIndex(prevIndex => prevIndex + 1);
        }, 5000); // Cambia el intervalo según lo que necesites

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleSplashScreenFinish = () => {
        if (splashScreenIndex === 3) {
            setAppIsReady(true);
        }
    };

    if (!appIsReady) {
        switch (splashScreenIndex) {
            case 1:
                return <SplashScreen1 onFinish={handleSplashScreenFinish} />;
            default:
                return null;
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="App" component={LogIn} />
                <Stack.Screen name="Correo" component={Correo} />
                <Stack.Screen name="Code" component={Code} />
                <Stack.Screen name="NewPassword" component={NewPassword} />
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="Registrarse" component={Registrarse} />
                <Stack.Screen name="Inicio" component={Navigator} />
                <Stack.Screen name="Carrito" component={Carrito} />
                <Stack.Screen name="Perfil" component={Perfil} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="Configuraciones" component={Configuraciones} />
                <Stack.Screen name="Detalle" component={DetalleZapato} />
                <Stack.Screen name="MostrarDetalles" component={MostrarDetalles} />
                <Stack.Screen name="Pedidos" component={Pedidos} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
