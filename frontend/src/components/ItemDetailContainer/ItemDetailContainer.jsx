import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/products";
import './ItemDetailContainer.css';

export const ItemDetailContainer = () => {
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setDetail(data);
            } catch (error) {
                setDetail({});
            } finally {
                setLoading(false);
            }
        };
        
        fetchProduct();
    }, [id]);

  return (
    <main className="item-detail-container">
      {loading ? (
        <p>Cargando...</p>
      ) : Object.keys(detail).length ? (
        <ItemDetail detail={detail} />
      ) : (
        <p>Producto no encontrado</p>
      )}
    </main>
  );
};