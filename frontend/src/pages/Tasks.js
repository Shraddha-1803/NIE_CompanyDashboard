import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    projectId: "",
    priority: "Medium",
    status: "Pending"
  });
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/auth/users");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    fetchProjects();
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
        await API.put(`/tasks/${editingId}`, formData);
      } else {
        await API.post("/tasks", formData);
      }
      fetchTasks();
      setShowModal(false);
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        projectId: "",
        priority: "Medium",
        status: "Pending"
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (task) => {
    setEditingId(task._id);
    setFormData({
      title: task.title || "",
      description: task.description || "",
      assignedTo:
        task.assignedTo?._id || task.assignedTo || "",
      projectId:
        task.projectId?._id || task.projectId || "",
      priority: task.priority || "Medium",
      status: task.status || "Pending"
    });
    setShowModal(true);
  };
  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };
  const filteredTasks = tasks.filter((task) =>
    task.title?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <div className="dashboard-main">
          <div className="crm-page-header">
            <div className="page-title">
              <div className="page-icon">📋</div>
              <div>
                <h2>Tasks</h2>
                <p>
                  Create, assign and track project tasks
                </p>
              </div>
            </div>
            <button
              className="crm-btn"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: "",
                  description: "",
                  assignedTo: "",
                  projectId: "",
                  priority: "Medium",
                  status: "Pending"
                });
                setShowModal(true);
              }}
            >
              + Add Task
            </button>
          </div>
          <div className="employee-toolbar">
            <input
              type="text"
              placeholder="Search task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="modern-search"
            />
          </div>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Assigned To</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(
                  (task, index) => (
                    <tr key={task._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="employee-info">
                          <div className="employee-avatar">
                            📋
                          </div>
                          <div>
                            <div className="employee-name">
                              {task.title}
                            </div>
                            <div className="employee-id">
                              {task.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {task.projectId?.name ||
                          task.projectId}
                      </td>
                      <td>
                        {task.assignedTo?.name ||
                          task.assignedTo}
                      </td>
                      <td>
                        <span className="department-pill">
                          {task.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-pill ${task.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="icon-btn"
                          onClick={() =>
                            alert(
                              `Task: ${task.title}
Project: ${
                                task.projectId?.name ||
                                task.projectId
                              }
Assigned To: ${
                                task.assignedTo?.name ||
                                task.assignedTo
                              }
Priority: ${task.priority}
Status: ${task.status}`
                            )
                          }
                        >
                          👁
                        </button>
                        <button
                          className="icon-btn"
                          onClick={() =>
                            handleEdit(task)
                          }
                        >
                          ✎
                        </button>
                        <button
                          className="delete-icon-btn"
                          onClick={() =>
                            handleDelete(task._id)
                          }
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  )
                )}
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
                ? "Edit Task"
                : "Add Task"}
            </h3>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
            >
              <option value="">
                Select Employee
              </option>
              {employees.map((employee) => (
                <option
                  key={employee._id}
                  value={employee._id}
                >
                  {employee.name}
                </option>
              ))}
            </select>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
            >
              <option value="">
                Select Project
              </option>
              {projects.map((project) => (
                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.name}
                </option>
              ))}
            </select>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <button onClick={handleSubmit}>
              Save
            </button>
            <button
              onClick={() =>
                setShowModal(false)
              }
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Tasks;