import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const PaymentCancelled = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // পেজ লোড হওয়ার পর ছোট একটি ডিলে দিয়ে অ্যালার্ট দেখানো ভালো
        const alertTimer = setTimeout(() => {
            Swal.fire({
                title: "Payment Not Completed",
                text: "It seems you cancelled the payment or something went wrong. Would you like to try again?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3B82F6", // Blue for Retry
                cancelButtonColor: "#6B7280", // Gray for Dashboard
                confirmButtonText: "Yes, Try Again",
                cancelButtonText: "No, Back to Dashboard",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    // ইউজার আবার চেষ্টা করতে চাইলে প্যাকেজ পেজে যাবে
                    navigate("/dashboard/upgrade-package-hr", { replace: true });
                } else {
                    // ইউজার না চাইলে ড্যাশবোর্ডে যাবে
                    navigate("/dashboard", { replace: true });
                }
            });
        }, 500);

        return () => clearTimeout(alertTimer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <Helmet>
                <title>Payment Cancelled | AssetVerse</title>
            </Helmet>

            {/* একটি সুন্দর ভিজ্যুয়াল ফিডব্যাক */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center max-w-md w-full">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h2 className="text-2xl font-black text-gray-800 mb-2">Transaction Cancelled</h2>
                <p className="text-gray-500 mb-6">No worries, your account hasn't been charged. Please respond to the alert to continue.</p>
                <div className="flex justify-center gap-2">
                    <span className="loading loading-dots loading-sm text-gray-400"></span>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;