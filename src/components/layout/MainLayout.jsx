import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (

        <div className="flex flex-col min-h-screen bg-base-100 text-base-content transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;