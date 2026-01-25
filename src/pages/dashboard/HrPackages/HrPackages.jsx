import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const HrPackages = () => {
    const axiosSecure = useAxiosSecure();
    const [dbPackages, setDbPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get("/packages/hr")
            .then((res) => {
                const allPlans = res.data;

                // ডাটাবেজ থেকে লিমিট অনুযায়ী ডাটা খুঁজে বের করা
                const basic = allPlans.find((p) => p.employeeLimit === 5);
                const pro = allPlans.find((p) => p.employeeLimit === 10);
                const enterprise = allPlans.find((p) => p.employeeLimit === 15);

                const finalPlans = [
                    {
                        ...(basic || {}),
                        _id: basic?._id || "temp_basic",
                        name: "Basic Plan", // ডাটাবেজে যা আছে হুবহু তাই
                        price: 5,
                        employeeLimit: 5,
                        features: ["Manage up to 5 employees", "Basic asset tracking", "Email support"],
                    },
                    {
                        ...(pro || {}),
                        _id: pro?._id || "temp_pro",
                        name: "Pro Plan",
                        price: 10,
                        employeeLimit: 10,
                        features: ["Manage up to 10 employees", "Advanced asset tracking", "Priority support"],
                    },
                    {
                        ...(enterprise || {}),
                        _id: enterprise?._id || "temp_ent",
                        name: "Enterprise Plan",
                        price: 15,
                        employeeLimit: 15,
                        features: ["Manage up to 15 employees", "Full asset management", "Custom reports"],
                    },
                ];

                setDbPackages(finalPlans);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching packages:", err);
                setLoading(false);
            });
    }, [axiosSecure]);

    const handleSubscribe = async (plan) => {
        // ডাবল চেক: যদি ডাটাবেজে আইডি না পাওয়া যায়
        if (plan._id.includes("temp")) {
            Swal.fire({
                title: "Database Sync Required",
                text: `The package '${plan.name}' with limit ${plan.employeeLimit} was not found in MongoDB.`,
                icon: "warning"
            });
            return;
        }

        try {
            const res = await axiosSecure.post("/create-checkout-session", {
                packageId: plan._id
            });
            if (res.data?.url) {
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", error.response?.data?.message || "Payment failed", "error");
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );

    return (
        <div className="py-16 bg-base-200/50 min-h-screen">
            <Helmet>
                <title>Pricing Plans | AssetVerse</title>
            </Helmet>

            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-800 uppercase tracking-tight">
                        Our Pricing Plans
                    </h2>
                    <p className="text-gray-500 mt-2">Scale your team with the right plan</p>
                    <div className="h-1.5 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dbPackages.map((plan) => (
                        <div
                            key={plan._id}
                            className="card bg-white shadow-xl border border-gray-100 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                        >
                            <div className="card-body p-6 text-center flex flex-col items-center">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                    {plan.name}
                                </h3>

                                <div className="mb-4">
                                    <span className="text-5xl font-black text-primary">${plan.price}</span>
                                    <span className="text-xs text-gray-400 block mt-1 font-bold">ONE-TIME</span>
                                </div>

                                <div className="badge badge-primary badge-outline font-bold px-4 py-3 mb-6">
                                    {plan.employeeLimit} Employees
                                </div>

                                <ul className="space-y-3 mb-8 text-left w-full">
                                    {plan.features?.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600 font-medium">
                                            <span className="text-primary mt-0.5">✔</span> {f}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscribe(plan)}
                                    className="btn btn-primary btn-block text-white font-bold rounded-2xl shadow-lg shadow-primary/30 border-none hover:bg-primary-focus"
                                >
                                    SUBSCRIBE
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HrPackages;