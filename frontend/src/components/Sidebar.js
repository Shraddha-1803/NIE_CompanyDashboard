import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaTasks
} from "react-icons/fa";
function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "active-link" : ""
        }
      >
        <FaHome /> Dashboard
      </NavLink>
      <NavLink
        to="/employees"
        className={({ isActive }) =>
          isActive ? "active-link" : ""
        }
      >
        <FaUsers /> Employees
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive ? "active-link" : ""
        }
      >
        <FaProjectDiagram /> Projects
      </NavLink>
      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          isActive ? "active-link" : ""
        }
      >
        <FaTasks /> Tasks
      </NavLink>
    </div>
  );
}
export default Sidebar;
