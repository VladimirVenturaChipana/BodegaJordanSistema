const API_URL = import.meta.env.VITE_API_URL;

/**
 * Obtiene la lista de todas las categorías.
 * @returns {Promise<Array>} Lista de categorías
 */
export const getCategories = async () => {
    try {
        const res = await fetch(`${API_URL}/api/productos/categorias`);
        if (!res.ok) {
            throw new Error("Error al obtener las categorías");
        }
        return await res.json();
    } catch (error) {
        console.error("Error en productService (getCategories):", error);
        throw error;
    }
};