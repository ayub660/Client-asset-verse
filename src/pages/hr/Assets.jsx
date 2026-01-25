import React from "react";
import AssetTable from "../../components/hr/AssetTable";
import AddAssetForm from "../../components/hr/AddAssetForm";

const Assets = () => {
    return (
        <div className="p-6">
            <AddAssetForm />
            <div className="mt-6">
                <AssetTable />
            </div>
        </div>
    );
};

export default Assets;
