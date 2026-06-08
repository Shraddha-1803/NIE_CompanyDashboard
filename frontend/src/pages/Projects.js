import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  console.log("showModal =", showModal);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    team: "",
    lead: "",
    progress: "",
    status: "Planning"
  });
  const fetchProjects = async () => {
  try {
    const res = await API.get("/projects");
    console.log("Projects fetched:", res.data);
    setProjects(res.data);
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
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
    console.log("Submitting:", formData);
    if (editingId) {
      const res = await API.put(
        `/projects/${editingId}`,
        formData
      );
      console.log("Update Response:", res);
    } else {
      const res = await API.post(
        "/projects",
        formData
      );
      console.log("Create Response:", res);
    }
    await fetchProjects();
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: "",
      team: "",
      lead: "",
      progress: "",
      status: "Planning"
    });
  } catch (err) {
    console.log("ERROR:", err);
    console.log("ERROR RESPONSE:", err.response);
  }
};
  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      name: project.name,
      team: project.team,
      lead: project.lead,
      progress: project.progress,
      status: project.status
    });
    setShowModal(true);
  };
  const handleDelete = async (id) => {
    try {
      await API.delete(
        `/projects/${id}`
      );
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };
  const filteredProjects =
    projects.filter((project) =>
      project.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
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
                📁
              </div>
              <div>
                <h1>Projects</h1>
                <p>
                  Manage and track all company projects
                </p>
              </div>
            </div>
            <button
              className="crm-btn"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  team: "",
                  lead: "",
                  progress: "",
                  status: "Planning"
                });
                setShowModal(true);
              }}
            >
              + Add Project
            </button>
          </div>
          <div className="employee-toolbar">
            <input
              type="text"
              placeholder="Search project..."
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
                  <th>Project</th>
                  <th>Team</th>
                  <th>Lead</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map(
                  (project, index) => (
                    <tr key={project._id}>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        <div className="employee-info">
                          <div className="employee-avatar">
                            📁
                          </div>
                          <div>
                            <div className="employee-name">
                              {project.name}
                            </div>
                            <div className="employee-id">
                              ID: PRJ00{index + 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="department-pill">
                          {project.team}
                        </span>
                      </td>
                      <td>
                        {project.lead}
                      </td>
                      <td>
                        <div className="progress-wrapper">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${project.progress}%`
                              }}
                            />
                          </div>
                          <span>
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`status-pill ${project.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="icon-btn"
                          onClick={() =>
                            alert(
                              `
Project: ${project.name}
Team: ${project.team}
Lead: ${project.lead}
Progress: ${project.progress}%
Status: ${project.status}
`
                            )
                          }
                        >
                          👁
                        </button>
                        <button
                          className="icon-btn"
                          onClick={() =>
                            handleEdit(project)
                          }
                        >
                          ✎
                        </button>
                        <button
                          className="delete-icon-btn"
                          onClick={() =>
                            handleDelete(
                              project._id
                            )
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
                ? "Edit Project"
                : "Add Project"}
            </h3>
            <input
              name="name"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              name="team"
              placeholder="Assigned Team"
              value={formData.team}
              onChange={handleChange}
            />
            <input
              name="lead"
              placeholder="Project Lead"
              value={formData.lead}
              onChange={handleChange}
            />
            <input
              name="progress"
              placeholder="Progress %"
              value={formData.progress}
              onChange={handleChange}
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>
                Planning
              </option>
              <option>
                In Progress
              </option>
              <option>
                Testing
              </option>
              <option>
                Completed
              </option>
            </select>
            <button
              onClick={handleSubmit}
            >
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
export default Projects;