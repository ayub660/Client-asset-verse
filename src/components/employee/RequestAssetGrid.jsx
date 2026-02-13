import React from "react";
import { FaEdit, FaTrash, FaBox, FaCalendarAlt } from "react-icons/fa";

const RequestAssetGrid = ({ asset, onEdit, onDelete }) => {
    // আগের কোড অনুযায়ী destruct করা হলো
    const { productName, productType, productQuantity, productImage, createdAt } = asset;

    // তারিখ ঠিক করার ফাংশন
    const getValidDate = () => {
        // যদি createdAt না থাকে তবে অল্টারনেটিভ চেক করবে
        const dateSource = createdAt || asset.date || asset.addedDate;

        if (!dateSource) return "Not Available";

        const date = new Date(dateSource);

        // যদি তারিখটি ভ্যালিড না হয় তবে N/A দেখাবে
        if (isNaN(date.getTime())) return "N/A";

        // সুন্দর ইংরেজি ফরম্যাটে তারিখ (যেমন: Feb 12, 2026)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="card bg-base-100 shadow-lg border border-gray-100 hover:scale-[1.02] transition-transform">
            <figure className="px-4 pt-4">
                <img
                    src={productImage || "https://via.placeholder.com/150"}
                    alt={productName}
                    className="rounded-xl h-44 w-full object-cover"
                />
            </figure>
            <div className="card-body">
                <div className="flex justify-between items-start">
                    <h2 className="card-title text-lg font-bold">{productName}</h2>
                    <span className={`badge badge-sm ${productType === 'Returnable' ? 'badge-primary' : 'badge-ghost'}`}>
                        {productType}
                    </span>
                </div>

                <div className="space-y-2 mt-2 text-sm">
                    {/* স্টক সেকশন */}
                    <div className="flex items-center gap-2">
                        <FaBox className="text-gray-400" />
                        <span className="text-gray-600 font-medium">
                            Stock: <span className={productQuantity === 0 ? "text-error font-bold" : "font-bold text-success"}>
                                {productQuantity}
                            </span>
                        </span>
                    </div>

                    {/* তারিখ সেকশন (এখন ফিক্সড) */}
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400" />
                        <span className="text-gray-600 font-medium">
                            Added Date: {getValidDate()}
                        </span>
                    </div>
                </div>

                <div className="card-actions justify-end mt-4">
                    <button onClick={onEdit} className="btn btn-xs btn-info text-white">Edit</button>
                    <button onClick={onDelete} className="btn btn-xs btn-error text-white">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default RequestAssetGrid;