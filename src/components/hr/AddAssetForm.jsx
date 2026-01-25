import React, { useState } from "react";
import api from "../../services/api";

const AddAssetForm = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/assets", { name, category, status: "Available" });
            alert("Asset added successfully!");
            setName("");
            setCategory("");
        } catch (error) {
            console.log(error);
            alert("Failed to add asset");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Add Asset</h2>
            <input
                type="text"
                placeholder="Asset Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 w-full border p-2 rounded"
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mb-4 w-full border p-2 rounded"
                required
            />
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
                Add Asset
            </button>
        </form>
    );
};

export default AddAssetForm;
