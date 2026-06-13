import { useEffect, useState, useRef } from "react";
import API from "../services/api";
function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const notificationRef = useRef();
  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.log("Notification fetch error", error );
    }
  };
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);
  const markRead = async (id) => {
    try {
      await API.put(
        `/notifications/${id}`
      );
      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };
  const unreadCount = notifications.filter(
      (item) => !item.isRead
    ).length;
  return (
    <div className="navbar">
      <div className="navbar-title">
        🏢 Company Operations Dashboard
      </div>
      <div className="navbar-right">
        <div
          className="notification-box"
          ref={notificationRef}
        >
          <button
            className="bell-btn"
            onClick={() => setOpen(!open)}
          >
            🔔
            {
              unreadCount > 0 &&
              <span className="notification-count">
                {unreadCount}
              </span>
            }
          </button>
          {
            open &&
            <div className="notification-dropdown">
              <h3> Notifications </h3>
              {
                notifications.length === 0 ?
                (
                  <p className="empty"> No notifications </p>
                )
                :
                (
                  notifications
                  .slice(0,8)
                  .map((item)=>(
                    <div
                      key={item._id}
                      className={
                        item.isRead ? "notification-item read":"notification-item"
                      }
                      onClick={() => markRead(item._id)
                      }
                    >
                      <p> {item.message} </p>
                      <small> {item.type} </small>
                    </div>
                  ))
                )
              }
            </div>
          }
        </div>
        <div className="profile">
          <div className="avatar">
            A
          </div>
          <div>
            <b> Admin </b>
            <p> Administrator </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;