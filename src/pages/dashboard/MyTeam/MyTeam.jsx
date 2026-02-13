import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { Helmet } from "react-helmet";

const MyTeam = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // আপনার ব্যাকএন্ড রুট /team/:email অনুযায়ী ডাটা আনা
    const { data: team = [], isLoading } = useQuery({
        queryKey: ["team", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/team/${user?.email}`);
            return res.data;
        },
    });

    // জন্মদিনের লজিক (বর্তমান মাস অনুযায়ী)
    const currentMonth = new Date().getMonth();
    const upcomingBirthdays = team.filter(
        (p) => p.dateOfBirth && new Date(p.dateOfBirth).getMonth() === currentMonth
    );

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 space-y-10 max-w-7xl mx-auto">
            <Helmet>
                <title>My Team | AssetVerse</title>
            </Helmet>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-800">My Team Members</h2>
                    <p className="text-gray-500 text-sm mt-1">View all your colleagues and team updates.</p>
                </div>
                <div className="badge badge-primary badge-lg p-5 font-bold uppercase tracking-widest shadow-md">
                    {team[0]?.companyName || "No Company Assigned"}
                </div>
            </div>

            {/* Team Members Grid */}
            <div>
                {team.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-inner border-2 border-dashed border-gray-200">
                        <div className="text-6xl mb-4">🤝</div>
                        <p className="text-xl font-medium text-gray-500 italic">
                            You are not affiliated with any company yet or HR hasn't approved you.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div
                                key={member._id}
                                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 p-8 flex flex-col items-center text-center border border-gray-50 group"
                            >
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                    <img
                                        src={member.image || member.photo || "https://i.ibb.co/PNG-placeholder.png"}
                                        alt={member.name}
                                        className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-sm"
                                        onError={(e) => e.target.src = "https://i.ibb.co/PNG-placeholder.png"}
                                    />
                                    {member.role === 'hr' && (
                                        <span className="absolute bottom-1 right-1 badge badge-primary font-bold shadow-lg text-[10px]">HR</span>
                                    )}
                                </div>

                                <h3 className="mt-5 font-bold text-xl text-gray-800">{member.name}</h3>
                                <p className="text-xs opacity-60 font-medium mt-1 uppercase tracking-tighter truncate w-full px-2">
                                    {member.email}
                                </p>

                                <div className="mt-4 w-full pt-4 border-t border-gray-50">
                                    <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase ${member.role === 'hr' ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                                        }`}>
                                        {member.role === 'hr' ? "Admin / HR" : (member.position || "Employee")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Birthdays Section */}
            {upcomingBirthdays.length > 0 && (
                <div className="bg-gradient-to-br from-primary/10 to-blue-50 p-8 rounded-[2rem] border border-primary/10 shadow-sm">
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-gray-800">
                        <span className="text-3xl">🎂</span> Upcoming Birthdays
                        <span className="text-sm font-normal text-primary bg-white px-3 py-1 rounded-full shadow-sm ml-2">This Month</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingBirthdays.map((p) => (
                            <div
                                key={p._id}
                                className="p-4 bg-white rounded-2xl shadow-sm flex items-center gap-4 border border-white hover:border-primary/20 transition-all"
                            >
                                <img
                                    src={p.image || p.photo || "https://i.ibb.co/PNG-placeholder.png"}
                                    className="w-14 h-14 rounded-full border-2 border-primary/10 object-cover"
                                    alt={p.name}
                                />
                                <div>
                                    <p className="font-extrabold text-gray-800">{p.name}</p>
                                    <p className="text-sm font-medium text-primary">
                                        {new Date(p.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTeam;