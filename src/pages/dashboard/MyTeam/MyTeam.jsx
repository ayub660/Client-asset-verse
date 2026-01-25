import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyTeam = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedCompany, setSelectedCompany] = useState("");

    const { data: companies = [] } = useQuery({
        queryKey: ["myCompanies"],
        queryFn: async () => {
            const res = await axiosSecure.get("/companies/my");
            return res.data;
        },
    });

    const { data: team = [], isLoading } = useQuery({
        queryKey: ["team", selectedCompany],
        enabled: !!selectedCompany,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/employees/company/${selectedCompany}`
            );
            return res.data;
        },
    });

    const currentMonth = new Date().getMonth();
    const upcomingBirthdays = team.filter(
        (p) => p.dateOfBirth && new Date(p.dateOfBirth).getMonth() === currentMonth
    );

    return (
        <div className="p-6 space-y-10 max-w-7xl mx-auto">
            {/* Header */}
            <h2 className="text-2xl font-bold tracking-tight">My Team</h2>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center">

                {/* Company Selector */}
                <div className="w-full sm:w-64">
                    <select
                        className="select select-bordered w-full"
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                        <option value="">Select Company</option>
                        {companies.map((c, i) => (
                            <option key={i} value={c.hrEmail}>
                                {c.companyName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Team Section */}
            <div>
                {!selectedCompany && (
                    <div className="text-center py-16 opacity-60">
                        Select a company to view team members
                    </div>
                )}

                {isLoading && selectedCompany && (
                    <div className="text-center py-16">Loading team...</div>
                )}

                {!isLoading && selectedCompany && team.length === 0 && (
                    <div className="text-center py-16 opacity-60">
                        No employees found for this company
                    </div>
                )}

                {!isLoading && team.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div
                                key={member._id}
                                className="bg-base-100 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center text-center"
                            >
                                <img
                                    src={member.photo || "/avatar.png"}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full object-cover border"
                                />

                                <h3 className="mt-4 font-semibold">{member.name}</h3>
                                <p className="text-sm opacity-70">{member.email}</p>

                                <span className="badge badge-outline mt-3">
                                    {member.position || "Employee"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Birthdays */}
            {upcomingBirthdays.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        🎂 Upcoming Birthdays
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {upcomingBirthdays.map((p) => (
                            <div
                                key={p._id}
                                className="p-4 bg-base-200 rounded-lg shadow flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-sm opacity-70">
                                        {new Date(p.dateOfBirth).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="badge badge-success">This Month</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTeam;