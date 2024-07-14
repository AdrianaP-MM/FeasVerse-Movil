import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const getColorForStatus = (status) => {
    switch (status) {
        case 'Pendiente':
            return '#FF0000'; // Rojo
        case 'En camino':
            return '#FFA500'; // Anaranjado
        case 'Entregado':
            return '#008000'; // Verde
        default:
            return '#000000'; // Negro por defecto
    }
};

const getIconForStatus = (status) => {
    switch (status) {
        case 'Pendiente':
            return 'clock-o'; // Reloj para pendiente
        case 'En camino':
            return 'truck'; // Coche para en camino
        case 'Entregado':
            return 'check'; // Check para entregado
        default:
            return 'question'; // Alerta por defecto
    }
};

const OrderCard = ({ order, navigation, onEdit, onDelete }) => {
    const { id_pedido_cliente, 
        id_detalles_pedido, 
        nombre_repartidor, 
        correo_trabajador, 
        telefono_trabajador, 
        estado_pedido, 
        fecha_de_inicio, 
        fecha_de_entrega, 
        total_cobrar } = order;
    
    const statusColor = getColorForStatus(estado_pedido);
    const statusIcon = getIconForStatus(estado_pedido);

    const handleCardPress = () => {
        navigation.navigate('MostrarDetalles', { idPedido: order.id_pedido_cliente, estadoPedido: order.estado_pedido });
    };

    return (
        <TouchableOpacity onPress={handleCardPress} style={[styles.orderContainer, { borderColor: statusColor }]}>
            <View style={styles.orderDetails}>
                <Text style={styles.repartidorLabel}>Número del pedido: <Text style={styles.repartidorName}>{id_pedido_cliente}</Text></Text>
                <Text style={styles.repartidorLabel}>Nombre del repartidor: <Text style={styles.repartidorName}>{nombre_repartidor}</Text></Text>
                <Text>Correo: {correo_trabajador}</Text>
                <Text>Teléfono: {telefono_trabajador}</Text>
                <Text>Estado del pedido: <Text style={{ color: statusColor }}>{estado_pedido}</Text></Text>
                <Text>Fecha de inicio: {fecha_de_inicio}</Text>
                {fecha_de_entrega && <Text>Fecha de entrega: {fecha_de_entrega}</Text>}
                <Text>Total a cobrar: ${total_cobrar}</Text>
            </View>
            <View style={styles.iconContainer}>
                <FontAwesome name={statusIcon} size={36} color={statusColor} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    orderContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    orderDetails: {
        flex: 1,
    },
    repartidorLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    repartidorName: {
        fontSize: 18,
    },
});

export default OrderCard;
