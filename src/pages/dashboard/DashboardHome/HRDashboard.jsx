import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import HrChart from "../../../components/hr/HRCharts";
import TopRequestedAssetsChart from "../Charts/TopRequestedAssetsChart/TopRequestedAssetsChart";

const HRDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ["hr-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/hr/stats");
      return res.data;
    }
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="p-10 text-red-500 text-center font-bold">Error: {error.message}</div>;

  return (
    <div className="p-4 md:p-6 bg-base-200 text-base-content min-h-screen transition-colors duration-300">
      <h2 className="text-3xl font-extrabold mb-8">HR Analytics Dashboard</h2>

      {/* স্ট্যাটাস কার্ডস সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-base-100 border-b-4 border-blue-500 rounded-xl shadow-sm">
          <p className="opacity-60 text-xs font-bold uppercase tracking-wider">Total Employees</p>
          <h3 className="text-4xl font-bold mt-2">{stats?.employees || 0}</h3>
        </div>

        <div className="p-6 bg-base-100 border-b-4 border-orange-500 rounded-xl shadow-sm">
          <p className="opacity-60 text-xs font-bold uppercase tracking-wider">Total Assets</p>
          <h3 className="text-4xl font-bold mt-2">{stats?.assets || 0}</h3>
        </div>

        <div className="p-6 bg-base-100 border-b-4 border-green-500 rounded-xl shadow-sm">
          <p className="opacity-60 text-xs font-bold uppercase tracking-wider">Pending Requests</p>
          <h3 className="text-4xl font-bold mt-2">{stats?.requests || 0}</h3>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">

        <div className="lg:col-span-7 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
          <HrChart data={stats?.chartData || []} />
        </div>


        <div className="lg:col-span-5 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300">
          <h4 className="text-xl font-bold mb-4">Limited Stock Items ({"<"}10)</h4>
          <div className="overflow-x-auto">
            <table className="table table-xs md:table-md w-full">
              <thead>
                <tr className="text-base-content opacity-70 border-b border-base-300">
                  <th>Asset Name</th>
                  <th className="text-right">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {stats?.limitedStock?.length > 0 ? (
                  stats.limitedStock.map((item) => (
                    <tr key={item._id} className="hover:bg-base-200 transition-colors border-b border-base-200 last:border-0">
                      <td className="font-medium truncate max-w-[120px] md:max-w-[200px]" title={item.productName}>
                        {item.productName}
                      </td>
                      <td className="text-right">
                        <span className="badge badge-error badge-outline font-bold text-[10px] md:text-xs">
                          {item.productQuantity} Left
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-8 text-center opacity-50 italic">
                      All assets have sufficient stock!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top rated asset bar chart*/}
      <div className="grid grid-cols-1 gap-8 mb-10">
        <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300">
          {/* Top rated chart*/}
          <TopRequestedAssetsChart data={stats?.topChartData || []} />
        </div>
      </div>

      {/* Welcome Message*/}
      <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-lg">
        <h4 className="text-2xl font-bold mb-2">Welcome Back, HR Manager!</h4>
        <p className="opacity-90 max-w-2xl text-blue-50">
          Everything looks good today. You have {stats?.requests || 0} pending asset requests that need your attention. Check the distribution chart to keep track of your inventory.
        </p>
      </div>
    </div>
  );
};

export default HRDashboard;