import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 p-4 bg-base-200"><Outlet /></div>
        </div>
    );
};

export default DashboardLayout;
