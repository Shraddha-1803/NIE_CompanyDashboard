import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "employee"
  });

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await API.put(`/employees/${editingId}`, formData);
      } else {
        await API.post("/employees", formData);
      }
      fetchEmployees();
      setShowModal(false);
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        department: "",
        role: "employee"
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee._id);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  // Admin-only role toggle (separate from the general edit flow)
  const handleRoleChange = async (id, newRole) => {
    try {
      await API.put(`/employees/${id}/role`, { role: newRole });
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <div className="dashboard-main">
          <div className="crm-page-header">
            <div className="page-title">
              <div className="page-icon">👥</div>
              <div>
                <h2>Employees</h2>
                <p>Manage company employees</p>
              </div>
            </div>

            {isAdmin && (
              <button
                className="crm-btn"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: "",
                    email: "",
                    department: "",
                    role: "employee"
                  });
                  setShowModal(true);
                }}
              >
                + Add Employee
              </button>
            )}
          </div>

          <div className="employee-toolbar">
            <input
              className="modern-search"
              placeholder="Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, index) => (
                  <tr key={emp._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="employee-info">
                        <div className="employee-avatar">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="employee-name">{emp.name}</div>
                          <div className="employee-id">{emp._id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      {isAdmin ? (
                        <select
                          className="department-pill"
                          value={emp.role}
                          onChange={(e) =>
                            handleRoleChange(emp._id, e.target.value)
                          }
                        >
                          <option value="employee">employee</option>
                          <option value="admin">admin</option>
                        </select>
                      ) : (
                        <span className="department-pill">{emp.role}</span>
                      )}
                    </td>
                    {isAdmin && (
                      <td>
                        <button
                          className="icon-btn"
                          onClick={() => handleEdit(emp)}
                        >
                          ✎
                        </button>
                        <button
                          className="delete-icon-btn"
                          onClick={() => handleDelete(emp._id)}
                        >
                          🗑
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && isAdmin && (
            <div className="modal">
              <div className="modal-content">
                <h3>{editingId ? "Edit Employee" : "Add Employee"}</h3>
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={handleSubmit}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Employees;