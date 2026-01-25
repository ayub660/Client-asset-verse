import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = "employee", isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      try {
        const email = encodeURIComponent(user.email);
        const res = await axiosSecure.get(`/users/${email}/role`);
        return res.data?.role || "employee";
      } catch (err) {

        console.warn("Role not found, defaulting to employee");
        return "employee";
      }
    },
    retry: false,
  });

  return { role, roleLoading: isLoading };
};

export default useRole;