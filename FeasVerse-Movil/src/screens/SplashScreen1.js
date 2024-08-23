import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

const SplashScreen1 = ({ onFinish }) => {
    const rotation = useRef(new Animated.Value(0)).current;
    const [message, setMessage] = useState('Bienvenido');

    useEffect(() => {
        const rotationAnimation = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,
            })
        );
        rotationAnimation.start();

        const interval = setInterval(() => {
            setMessage(prevMessage => {
                if (prevMessage === 'Bienvenido') return 'Preparando...';
                if (prevMessage === 'Preparando...') return 'Cargando...';
                if (prevMessage === 'Cargando...') return 'Disfruta comprando con nosotros';
                return prevMessage;
            });
        }, 1000);

        const timeout = setTimeout(() => {
            onFinish();
        }, 5000);

        return () => {
            rotationAnimation.stop();
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [rotation, onFinish]);

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../img/zapato.jpg')}
                style={[styles.image, { transform: [{ rotate: spin }] }]}
            />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1591CC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    message: {
        marginTop: 20,
        fontSize: 18,
        color: '#fff',
    },
});

export default SplashScreen1;
