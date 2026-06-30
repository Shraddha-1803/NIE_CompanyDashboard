import { 
useEffect, 
useState, 
useRef 
} from "react";
import API from "../services/api";
function Navbar(){
const [notifications,setNotifications] =
useState([]);
const [open,setOpen] =
useState(false);
const [profileOpen,setProfileOpen] =
useState(false);
const [user,setUser] =
useState(null);
const notificationRef =
useRef();
const profileRef =
useRef();
const fetchProfile = async()=>{
try{
const res =
await API.get("/profile");
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
console.log(
"Notification Error",
error
);
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
const markRead = async(id)=>{
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
<nav className="navbar">
<div className="logo">
🏢 Company Operations Dashboard
</div>
<div className="nav-right">
{/* NOTIFICATION */}
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
<span className="badge">
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
notifications.length===0 ?
<p>
No notifications
</p>
:
notifications
.slice(0,8)
.map(item=>(
<div
key={item._id}
className={
item.isRead
?
"notification-item read"
:
"notification-item"
}
onClick={()=>
markRead(item._id)
}
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
className="profile-wrapper"
ref={profileRef}
>
<div
className="profile-btn"
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
<h4>
{
user?.name || "User"
}
</h4>
<p>
{
user?.role || "employee"
}
</p>
</div>
</div>
{
profileOpen &&
<div className="profile-dropdown">
<h3>
Profile
</h3>
<p>
<b>Name:</b>
{
user?.name
}
</p>
<p>
<b>Email:</b>
{
user?.email
}
</p>
<p>
<b>Role:</b>
{
user?.role
}
</p>
<p>
<b>Department:</b>
{
user?.department || "Not assigned"
}
</p>
<p>
<b>Employee ID:</b>
{
user?._id
}
</p>
</div>
}
</div>
</div>
</nav>
);
}
export default Navbar;