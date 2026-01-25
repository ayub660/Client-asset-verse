
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";

const TopRequestedAssetsChart = () => {
    const axiosSecure = useAxiosSecure();

    const { data: requestedAssets = [], isLoading } = useQuery({
        queryKey: ["top-requested-assets"],
        queryFn: async () => {
            const res = await axiosSecure.get("/analytics/top-requested-assets");
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    if (!requestedAssets.length) {
        return (
            <div className="bg-base-100 flex justify-center items-center p-6 rounded-xl shadow h-72 w-full">
                <p className="text-sm text-gray-500">No requested data available</p>
            </div>
        );
    }

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow h-72 w-full">
            <h3 className="text-sm font-semibold mb-2 text-center">
                Top 5 Requested Assets
            </h3>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={requestedAssets}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="requests" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopRequestedAssetsChart;
