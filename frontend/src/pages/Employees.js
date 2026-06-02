import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");

      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);

    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="content">
          <h2>Employees</h2>

          {employees.map((emp) => (
            <div key={emp._id}>
              <p>{emp.name}</p>
              <p>{emp.email}</p>

              <button
                onClick={() =>
                  deleteEmployee(emp._id)
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Employees;