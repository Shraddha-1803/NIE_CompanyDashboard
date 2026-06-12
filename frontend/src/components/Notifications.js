import {useEffect,useState} from "react";
import API from "../services/api";
function Notifications(){
    const [notifications,setNotifications]=useState([]);
    const fetchNotifications=async()=>{
      const res = await API.get("/notifications");
    setNotifications(res.data);
    }
    useEffect(()=>{
      fetchNotifications();
    },[]);
    return(
        <div className="notification-box">
            <h3> Notifications </h3>
            {
                notifications.map((item)=>(
                    <div 
                        key={item._id}
                        className={
                            item.isRead ? "notification read" : "notification" }
                    >
                    <p> {item.message} </p>
                    <span> {item.type} </span>
                    </div>
                ))
            }
        </div>
    )
}
export default Notifications;