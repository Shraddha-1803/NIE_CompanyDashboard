import Notifications from "./Notifications";
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
          {/* 🔔 */}
          <Notifications/>
        </div>
          <div className="admin-avatar">
            A
          </div>
          <div>
            <h4>Admin</h4>
            <p>Administrator</p>
          </div>
        </div>
      </div>
  );
}
export default Navbar;