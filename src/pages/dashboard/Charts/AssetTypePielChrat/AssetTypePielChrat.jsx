import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const COLORS = ["#0088FE", "#FF8042"];

const AssetTypePieChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data: assetType = [], isLoading } = useQuery({
        queryKey: ["asset-types"],
        queryFn: async () => {
            const res = await axiosSecure.get("/analytics/asset-types");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    if (!assetType.length || assetType.every((item) => item.value === 0)) {
        return (
            <div className="bg-base-100 p-6 rounded-xl shadow text-center">
                <p className="text-sm text-gray-500">No asset data available</p>
            </div>
        );
    }

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow h-72 w-full">
            <h3 className="text-sm font-semibold mb-2 text-center">
                Asset Type Distribution
            </h3>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={assetType}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                    >
                        {assetType.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AssetTypePieChart;