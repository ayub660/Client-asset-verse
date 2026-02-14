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

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

const AssetTypePieChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data: assetType = [], isLoading, isError } = useQuery({
        queryKey: ["asset-types"],
        queryFn: async () => {
            const res = await axiosSecure.get("/analytics/asset-types");
            console.log("Backend Chart Data:", res.data);
            return Array.isArray(res.data) ? res.data : [];
        },
    });

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-center text-red-500 py-4">Error loading chart</div>;


    const hasData = assetType.length > 0 && assetType.some(item => item.value > 0);

    if (!hasData) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center justify-center h-80 border">
                <div className="text-gray-400 mb-2">📊</div>
                <p className="text-sm text-gray-500 font-medium">No asset data available to display</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full h-full min-h-[400px]">
            <h3 className="text-lg font-bold mb-6 text-center text-gray-800">
                Asset Type Distribution
            </h3>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={assetType}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            paddingAngle={5}
                            labelLine={true}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {assetType.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" align="center" iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AssetTypePieChart;