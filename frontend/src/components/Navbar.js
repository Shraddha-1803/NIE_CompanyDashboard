// function Navbar() {
//   return (
//     <div className="top-navbar">
//       <h2>Company Operations Dashboard</h2>
//       <div className="nav-right">
//         <span className="admin-name">
//             Admin
//         </span>
//         <button className="logout-btn">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
// export default Navbar;


function Navbar() {
  return (
    <div className="top-navbar">

      <div className="logo-section">
        <h2>
          🏢 Company Operations Dashboard
        </h2>
      </div>

      <div className="nav-right">

        <div className="notification">
          🔔
        </div>

        <div className="admin-profile">

          <div className="admin-avatar">
            A
          </div>

          <div>
            <h4>Admin</h4>
            <p>Administrator</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;