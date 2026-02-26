import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Outlet, useNavigation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loader from "../common/Loader";

const MainLayout = () => {
    const { loading } = useAuth();
    const navigation = useNavigation();


    const isNavigating = navigation.state === "loading";


    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-gray-950">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content transition-colors duration-300">
            <Navbar />

            <main className="flex-1 relative">

                {isNavigating && (
                    <div className="absolute inset-0 z-50 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm flex items-center justify-center">
                        <Loader />
                    </div>
                )}

                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;