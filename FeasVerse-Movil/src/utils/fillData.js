import { Config } from './constantes'; 

// Función para obtener datos de una API
export const fillData = async ({ php, accion, method = 'GET', formData }) => {
    try {
        // Construir la URL para la solicitud
        const url = `${Config.IP}/FeasVerse/api/services/publica/${php}.php?action=${accion}`;
        // Configurar las opciones de la solicitud, incluyendo el método y los datos del formulario si es un POST
        const options = method === 'POST' ? { method, body: formData } : {};

        // Verificar si el método es POST y si formData no está presente
        if (method === 'POST' && !formData) {
            throw new Error('formData es obligatorio para el método POST.');
        }

        // Realizar la solicitud fetch a la URL con las opciones configuradas
        const response = await fetch(url, options);
        // Convertir la respuesta a formato JSON
        const result = await response.json();

        // Verificar si la solicitud fue exitosa
        if (result.status) {
            // Retornar el conjunto de datos si la solicitud fue exitosa
            return result.dataset;
        } else {
            // Retornar un objeto de error si la solicitud no fue exitosa
            return { error: result.message === 'Acceso denegado' ? 'Acceso denegado' : result.message };
        }
    } catch (error) {
        // Manejar y registrar cualquier error que ocurra durante la solicitud
        console.error('Error en fillData:', error);
        return { error: error.message };
    }
};
