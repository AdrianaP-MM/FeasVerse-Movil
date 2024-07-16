import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Inicio from '../screens/Zapatos/Inicio';
import Zapatos from '../screens/Zapatos/Zapatos';
import Perfil from '../screens/configuraciones/Perfil';
import Carrito from '../screens/configuraciones/Carrito';
import Configuraciones from '../screens/configuraciones/Configuraciones';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let iconSize = focused ? 50 : 35;

                    if (route.name === 'Zapatos') {
                        iconName = 'shoe-formal';
                    } else if (route.name === 'HomeTab') {
                        iconName = 'home';
                    } else if (route.name === 'Configuraciones') {
                        iconName = 'cog';
                    }

                    return (
                        <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
                            <MaterialCommunityIcons name={iconName} size={iconSize} color={color} />
                        </View>
                    );
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen name="Zapatos" component={Zapatos} options={{ headerShown: false }} />
            <Tab.Screen name="HomeTab" component={Inicio} options={{ headerShown: false }} />
            <Tab.Screen name="Configuraciones" component={Configuraciones} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

//Estilos aplicados a la pantalla de pestañas
const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute', // Posicionamiento absoluto en la parte inferior
        left: 0,
        right: 0,
        bottom: 0,
        height: 60, // Altura de la barra de pestañas
        backgroundColor: '#1591CC', // Color de fondo de la barra de pestañas
        overflow: 'hidden', // Ocultar desbordamiento de contenido
    },
    iconContainer: {
        justifyContent: 'center', // Centrado verticalmente
        alignItems: 'center', // Centrado horizontalmente
        width: 60, // Ancho del contenedor de icono
        height: 60, // Altura del contenedor de icono
    },
    iconContainerFocused: {
        justifyContent: 'center', // Centrado verticalmente
        alignItems: 'center', // Centrado horizontalmente
        width: 100, // Ancho del contenedor de icono
        height: 60, // Altura del contenedor de icono
        backgroundColor: 'white', // Color de fondo cuando la pestaña está enfocada
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        borderWidth: 0,
    },
});

export default TabNavigator;
