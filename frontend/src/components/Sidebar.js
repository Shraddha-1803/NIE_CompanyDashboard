import { Link } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaTasks
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">

      <Link to="/dashboard">
        <FaHome /> Dashboard
      </Link>

      <Link to="/employees">
        <FaUsers /> Employees
      </Link>

      <Link to="/projects">
        <FaProjectDiagram /> Projects
      </Link>

      <Link to="/tasks">
        <FaTasks /> Tasks
      </Link>

    </div>
  );
}

export default Sidebar;