import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { SearchBar } from "../SearchBar/SearchBar";
import { Pagination } from "../Pagination/Pagination";
import { getProducts } from "../../services/products";
import './ItemListContainer.css';

export const ItemListContainer = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const { category } = useParams();
    const productsPerPage = 12;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                
                if (category) {
                    const filteredByCategory = data.filter(
                        (product) => product.category === category
                    );
                    setAllProducts(filteredByCategory);
                } else {
                    setAllProducts(data);
                }
                setSearchTerm("");
                setCurrentPage(1);
            } catch (error) {
                setAllProducts([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, [category]);

    useEffect(() => {
        const filtered = allProducts.filter((product) => {
            const matchesSearch = 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
        
        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [searchTerm, allProducts]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const getTitle = () => {
        if (category === "SLR") return "Cámaras SLR";
        if (category === "Compactas") return "Cámaras Compactas";
        return "Todas las Cámaras";
    };

    if (loading) {
        return (
            <section className="item-list-container">
                <h1>{getTitle()}</h1>
                <p>Cargando productos...</p>
            </section>
        );
    }

    return (
        <section className="item-list-container">
            <h1>{getTitle()}</h1>
            <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
            
            {filteredProducts.length === 0 ? (
                <div className="no-results">
                    <p>No se encontraron productos</p>
                </div>
            ) : (
                <>
                    <ItemList products={currentProducts} />
                    {totalPages > 1 && (
                        <Pagination 
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
        </section>
    );
};