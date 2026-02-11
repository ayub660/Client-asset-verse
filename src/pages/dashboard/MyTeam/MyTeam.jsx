import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";

const MyTeam = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // লগইন করা ইউজারের ডাটা নিতে

    // সরাসরি টিমের ডাটা ফেচ করা
    const { data: team = [], isLoading } = useQuery({
        queryKey: ["team", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/team/${user?.email}`);
            return res.data;
        },
    });

    const currentMonth = new Date().getMonth();
    const upcomingBirthdays = team.filter(
        (p) => p.dateOfBirth && new Date(p.dateOfBirth).getMonth() === currentMonth
    );

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 space-y-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-3xl font-bold tracking-tight text-primary">My Team Members</h2>
                <div className="badge badge-primary badge-lg p-4 font-bold uppercase">
                    {team[0]?.companyName || "No Company"}
                </div>
            </div>

            {/* Team Section */}
            <div>
                {team.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-3xl shadow">
                        <p className="text-xl opacity-60 italic">You are not affiliated with any company yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div
                                key={member._id}
                                className="bg-base-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-primary/5"
                            >
                                <div className="relative">
                                    <img
                                        src={member.photo || "https://i.ibb.co/PNG-placeholder.png"}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                                        onError={(e) => e.target.src = "https://i.ibb.co/PNG-placeholder.png"}
                                    />
                                    {member.role === 'hr' && (
                                        <span className="absolute bottom-0 right-0 badge badge-primary font-bold">HR</span>
                                    )}
                                </div>

                                <h3 className="mt-4 font-bold text-lg">{member.name}</h3>
                                <p className="text-sm opacity-70 break-all">{member.email}</p>

                                <span className="badge badge-ghost mt-3 capitalize">
                                    {member.role === 'hr' ? "Admin" : (member.position || "Employee")}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Birthdays Section */}
            {upcomingBirthdays.length > 0 && (
                <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        🎂 Upcoming Birthdays (This Month)
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {upcomingBirthdays.map((p) => (
                            <div
                                key={p._id}
                                className="p-5 bg-base-100 rounded-xl shadow-sm flex justify-between items-center border border-primary/10"
                            >
                                <div className="flex items-center gap-4">
                                    <img src={p.photo} className="w-10 h-10 rounded-full" alt="" />
                                    <div>
                                        <p className="font-bold">{p.name}</p>
                                        <p className="text-sm opacity-70">
                                            {new Date(p.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                                        </p>
                                    </div>
                                </div>
                                <span className="badge badge-success badge-sm">Active</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTeam;