import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],

    enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const email = encodeURIComponent(user.email);

      const res = await axiosSecure.get(`/users/${email}/role`);
      return res.data?.role;
    },

    initialData: null,
    retry: 1,
  });


  const finalRole = role || (roleLoading ? null : "employee");

  return { role: finalRole, roleLoading };
};

export default useRole;