import React, { useEffect, useState } from "react";
import api from "../../services/api";

const AssetTable = () => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const res = await api.get("/assets");
                setAssets(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAssets();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Asset List</h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset._id}>
                            <td>{asset.name}</td>
                            <td>{asset.category}</td>
                            <td>{asset.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssetTable;
