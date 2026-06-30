import { useEffect,useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
function Projects(){
const [projects,setProjects]=useState([]);
const [search,setSearch]=useState("");
const [showModal,setShowModal]=useState(false);
const [editingId,setEditingId]=useState(null);
const user =
JSON.parse(localStorage.getItem("user"));
const isAdmin =
user?.role==="admin";
const [formData,setFormData]=useState({
name:"",
team:"",
lead:"",
progress:"",
status:"Planning"
});
const fetchProjects=async()=>{
const res =
await API.get("/projects");
setProjects(res.data);
};
useEffect(()=>{
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
if(editingId){
await API.put(
`/projects/${editingId}`,
formData
);
}
else{
await API.post(
"/projects",
formData
);
}
fetchProjects();
setShowModal(false);
};
const handleDelete=async(id)=>{
await API.delete(
`/projects/${id}`
);
fetchProjects();
};
const filteredProjects=
projects.filter(project=>
project.name
.toLowerCase()
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
<h2>
📁 Projects
</h2>
{
isAdmin &&
<button
className="crm-btn"
onClick={()=>setShowModal(true)}
>
+ Add Project
</button>
}
</div>
<input
className="modern-search"
placeholder="Search project..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>
<div className="table-card">
<table>
<thead>
<tr>
<th>#</th>
<th>Name</th>
<th>Team</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{
filteredProjects.map((p,index)=>(
<tr key={p._id}>
<td>
{index+1}
</td>
<td>
{p.name}
</td>
<td>
{p.team}
</td>
<td>
{p.status}
</td>
<td>
<button
className="icon-btn"
>
👁
</button>
{
isAdmin &&
<>
<button
className="icon-btn"
onClick={()=>{
setEditingId(p._id);
setFormData(p);
setShowModal(true);
}}
>
✎
</button>
<button
className="delete-icon-btn"
onClick={()=>handleDelete(p._id)}
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
</div>
</div>
</>
);
}
export default Projects;