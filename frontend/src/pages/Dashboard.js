import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [profile, setProfile] = useState(null);
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    fetchDashboardData();
  }, []);
  const fetchDashboardData = async () => {
    try {
        const [
            employeeRes,
            projectRes,
            taskRes,
            activityRes,
            profileRes
        ] = await Promise.all([
            API.get("/employees"),
            API.get("/projects"),
            API.get("/tasks"),
            API.get("/activities"),
            API.get("/auth/profile")
        ]);
        setEmployees(employeeRes.data);
        setProjects(projectRes.data);
        setTasks(taskRes.data);
        setActivities(activityRes.data);
        setProfile(profileRes.data);
        setUserRole(profileRes.data.role);
    }
    catch(err){
        console.log(err);
    }
};
  const activeTasks = tasks.filter(
    task => task.status !== "Completed"
  ).length;
  const completedTasks = tasks.filter(
    task => task.status === "Completed"
  ).length;
  const assignedProjects = projects.length;
  const completedProjects = projects.filter(
    project => project.status === "Completed"
  ).length;
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <div className="dashboard-main">
          <div className="stats-grid">
            <div className="stat-card purple">
              <h4> { 
                userRole==="admin" ? "Total Employees" : "Assigned Projects"
                } 
              </h4>
              <h2> { 
                userRole==="admin" ? employees.length : assignedProjects
                } 
              </h2>
            </div>
            <div className="stat-card blue">
              <h4> { 
                userRole==="admin" ? "Total Projects" : "Completed Projects"
                } 
              </h4>
              <h2>{
                userRole==="admin" ? projects.length : completedProjects
                }
              </h2>
            </div>
            <div className="stat-card orange">
              <h4>Active Tasks</h4>
              <h2>{activeTasks}</h2>
            </div>
            <div className="stat-card green">
              <h4>Completed Tasks</h4>
              <h2>{completedTasks}</h2>
            </div>
          </div>
          <div className="table-card">
            <div className="crm-header">
              <div className="page-title">
                <div className="page-icon">
                  📊
                </div>
                <div>
                  <h1>Recent Activities</h1>
                  <p>
                    Live updates from Employees,
                    Projects and Tasks
                  </p>
                </div>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Activity</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map(
                    (activity, index) => (
                      <tr key={activity._id}>
                        <td>{index + 1}</td>
                        <td>
                          {activity.action}
                        </td>
                        <td>
                          {activity.name}
                        </td>
                        <td>
                          <span className="department-pill">
                            {activity.type}
                          </span>
                        </td>
                        <td>
                          {new Date(
                            activity.createdAt
                          ).toLocaleString()}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center"
                      }}
                    >
                      No activities found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;