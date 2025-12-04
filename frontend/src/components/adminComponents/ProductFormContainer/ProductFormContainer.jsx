import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductFormUI } from "../ProductFormUI/ProductFormUI";
import { AdminNav } from "../AdminNav/AdminNav";
import { validateProduct } from "../../../utils/validateProducts";
import { uploadToImgbb } from "../../../services/uploadImage";
import { createProduct, getProductById, updateProduct } from "../../../services/products";
import { toast } from 'react-toastify';

export const ProductFormContainer = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const data = await getProductById(id);
          setProduct({
            name: data.name || "",
            price: data.price || "",
            category: data.category || "",
            description: data.description || "",
          });
        } catch (error) {
          toast.error(`Error al cargar producto: ${error.message}`);
          navigate("/admin/products");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors = validateProduct({ ...product, file }, isEditing);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      let imageUrl = product.imageUrl;
      
      if (file) {
        imageUrl = await uploadToImgbb(file);
      }
      
      const productData = {
        ...product,
        price: Number(product.price),
        imageUrl,
      };

      if (isEditing) {
        await updateProduct(id, productData);
        toast.success("Producto actualizado exitosamente");
        navigate("/admin/products");
      } else {
        await createProduct(productData);
        toast.success("Producto creado exitosamente");
        setProduct({ name: "", price: "", category: "", description: "" });
        setFile(null);
      }
      
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNav />
      <ProductFormUI
        product={product}
        errors={errors}
        onChange={handleChange}
        onFileChange={setFile}
        loading={loading}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </>
  );
};