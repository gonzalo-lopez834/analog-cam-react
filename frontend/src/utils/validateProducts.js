export const validateProduct = (product, isEditing = false) => {
  const errors = {};

  if (!product.name || product.name.trim() === '') {
    errors.name = 'El nombre es obligatorio';
  }

  if (!product.price || product.price <= 0) {
    errors.price = 'El precio debe ser mayor a 0';
  }

  if (!product.description || product.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }

  if (!product.category || product.category.trim() === '') {
    errors.category = 'La categoría es obligatoria';
  }

  if (!isEditing && !product.file) {
    errors.file = 'La imagen es obligatoria';
  }

  return errors;
};