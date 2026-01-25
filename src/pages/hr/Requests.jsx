import { useEffect, useState } from "react";
import api from "../../services/api";

const Requests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        api.get("/requests")
            .then(res => setRequests(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Asset Requests</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Asset</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req._id}>
                            <td>{req.employeeName}</td>
                            <td>{req.assetName}</td>
                            <td>{req.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Requests;
