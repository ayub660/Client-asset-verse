import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3500",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
