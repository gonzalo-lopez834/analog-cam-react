const BASE_URL = "https://693079df778bbf9e00718e45.mockapi.io/products";

export const getProducts = async (categoryFilter = "") => {
  try {
    const url = categoryFilter 
      ? `${BASE_URL}?category=${encodeURIComponent(categoryFilter)}` 
      : BASE_URL;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron obtener los productos`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Error al obtener productos: ${error.message}`);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Producto no encontrado`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Error al obtener el producto: ${error.message}`);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo crear el producto`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error al crear producto: ${error.message}`);
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo actualizar el producto`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error al actualizar producto: ${error.message}`);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo eliminar el producto`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error al eliminar producto: ${error.message}`);
  }
};