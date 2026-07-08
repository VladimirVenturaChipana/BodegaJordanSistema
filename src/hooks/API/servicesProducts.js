const API_URL = import.meta.env.VITE_API_URL;

/**
 * Obtiene el detalle de un producto por su ID desde la API.
 * @param {string|number} id - ID del producto
 * @returns {Promise<Object>} Datos del producto
 */
export const getProductById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/api/productos/${id}`);

        if (!res.ok) {
            throw new Error(`Error al obtener el producto con ID: ${id}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error en productService (getProductById):", error);
        throw error;
    }
};

/**
 * Obtiene los productos de una categoría específica por su ID.
 * @param {string|number} categoryId - ID de la categoría
 * @returns {Promise<Array>} Lista de productos
 */
export const getProductsByCategory = async (categoryId) => {
    try {
        const res = await fetch(`${API_URL}/api/productos/categoria/${categoryId}`);
        if (!res.ok) {
            throw new Error(`Error al traer productos de la categoría ${categoryId}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Error en productService (getProductsByCategory) para ID ${categoryId}:`, error);
        return []; // Devolvemos un array vacío para evitar que la app explote si falla una categoría
    }
};