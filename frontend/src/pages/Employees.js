import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
function Employees() {
  const [employees, setEmployees] = useState([]);
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
          <div className="employee-header">
            <h2>Employees</h2>
            <input
              type="text"
              placeholder="Search Employee"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              } />
            <button
              className="add-btn"
              onClick={() =>
                setShowModal(true)
              } >
              + Add Employee
            </button>
          </div>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(
                  (emp) => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>
                      {emp.department}
                    </td>
                    <td>
                      {emp.role}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          alert(
                            `
                            Name: ${emp.name}
                            Email: ${emp.email}
                            Department:
                            ${emp.department}
                            Role:
                            ${emp.role}
                            `
                          )
                        } >
                        View
                      </button>
                      <button
                        onClick={() =>
                          handleEdit(emp)
                        } >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(
                            emp._id
                          )
                        } >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
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




