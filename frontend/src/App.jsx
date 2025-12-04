import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { CartProvider } from "./context/CartContext/CartProvider";
import { Cart } from "./components/Cart/Cart";
import { Login } from "./components/Login/Login";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer/ProductFormContainer";
import { ProductListContainer } from "./components/adminComponents/ProductListContainer/ProductListContainer";
import { RutaProtegida } from "./components/RutaProtegida/RutaProtegida";

function App() {
  return (
    <>
      <Helmet>
        <title>AnalogCam - Tienda de Cámaras Analógicas</title>
      </Helmet>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<ItemListContainer titulo={"Bienvenidos"} />}
            />
            <Route
              path="/category/:category"
              element={<ItemListContainer titulo={"Bienvenidos"} />}
            />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <RutaProtegida>
                  <ProductFormContainer />
                </RutaProtegida>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <RutaProtegida>
                  <ProductListContainer />
                </RutaProtegida>
              } 
            />
            <Route 
              path="/admin/edit/:id" 
              element={
                <RutaProtegida>
                  <ProductFormContainer />
                </RutaProtegida>
              } 
            />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
