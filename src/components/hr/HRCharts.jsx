import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#3b82f6", "#f97316", "#10b981", "#f43f5e"];

const HrChart = ({ data }) => {
    if (!data || data.length === 0) return <p className="text-center p-10 opacity-50">No data available</p>;

    return (

        <div className="w-full" style={{ height: "450px", minWidth: "300px" }}>
            <h3 className="text-center font-bold mb-4 text-base-content opacity-80 text-sm uppercase">
                Asset Type Distribution
            </h3>

            <ResponsiveContainer width="100%" height="100%">

                <PieChart margin={{ top: 20, right: 70, left: 70, bottom: 20 }}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="45%"

                        outerRadius={70}
                        dataKey="value"
                        nameKey="name"
                        labelLine={true}

                        label={({ name, value }) => `${name}: ${value}`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--fallback-b1, #1d232a)",
                            border: "1px solid rgba(128,128,128,0.3)",
                            borderRadius: "8px"
                        }}
                    />


                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: "20px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HrChart;