import React, { createContext, useContext, useEffect, useState } from "react";

import { auth, googleProvider } from "../../services/firebase.config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);


    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };


    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);
    // --------------------------------

    const showError = (message) => {
        Swal.fire({
            icon: "error",
            title: "Registration / Login Failed",
            text: message || "Something went wrong. Please try again.",
        });
    };

    // Register
    const registerWithEmail = async (name, email, password, profileImage, userRole) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, { displayName: name, photoURL: profileImage });
            setUser(res.user);
            setRole(userRole);
            localStorage.setItem("userRole", userRole);
            return { user: res.user, role: userRole };
        } catch (error) {
            showError(error.message);
            throw error;
        }
    };

    // Login
    const loginWithEmail = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUser(res.user);
            const savedRole = localStorage.getItem("userRole") || "employee";
            setRole(savedRole);
            return { user: res.user, role: savedRole };
        } catch (error) {
            showError("Login failed.");
            throw error;
        }
    };

    // Google Login
    const loginWithGoogle = async (selectedRole) => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            setUser(res.user);
            setRole(selectedRole);
            localStorage.setItem("userRole", selectedRole);
            return { user: res.user, role: selectedRole };
        } catch (error) {
            showError("Google login failed.");
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setRole(null);

            localStorage.removeItem("userRole");
            localStorage.removeItem("access-token");
        } catch (error) {
            showError("Logout failed.");
        }
    };

    // Auth State Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const savedRole = localStorage.getItem("userRole");
            setRole(savedRole);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                loading,
                registerWithEmail,
                loginWithEmail,
                loginWithGoogle,
                logout,
                setRole,
                theme,
                toggleTheme,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;