import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";

const MyAssets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const { data: profile = {}, isLoading } = useQuery({
        queryKey: ["my-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const filteredAssets = (profile.assets || []).filter(
        (asset) =>
            asset.productName.toLowerCase().includes(search.toLowerCase()) &&
            (typeFilter ? asset.productType === typeFilter : true)
    );

    return (
        <div className="p-6 space-y-4">
            <Helmet>
                <title>My Assets | AssetVerse</title>
            </Helmet>

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Assets</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search asset..."
                        className="input"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="select border-primary outline-none"
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="Returnable">Returnable</option>
                        <option value="Non-returnable">Non-returnable</option>
                    </select>
                    <button onClick={() => window.print()} className="btn btn-primary">
                        Print
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Asset</th>
                            <th>HR Email</th>
                            <th>Status</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map((asset, index) => (
                                <tr key={asset.assetId}>
                                    <th>{index + 1}</th>
                                    <td>{asset.productName}</td>
                                    <td>{asset.hrEmail}</td>
                                    <td>{asset.status || "approved"}</td>
                                    <td>{asset.productType}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No assets found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssets;
