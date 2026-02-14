import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef"];

const TopRequestedAssetsChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center opacity-50 italic">
                No request data available yet.
            </div>
        );
    }

    return (
        <div className="w-full h-80">
            <h3 className="text-left font-bold mb-6 text-base-content uppercase tracking-wider text-sm border-l-4 border-primary pl-3">
                Most Requested Assets
            </h3>
            <ResponsiveContainer width="100%" height="100%">

                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.1} />


                    <XAxis type="number" hide />


                    <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        width={100}
                        tick={{ fill: "currentColor", fontSize: 11, fontWeight: 500 }}
                    />

                    <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        contentStyle={{
                            backgroundColor: "var(--fallback-b1, #1d232a)",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "12px"
                        }}
                    />


                    <Bar dataKey="count" barSize={20} radius={[0, 10, 10, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopRequestedAssetsChart;