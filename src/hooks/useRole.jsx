import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    // লোডিং শেষ হওয়া এবং ইউজার ইমেইল থাকা এবং টোকেন থাকা—এই ৩টি নিশ্চিত হয়ে কল হবে
    enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const email = encodeURIComponent(user.email);
      // try-catch বাদ দিয়েছি কারণ TanStack Query এরর হ্যান্ডেল করবে
      const res = await axiosSecure.get(`/users/${email}/role`);
      return res.data?.role;
    },
    // ডাটা না পাওয়া পর্যন্ত ডিফল্ট হিসেবে 'employee' দেখাবে না, null দেখাবে
    initialData: null,
    retry: 1,
  });

  // যদি লোডিং শেষ হয় এবং রোল না পাওয়া যায়, তবেই শুধু 'employee' সেট হবে
  const finalRole = role || (roleLoading ? null : "employee");

  return { role: finalRole, roleLoading };
};

export default useRole;