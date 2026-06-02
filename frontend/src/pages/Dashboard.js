import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard-wrapper">

      <Navbar />

      <div className="dashboard-body">

        <Sidebar />

        <div className="dashboard-main">

          <div className="stats-grid">

            <div className="stat-card purple">
              <h4>Total Employees</h4>
              <h2>25</h2>
            </div>

            <div className="stat-card blue">
              <h4>Total Projects</h4>
              <h2>10</h2>
            </div>

            <div className="stat-card orange">
              <h4>Active Tasks</h4>
              <h2>32</h2>
            </div>

            <div className="stat-card green">
              <h4>Completed Tasks</h4>
              <h2>18</h2>
            </div>

          </div>

          <div className="table-card">

            <div className="table-header">
              <h2>Recent Activities</h2>

              <button className="add-btn">
                + Add Activity
              </button>
            </div>

            <table>

              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Task</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Rohan</td>
                  <td>Landing Page</td>
                  <td>
                    <span className="badge completed">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Sarah</td>
                  <td>Backend API</td>
                  <td>
                    <span className="badge progress">
                      In Progress
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;