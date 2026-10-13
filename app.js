// Arrays are the main data structure in this demo.
const STORAGE_KEY = "classtrack-array-demo-v1";
let students = [];
let attendance = [];
const $ = id => document.getElementById(id);
const now = new Date();
const localDate = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
$("attendanceDate").value = localDate;

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && Array.isArray(saved.students) && Array.isArray(saved.attendance)) {
      students = saved.students; attendance = saved.attendance;
    } else {
      students = [{id:"STU-001",name:"Ama Mensah"},{id:"STU-002",name:"Kojo Asare"},{id:"STU-003",name:"Efua Owusu"}];
      attendance = [{studentId:"STU-001",date:localDate,status:"present"},{studentId:"STU-002",date:localDate,status:"absent"}];
      saveData();
    }
  } catch { students = []; attendance = []; }
}
function saveData(){localStorage.setItem(STORAGE_KEY,JSON.stringify({students,attendance}));}
function getRecord(studentId,date){return attendance.find(r=>r.studentId===studentId&&r.date===date);}
function setAttendance(studentId,status){
  const date=$("attendanceDate").value||localDate, existing=getRecord(studentId,date);
  if(existing) existing.status=status; else attendance.push({studentId,date,status});
  saveData();render();
}
function render(){
  const date=$("attendanceDate").value||localDate, query=$("searchInput").value.trim().toLowerCase(), filter=$("filterSelect").value;
  $("totalCount").textContent=students.length;
  $("presentCount").textContent=students.filter(s=>getRecord(s.id,date)?.status==="present").length;
  $("absentCount").textContent=students.filter(s=>getRecord(s.id,date)?.status==="absent").length;
  const visible=students.filter(s=>{
    const status=getRecord(s.id,date)?.status||"unmarked";
    return `${s.name} ${s.id}`.toLowerCase().includes(query)&&(filter==="all"||filter===status);
  });
  const tbody=$("studentTable");tbody.replaceChildren();
  $("emptyState").style.display=visible.length?"none":"block";
  $("emptyState").textContent=students.length?"No students match your search or filter.":"No students yet. Add a student above to begin.";
  visible.forEach(student=>{
    const status=getRecord(student.id,date)?.status||"unmarked",tr=document.createElement("tr");
    const id=document.createElement("td");id.textContent=student.id;
    const name=document.createElement("td");name.textContent=student.name;
    const statusCell=document.createElement("td"),badge=document.createElement("span");
    badge.className=`status ${status}`;badge.textContent=status[0].toUpperCase()+status.slice(1);statusCell.append(badge);
    const actions=document.createElement("td");actions.className="actions";
    [["Present","present"],["Absent","absent"]].forEach(([label,value])=>{
      const b=document.createElement("button");b.className="mini";b.type="button";b.textContent=label;
      b.addEventListener("click",()=>setAttendance(student.id,value));actions.append(b);
    });
    const removeCell=document.createElement("td"),remove=document.createElement("button");
    remove.className="mini delete";remove.type="button";remove.textContent="Remove";
    remove.addEventListener("click",()=>removeStudent(student.id));removeCell.append(remove);
    tr.append(id,name,statusCell,actions,removeCell);tbody.append(tr);
  });
}
function removeStudent(id){
  const student=students.find(s=>s.id===id);
  if(!student||!confirm(`Remove ${student.name} and their attendance records?`))return;
  students=students.filter(s=>s.id!==id);attendance=attendance.filter(r=>r.studentId!==id);saveData();render();
}
$("studentForm").addEventListener("submit",e=>{
  e.preventDefault();const name=$("studentName").value.trim(),id=$("studentId").value.trim();
  if(!name||!id)return;
  if(students.some(s=>s.id.toLowerCase()===id.toLowerCase())){$("formMessage").textContent="That student ID already exists. Use a unique ID.";return;}
  students.push({id,name});saveData();render();$("studentForm").reset();$("formMessage").textContent=`${name} was added successfully.`;
});
$("attendanceDate").addEventListener("change",render);
$("searchInput").addEventListener("input",render);
$("filterSelect").addEventListener("change",render);
$("exportButton").addEventListener("click",()=>{
  const date=$("attendanceDate").value||localDate,rows=[["Student ID","Student Name","Date","Status"]];
  students.forEach(s=>rows.push([s.id,s.name,date,getRecord(s.id,date)?.status||"unmarked"]));
  const csv=rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\r\n");
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"}),link=document.createElement("a");
  link.href=URL.createObjectURL(blob);link.download=`attendance-${date}.csv`;link.click();URL.revokeObjectURL(link.href);
});
loadData();render();
