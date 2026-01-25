import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3500",
});

const useAxiosSecure = () => {
  const { LogOut } = useAuth(); // ✅ AuthProvider এর নাম অনুযায়ী
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor: JWT attach
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: auto logout on 401/403
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await LogOut(); // ✅ use AuthProvider এর function
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [LogOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
