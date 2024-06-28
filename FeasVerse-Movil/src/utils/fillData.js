import { Config } from './constantes'; // Asegúrate de importar Config desde donde corresponda

export const fillData = async ({ php, accion, method = 'GET', formData }) => {
    try {
        const url = `${Config.IP}/FeasVerse/api/services/publica/${php}.php?action=${accion}`;
        const options = method === 'POST' ? { method, body: formData } : {};

        if (method === 'POST' && !formData) {
            throw new Error('formData es obligatorio para el método POST.');
        }

        const response = await fetch(url, options);
        const result = await response.json();

        if (result.status) {
            return result.dataset;
        } else {
            return { error: result.message === 'Acceso denegado' ? 'Acceso denegado' : result.message };
        }
    } catch (error) {
        console.error('Error en fillData:', error);
        return { error: error.message };
    }
};
