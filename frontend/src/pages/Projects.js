// import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useRef, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [teamSearch, setTeamSearch] = useState("");
  const teamDropdownRef = useRef(null);
  const [userRole, setUserRole] = useState("");
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  console.log("showModal =", showModal);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    team: [],
    progress: "",
    status: "Planning"
  });
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
    const profile = await API.get("/auth/profile");
    setUserRole(profile.data.role);
    setUser(profile.data);
    console.log("Projects fetched:", res.data);
    setProjects(res.data);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchProjects();
  fetchEmployees();
}, []);
useEffect(() => {
  function handleClickOutside(event) {
    if (
      teamDropdownRef.current &&
      !teamDropdownRef.current.contains(event.target)
    ) {
      setShowTeamDropdown(false);
    }
  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
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
      const payload =
      userRole==="admin"
      ? formData
      : {
          status: formData.status,
          progress: formData.progress
      };
      const res = await API.put(
        `/projects/${editingId}`,
        payload
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
      team:  [],
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
    if(userRole==="admin"){
    setFormData({
      name: project.name,
      team: Array.isArray(project.team) ? project.team : [],
      progress: project.progress,
      status: project.status
    });
    }else{
      setFormData({
        name: project.name,
        progress: project.progress,
        status:project.status
      });
    }
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
  const filteredEmployees = employees.filter((emp) =>
  emp.name
    .toLowerCase()
    .includes(teamSearch.toLowerCase())
);
    const visibleProjects =
  userRole === "admin"
    ? projects
    : projects.filter((project) =>
        Array.isArray(project.team)
          ? project.team.includes(user?.name)
          : false
      );
const filteredProjects = visibleProjects.filter((project) =>
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
            {userRole === "admin" && (
            <button
              className="crm-btn"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  team: [],
                  progress: "",
                  status: "Planning"
                });
                setShowModal(true);
              }}
            >
              + Add Project
            </button>
            )}
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
                          {Array.isArray(project.team) ? project.team.join(", ") : project.team}
                        </span>
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
                          alert(`
                          Project: ${project.name}
                          Team: ${
                            Array.isArray(project.team)
                              ? project.team.join(", ")
                              : project.team
                          }
                          Progress: ${project.progress}%
                          Status: ${project.status}
                          `)
                          }
                        >
                          👁
                        </button>
{userRole === "admin" ? (
  <>
    <button
      className="icon-btn"
      onClick={() => handleEdit(project)}
    >
      ✎
    </button>
    <button
      className="delete-icon-btn"
      onClick={() => handleDelete(project._id)}
    >
      🗑
    </button>
  </>
) : (
  <button
    className="icon-btn"
    onClick={() => handleEdit(project)}
  >
    ✎
  </button>
)}
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
            {userRole === "admin" ? (
              <>
            <input
              name="name"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleChange}
            />
            <div
  className="team-dropdown"
  ref={teamDropdownRef}
>
  <div
    className="team-input"
    onClick={() =>
      setShowTeamDropdown(!showTeamDropdown)
    }
  >
    {formData.team.length === 0 ? (
      <span className="placeholder">
        Select Team Members
      </span>
    ) : (
      formData.team.map((member) => (
        <span
          key={member}
          className="team-tag"
        >
          {member}
          <span
            className="remove-tag"
            onClick={(e) => {
              e.stopPropagation();
              setFormData({
                ...formData,
                team: formData.team.filter(
                  (m) => m !== member
                ),
              });
            }}
          >
            ×
          </span>
        </span>
      ))
    )}
  </div>
  {showTeamDropdown && (
    <div className="team-menu">
      <input
        className="team-search"
        placeholder="Search employee..."
        value={teamSearch}
        onChange={(e) =>
          setTeamSearch(e.target.value)
        }
      />
      <div className="team-list">
        {filteredEmployees.map((employee) => (
          <label
            key={employee._id}
            className="team-item"
          >
            <input
              type="checkbox"
              checked={formData.team.includes(
                employee.name
              )}
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData({
                    ...formData,
                    team: [
                      ...formData.team,
                      employee.name,
                    ],
                  });
                } else {
                  setFormData({
                    ...formData,
                    team: formData.team.filter(
                      (member) =>
                        member !== employee.name
                    ),
                  });
                }
              }}
            />
            {employee.name}
          </label>
        ))}
      </div>
    </div>
  )}
</div>
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
            </>
) : (
<>
    <input
        value={formData.name}
        readOnly
    />
    <input
      type="number"
      name="progress"
      value={formData.progress}
      onChange={handleChange}
    />
    <select
        name="status"
        value={formData.status}
        onChange={handleChange}
    >
        <option>Planning</option>
        <option>In Progress</option>
        <option>Testing</option>
        <option>Completed</option>
    </select>
</> )}
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