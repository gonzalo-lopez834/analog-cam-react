import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
    return (
        <div className="main-layout-wrapper">
            <Header />
            <main className="main-layout">
                <Outlet />  
            </main>
            <Footer />
        </div>
    );
};