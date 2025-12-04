export const ProductFormUI = ({
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
  isEditing = false,
}) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">
                {isEditing ? "Editar Producto" : "Agregar Producto"}
              </h2>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre:</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={product.name}
                    onChange={onChange}
                    required
                  />
                  {errors.name && <div className="text-danger small">{errors.name}</div>}
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Precio:</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={product.price}
                    onChange={onChange}
                    required
                  />
                  {errors.price && <div className="text-danger small">{errors.price}</div>}
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Categoría:</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={product.category}
                    onChange={onChange}
                    required
                  />
                  {errors.category && <div className="text-danger small">{errors.category}</div>}
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Descripción:</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={product.description}
                    onChange={onChange}
                    rows="3"
                    required
                  ></textarea>
                  {errors.description && <div className="text-danger small">{errors.description}</div>}
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Imagen:</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                  />
                  {!isEditing && errors.file && <div className="text-danger small">{errors.file}</div>}
                  {isEditing && <small className="text-muted">Deja vacío para mantener la imagen actual</small>}
                </div>
                
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-primary flex-grow-1" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? "Guardando..." : isEditing ? "Actualizar Producto" : "Guardar Producto"}
                  </button>
                  {isEditing && (
                    <a href="/admin/products" className="btn btn-secondary">
                      Cancelar
                    </a>
                  )}
                </div>
              </form>
              
              {errors.general && (
                <div className="alert alert-danger mt-3">{errors.general}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};