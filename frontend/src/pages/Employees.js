import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
function Employees() {
  const [employees, setEmployees] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: ""
  });
  const fetchEmployees = async () => {
    try {
      const res =
        await API.get("/employees");
      const profile = await API.get("/auth/profile");
setUserRole(profile.data.role);
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
      [e.target.name]:
      e.target.value
    });
  };  
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await API.put(
          `/employees/${editingId}`,
          formData
        );
      } else {
        await API.post(
          "/employees",
          formData
        );
      }
      fetchEmployees();
      setShowModal(false);
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        department: "",
        role: ""
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
      await API.delete(
        `/employees/${id}`
      );
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };
  const filteredEmployees =
    employees.filter((emp) =>
      emp.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  return (
    <>
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <div className="dashboard-main">
          <div className="crm-page-header">
  <div className="page-title">
    <div className="page-icon">
      👥
    </div>
    <div>
      <h1>Employees</h1>
      <p> Manage and view all employees in the organization </p>
    </div>
  </div>
  {userRole === "admin" && (
  <button
    className="crm-btn"
    onClick={() => {
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        department: "",
        role: ""
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
    type="text"
    placeholder="🔎︎   Search employee by name"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="modern-search" />
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(
                  (emp , index) => (
                  <tr key={emp._id}>
                    <td>{index + 1}</td>
                    <td>
  <div className="employee-info">
    <div className="employee-avatar">
      {emp.name?.charAt(0)}
    </div>
    <div>
      <div className="employee-name">
        {emp.name}
      </div>
      <div className="employee-id">
        ID: EMP00{index + 1}
      </div>
    </div>
  </div>
</td>
                    <td>{emp.email}</td>
                    <td>
  <span className="department-pill">
    {emp.department || "General"}
  </span>
</td>
                    <td>
                      {emp.role}
                    </td>
                    <td>
  <button
    className="icon-btn"
    onClick={() =>
      alert(
        `Name: ${emp.name}
Email: ${emp.email}
Department: ${emp.department}
Role: ${emp.role}`
      )
    }
  >
    👁
  </button>
  {userRole === "admin" && (
  <>
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
  </>
)}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal &&  userRole === "admin" && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {editingId
                ? "Edit Employee"
                : "Add Employee"}
            </h3>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange} />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange} />
            <input
              name="department"
              placeholder="Department"
              value={
                formData.department
              }
              onChange={handleChange} />
            <input
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange} />
            <button
              onClick={handleSubmit} >
              Save
            </button>
            <button
              onClick={() =>
                setShowModal(false)
              } >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Employees;