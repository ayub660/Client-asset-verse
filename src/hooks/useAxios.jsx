import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://asset-verse-backend-kappa.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
