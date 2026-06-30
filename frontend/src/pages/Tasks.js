import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
function Tasks() {
const [tasks,setTasks]=useState([]);
const [employees,setEmployees]=useState([]);
const [projects,setProjects]=useState([]);
const [search,setSearch]=useState("");
const [showModal,setShowModal]=useState(false);
const [editingId,setEditingId]=useState(null);
const user =
JSON.parse(localStorage.getItem("user"));
const isAdmin =
user?.role==="admin";
const [formData,setFormData]=useState({
title:"",
description:"",
assignedTo:"",
projectId:"",
priority:"Medium",
status:"Pending"
});
const fetchTasks=async()=>{
try{
const res =
await API.get("/tasks");
setTasks(res.data);
}catch(err){
console.log(err);
}
};
const fetchEmployees=async()=>{
try{
const res =
await API.get("/employees");
setEmployees(res.data);
}catch(err){
console.log(err);
}
};
const fetchProjects=async()=>{
try{
const res =
await API.get("/projects");
setProjects(res.data);
}catch(err){
console.log(err);
}
};
useEffect(()=>{
fetchTasks();
fetchEmployees();
fetchProjects();
},[]);
const handleChange=(e)=>{
setFormData({
...formData,
[e.target.name]:
e.target.value
});
};
const handleSubmit=async()=>{
try{
if(editingId){
await API.put(
`/tasks/${editingId}`,
formData
);
}
else{
await API.post(
"/tasks",
formData
);
}
fetchTasks();
setShowModal(false);
setEditingId(null);
}catch(err){
console.log(err);
}
};
const handleEdit=(task)=>{
setEditingId(task._id);
setFormData({
title:task.title,
description:task.description,
assignedTo:
task.assignedTo?._id,
projectId:
task.projectId?._id,
priority:task.priority,
status:task.status
});
setShowModal(true);
};
const handleDelete=async(id)=>{
try{
await API.delete(
`/tasks/${id}`
);
fetchTasks();
}catch(err){
console.log(err);
}
};
const filteredTasks =
tasks.filter(task=>
task.title
?.toLowerCase()
.includes(
search.toLowerCase()
)
);
return(
<>
<Navbar/>
<div className="dashboard-body">
<Sidebar/>
<div className="dashboard-main">
<div className="crm-page-header">
<div className="page-title">
<div className="page-icon">
📋
</div>
<div>
<h2>
Tasks
</h2>
<p>
Create and track tasks
</p>
</div>
</div>
{
isAdmin &&
<button
className="crm-btn"
onClick={()=>setShowModal(true)}
>
+ Add Task
</button>
}
</div>
<input
className="modern-search"
placeholder="Search task..."
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
/>
<div className="table-card">
<table>
<thead>
<tr>
<th>#</th>
<th>Task</th>
<th>Project</th>
<th>Assigned</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{
filteredTasks.map((task,index)=>(
<tr key={task._id}>
<td>
{index+1}
</td>
<td>
{task.title}
</td>
<td>
{task.projectId?.name}
</td>
<td>
{task.assignedTo?.name}
</td>
<td>
<select
value={task.status}
disabled={isAdmin}
onChange={async(e)=>{
await API.put(
`/tasks/${task._id}`,
{
status:e.target.value
}
);
fetchTasks();
}}
>
<option>
Pending
</option>
<option>
In Progress
</option>
<option>
Completed
</option>
</select>
</td>
<td>
<button
className="icon-btn"
onClick={()=>alert(task.description)}
>
👁
</button>
{
isAdmin &&
<>
<button
className="icon-btn"
onClick={()=>handleEdit(task)}
>
✎
</button>
<button
className="delete-icon-btn"
onClick={()=>handleDelete(task._id)}
>
🗑
</button>
</>
}
</td>
</tr>
))
}
</tbody>
</table>
</div>
{
showModal && isAdmin &&
<div className="modal">
<div className="modal-content">
<h3>
Add Task
</h3>
<input
name="title"
placeholder="Title"
onChange={handleChange}
/>
<input
name="description"
placeholder="Description"
onChange={handleChange}
/>
<select
name="assignedTo"
onChange={handleChange}
>
<option>
Assign Employee
</option>
{
employees.map(emp=>(
<option value={emp._id}>
{emp.name}
</option>
))
}
</select>
<select
name="projectId"
onChange={handleChange}
>
<option>
Select Project
</option>
{
projects.map(project=>(
<option value={project._id}>
{project.name}
</option>
))
}
</select>
<button onClick={handleSubmit}>
Save
</button>
<button
onClick={()=>setShowModal(false)}
>
Cancel
</button>
</div>
</div>
}
</div>
</div>
</>
);
}
export default Tasks;