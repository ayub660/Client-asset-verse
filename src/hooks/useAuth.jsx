import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import AuthProvider, { AuthContext } from "../contexts/AuthProvider/AuthProvider";

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export default useAuth;
