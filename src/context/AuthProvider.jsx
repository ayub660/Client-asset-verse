// src/context/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../services/firebase.config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

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

            Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: `Welcome ${name}`,
                showConfirmButton: false,
                timer: 1500
            });

            return { user: res.user, role: userRole };
        } catch (error) {
            // Custom messages instead of Firebase technical error
            if (error.code === "auth/email-already-in-use") {
                showError("This email is already registered. Please use a different email.");
            } else if (error.code === "auth/invalid-email") {
                showError("Invalid email address.");
            } else if (error.code === "auth/weak-password") {
                showError("Password should be at least 6 characters.");
            } else {
                showError("Registration failed. Please try again.");
            }
            throw error;
        }
    };

    // Login with Email
    const loginWithEmail = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            setUser(res.user);

            const savedRole = localStorage.getItem("userRole") || "employee";
            setRole(savedRole);

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: `Welcome back ${res.user.displayName || "User"}`,
                showConfirmButton: false,
                timer: 1500
            });

            return { user: res.user, role: savedRole };
        } catch (error) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                showError("Invalid email or password.");
            } else if (error.code === "auth/invalid-email") {
                showError("Invalid email address.");
            } else {
                showError("Login failed. Please try again.");
            }
            throw error;
        }
    };

    // Google login
    const loginWithGoogle = async (selectedRole) => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            setUser(res.user);
            setRole(selectedRole);
            localStorage.setItem("userRole", selectedRole);

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: `Welcome ${res.user.displayName}`,
                showConfirmButton: false,
                timer: 1500
            });

            return { user: res.user, role: selectedRole };
        } catch (error) {
            showError("Google login failed. Please try again.");
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

            Swal.fire({ icon: "success", title: "Logged Out", showConfirmButton: false, timer: 1200 });
        } catch (error) {
            showError("Logout failed. Please try again.");
        }
    };

    // Track auth state
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
        <AuthContext.Provider value={{
            user,
            role,
            loading,
            registerWithEmail,
            loginWithEmail,
            loginWithGoogle,
            logout,
            setRole
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
