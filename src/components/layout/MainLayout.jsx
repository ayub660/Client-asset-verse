import Navbar from "../NavBar/NavBar";
import Footer from "../common/Footer";
import { Outlet, useNavigation, useLocation } from "react-router-dom"; // useLocation যোগ করা হয়েছে
import useAuth from "../../hooks/useAuth";
import Loader from "../common/Loader";

const MainLayout = () => {
    const { loading } = useAuth();
    const navigation = useNavigation();
    const location = useLocation(); // বর্তমান লোকেশন পাওয়ার জন্য

    const isNavigating = navigation.state === "loading";

    // যদি URL পাথে "dashboard" শব্দটি থাকে তবে এটি true হবে
    const isDashboard = location.pathname.includes("dashboard");
    console.log("Current Path:", location.pathname);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-gray-950">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-base-100 text-base-content transition-colors duration-300">

            {/* ড্যাশবোর্ড পেজে না থাকলে তবেই ন্যাভবার দেখাবে */}
            {!isDashboard && <Navbar />}

            <main className="flex-1 relative">
                {isNavigating && (
                    <div className="absolute inset-0 z-50 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm flex items-center justify-center">
                        <Loader />
                    </div>
                )}
                <Outlet />
            </main>

            {/* ড্যাশবোর্ড পেজে না থাকলে তবেই ফুটার দেখাবে */}
            {!isDashboard && <Footer />}
        </div>
    );
};

export default MainLayout;