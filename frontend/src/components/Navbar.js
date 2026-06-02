function Navbar() {
  return (
    <div className="top-navbar">

      <h2>Company Operations Dashboard</h2>

      <div className="nav-right">

        <span className="admin-name">
            Admin
        </span>

        <button className="logout-btn">
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;