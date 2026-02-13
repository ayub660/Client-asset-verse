import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            const confirmPayment = async () => {
                try {
                    const res = await axiosSecure.patch("/payment-success", { sessionId });
                    if (res.data.success) {

                        queryClient.invalidateQueries(["hr-profile"]);
                        queryClient.invalidateQueries(["hr-requests"]);

                        Swal.fire({
                            title: "Success!",
                            text: res.data.message || "Your plan has been upgraded successfully.",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                        }).then(() => {
                            navigate("/dashboard/my-profile");
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error", "Failed to update plan", "error");
                    navigate("/dashboard/my-profile");
                }
            };

            confirmPayment();
        }
    }, [sessionId, navigate, axiosSecure, queryClient]);

    return (
        <div className="py-14 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 rounded-lg shadow-sm shadow-neutral bg-base-100 flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
                Processing your payment...
            </h2>
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );
};

export default PaymentSuccess;