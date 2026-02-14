import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#3b82f6", "#f97316", "#10b981", "#f43f5e"];

const HrChart = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="h-80 flex items-center justify-center opacity-50">
            No chart data available
        </div>
    );

    return (

        <div className="w-full" style={{ height: "450px", minHeight: "450px" }}>
            <h3 className="text-center font-bold mb-6 text-base-content uppercase tracking-widest text-sm">
                Asset Type Distribution
            </h3>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 30, left: 30, bottom: 30 }}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="45%"

                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                        labelLine={true}

                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--fallback-b1, #1d232a)",
                            color: "var(--fallback-bc, #fff)",
                            border: "1px solid rgba(128,128,128,0.2)",
                            borderRadius: "12px"
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        wrapperStyle={{ paddingTop: "20px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HrChart;