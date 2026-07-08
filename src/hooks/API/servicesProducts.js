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

/**
 * Obtiene los productos de una marca específica por su ID.
 * @param {string|number} brandId - ID de la marca
 * @returns {Promise<Array>} Lista de productos
 */
export const getProductsByBrand = async (brandId) => {
    try {
        const res = await fetch(`${API_URL}/api/productos/marca/${brandId}`);
        if (!res.ok) {
            throw new Error(`Error al traer productos de la marca ${brandId}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Error en productService (getProductsByBrand) para ID ${brandId}:`, error);
        return [];
    }
};

/**
 * Obtiene los productos de una categoría buscando por su nombre descriptivo.
 * @param {string} categoryName - Nombre de la categoría (ej: "licores")
 * @returns {Promise<Array>} Lista de productos
 */
export const getCategoryProductsByName = async (categoryName) => {
    try {
        // 1. Obtener la lista de categorías
        const resCat = await fetch(`${API_URL}/api/productos/categorias`);
        if (!resCat.ok) {
            throw new Error("Error al obtener la lista de categorías");
        }
        const categories = await resCat.json();
        
        // 2. Buscar la categoría por nombre (caso insensible)
        const found = categories.find(c => c.deslin.toLowerCase() === categoryName.toLowerCase());
        if (!found) {
            console.warn(`Categoría no encontrada para el nombre: ${categoryName}`);
            return [];
        }

        // 3. Obtener productos por el ID de la categoría encontrada
        return await getProductsByCategory(found.idcategoria);
    } catch (error) {
        console.error(`Error en getCategoryProductsByName para "${categoryName}":`, error);
        return [];
    }
};

