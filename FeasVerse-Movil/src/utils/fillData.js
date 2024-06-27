/*import { Config } from './utils/constantes'; // Asegúrate de importar Config desde donde corresponda

export const fillData = async ({ php, accion, method, formData }) => {
    try {
        // Validar que los parámetros requeridos estén definidos
        if (!php || !accion) {
            throw new Error('Parámetros php, accion son obligatorios.');
        }

        let response;

        if (method !== 'POST') {
            // Petición GET si method no es POST
            response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/${php}.php?action=${accion}`);
        } else {
            // Petición POST si method es POST
            if (!formData) {
                throw new Error('formData es obligatorio para el método POST.');
            }
            response = await fetch(`${Config.IP}/FeasVerse/api/services/publica/${php}.php?action=${accion}`, {
                method: 'POST',
                body: formData
            });
        }

        const result = await response.json();

        if (result.status) {
            return result.dataset; // Retorna el dataset si la respuesta es exitosa
        } else if (result.message === 'Acceso denegado') {
            // Aquí deberías manejar setIsAuthenticated y showModal de alguna manera
            return { error: 'Acceso denegado' };
        } else {
            // Manejo de otros errores
            return { error: result.message };
        }
    } catch (error) {
        // Manejo de errores generales
        console.error('Error en fillData:', error);
        return { error: error.message };
    }
};
*/