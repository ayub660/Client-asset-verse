import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import { FaArrowLeft, FaEdit, FaPaperPlane } from "react-icons/fa";

const AssetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: asset = {}, isLoading, error } = useQuery({
        queryKey: ["asset-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (error) return <div className="text-center py-10 text-red-500">Error loading asset details!</div>;


    const isHR = user?.role === "hr";
    const isEmployee = user?.role === "employee";

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto bg-white shadow-lg rounded-xl mt-10">
            {/* 🔙 Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors font-medium"
            >
                <FaArrowLeft /> Back to List
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* 🖼️ Image Section */}
                <div className="md:col-span-5">
                    <img
                        src={asset.productImage || "https://via.placeholder.com/400"}
                        alt={asset.productName}
                        className="rounded-lg w-full object-cover h-96 md:h-[500px] shadow-md border"
                    />
                </div>

                {/* 📝 Details Section */}
                <div className="md:col-span-7 flex flex-col justify-between">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold text-gray-800 border-b pb-4">
                            {asset.productName} 📦
                        </h2>

                        <div className="bg-gray-50 p-6 rounded-xl space-y-4 shadow-sm border border-gray-100">
                            <p className="text-xl"><strong>Type:</strong> <span className="text-gray-700 capitalize">{asset.productType}</span> 🏷️</p>
                            <p className="text-xl"><strong>Quantity:</strong> <span className="text-gray-700">{asset.productQuantity}</span> 🔢</p>
                            <p className="text-xl"><strong>Added Date:</strong> <span className="text-gray-700">{new Date(asset.createdAt).toLocaleDateString()}</span> 📅</p>
                            <div className="pt-4 border-t">
                                <h3 className="text-lg font-semibold mb-2">Description:</h3>
                                <p className="text-gray-600 leading-relaxed italic">
                                    {asset.description || "No description available for this asset."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 🔘 Action Buttons Section */}
                    <div className="mt-8 pt-6 border-t flex gap-4">
                        {isHR && (
                            <button
                                onClick={() => navigate(`/dashboard/update-asset/${id}`)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg font-bold"
                            >
                                <FaEdit /> Update Asset
                            </button>
                        )}

                        {isEmployee && (
                            <button
                                disabled={asset.productQuantity === 0}
                                className={`flex items-center gap-2 px-8 py-3 rounded-lg transition shadow-lg font-bold ${asset.productQuantity > 0
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-gray-400 text-gray-100 cursor-not-allowed"
                                    }`}
                            >
                                <FaPaperPlane />
                                {asset.productQuantity > 0 ? "Request This Asset" : "Out of Stock"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetDetails;