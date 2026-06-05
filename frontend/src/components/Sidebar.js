// import { Link } from "react-router-dom";
// import {
//   FaHome,
//   FaUsers,
//   FaProjectDiagram,
//   FaTasks
// } from "react-icons/fa";
// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <Link to="/dashboard">
//         <FaHome /> Dashboard
//       </Link>
//       <Link to="/employees">
//         <FaUsers /> Employees
//       </Link>
//       <Link to="/projects">
//         <FaProjectDiagram /> Projects
//       </Link>
//       <Link to="/tasks">
//         <FaTasks /> Tasks
//       </Link>
//     </div>
//   );
// }
// export default Sidebar;


// import { NavLink } from "react-router-dom";
// import {
//   FaHome,
//   FaUsers,
//   FaProjectDiagram,
//   FaTasks
// } from "react-icons/fa";
// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <NavLink
//         to="/dashboard"
//         className={({ isActive }) =>
//           isActive ? "sidebar-link active-link" : "sidebar-link"
//         } >
//         <FaHome />
//         <span>Dashboard</span>
//       </NavLink>
//       <NavLink
//         to="/employees"
//         className={({ isActive }) =>
//           isActive ? "sidebar-link active-link" : "sidebar-link"
//         } >
//         <FaUsers />
//         <span>Employees</span>
//       </NavLink>
//       <NavLink
//         to="/projects"
//         className={({ isActive }) =>
//           isActive ? "sidebar-link active-link" : "sidebar-link"
//         } >
//         <FaProjectDiagram />
//         <span>Projects</span>
//       </NavLink>
//       <NavLink
//         to="/tasks"
//         className={({ isActive }) =>
//           isActive ? "sidebar-link active-link" : "sidebar-link"
//         } >
//         <FaTasks />
//         <span>Tasks</span>
//       </NavLink>
//     </div>
//   );
// }
// export default Sidebar;







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
