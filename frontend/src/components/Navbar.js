import { useEffect, useState, useRef } from "react";
import API from "../services/api";
function Navbar() {
const [notifications,setNotifications] = useState([]);
const [open,setOpen] = useState(false);
const [profileOpen,setProfileOpen] = useState(false);
const [user,setUser] = useState(null);
const notificationRef = useRef();
const profileRef = useRef();
const fetchProfile = async()=>{
try{
const res = await API.get("/profile");
setUser(res.data);
}catch(error){
console.log(
"Profile Error",
error
);
}
};
const fetchNotifications = async()=>{
try{
const res =
await API.get("/notifications");
setNotifications(res.data);
}catch(error){
console.log(error);
}
};
useEffect(()=>{
fetchProfile();
fetchNotifications();
const interval =
setInterval(()=>{
fetchNotifications();
},5000);
return()=>clearInterval(interval);
},[]);
useEffect(()=>{
const close=(e)=>{
if(
notificationRef.current &&
!notificationRef.current.contains(e.target)
){
setOpen(false);
}
if(
profileRef.current &&
!profileRef.current.contains(e.target)
){
setProfileOpen(false);
}
};
document.addEventListener(
"mousedown",
close
);
return()=>{
document.removeEventListener(
"mousedown",
close
);
};
},[]);
const markRead=async(id)=>{
try{
await API.put(
`/notifications/${id}`
);
fetchNotifications();
}catch(error){
console.log(error);
}
};
const unreadCount =
notifications.filter(
n=>!n.isRead
).length;
return(
<div className="navbar">
<div className="navbar-logo">
🏢 Company Operations Dashboard
</div>
<div className="navbar-right">
<div
className="notification-wrapper"
ref={notificationRef}
>
<button
className="bell-btn"
onClick={()=>{
setOpen(!open);
setProfileOpen(false);
}}
>
🔔
{
unreadCount>0 &&
<span className="notification-count">
{unreadCount}
</span>
}
</button>
{
open &&
<div className="notification-box">
<h3>
Notifications
</h3>
{
notifications
.slice(0,8)
.map(item=>(
<div
key={item._id}
className="notification-item"
onClick={()=>markRead(item._id)}
>
<p>
{item.message}
</p>
<small>
{item.type}
</small>
</div>
))
}
</div>
}
</div>
<div
className="profile-section"
ref={profileRef}
onClick={()=>{
setProfileOpen(!profileOpen);
setOpen(false);
}}
>
<div className="avatar">
{
user?.name
?
user.name.charAt(0).toUpperCase()
:
"A"
}
</div>
<div>
<h3>
{
user?.name || "Loading..."
}
</h3>
<p>
{
user?.role || ""
}
</p>
</div>
</div>
{
profileOpen && user &&
<div className="profile-card">
<div className="profile-header">
<div className="big-avatar">
{
user.name.charAt(0).toUpperCase()
}
</div>
<div>
<h2>
{user.name}
</h2>
<p>
{user.role}
</p>
</div>
</div>
<div className="profile-details">
<p>
<b>Email:</b>
{user.email}
</p>
<p>
<b>Department:</b>
{user.department || "N/A"}
</p>
<p>
<b>Role:</b>
{user.role}
</p>
<p>
<b>Team:</b>
{user.team || "N/A"}
</p>
<hr/>
<h3>
Projects
</h3>
{
user.projects?.length ?
user.projects.map(
(p)=>
<p key={p._id}>
{p.name}
</p>
)
:
<p>No ongoing projects</p>
}
<h3>
Tasks
</h3>
{
user.tasks?.length ?
user.tasks.map(
(t)=>
<p key={t._id}>
{t.title}
</p>
)
:
<p>No tasks assigned</p>
}
<hr/>
<p>
<b>
Completed Projects:
</b>
{user.completedProjects || 0}
</p>
<p>
<b>
Completed Tasks:
</b>
{user.completedTasks || 0}
</p>
</div>
</div>
}
</div>
</div>
);
}
export default Navbar;