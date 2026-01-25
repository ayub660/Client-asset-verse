import { useEffect, useState } from "react";
import api from "../../services/api";

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        api.get("/users?role=employee")
            .then(res => setEmployees(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Employee List</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Team</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map(emp => (
                        <tr key={emp._id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.team}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
