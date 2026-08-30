
const API_BASE='http://localhost:3001';
const tasks=document.getElementById('tasks');
const errorMessage=document.getElementById('error-message');
const listContainer=document.getElementById('list-container');
const taskForm=document.getElementById('create-task');
const token=localStorage.getItem('token');

const globalMessage=document.getElementById('global-message');

const getAllTasks= async ()=>{
    try {
        if(!token)
        {
            
        }
        const  response=await fetch(`${API_BASE}/tasks`,{
            method:'GET',
            headers:{

            'Authorization':`Bearer ${token}`
            }

        });
        const data=await response.json();

        if(!response.ok)
        {
            errorMessage.textContent=data.error||"Something worng";
            return;
        }
        console.log(typeof data);
        listContainer.innerHTML=data.tasks.map(task=>
            `<li>
            <h4>Title: ${task.title}</h4>
            <span><b>Task id:</b> ${task._id},</span> 
            <span><b>Details:</b> ${task.description===undefined?'N/A ':task.description}</span>,
            
            <span><b>Status: </b> ${task.completed? 'Completed':'Pending'}</span>  
            
            </li>`

        ).join(' ');

    }
    catch(err)
    {
        errorMessage.textContent="Could not reach the server!";
        console.log(err);
    }
}
taskForm.addEventListener('submit', async (event)=>{
    event.preventDefault();
    const taskTitle=document.getElementById('new-title').value.trim();
    const newDetails=document.getElementById('new-details').value.trim();
    const taskCreateMessage=document.getElementById('task-create-message');
    if(taskTitle===''){
        taskCreateMessage.textContent='Title can not be empty';

    }
    

    
    const response=await fetch(`${API_BASE}/tasks/create`,{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'title':taskTitle,'description':newDetails})

    })
    if(response.ok)
    {
        window.location.reload();
        taskCreateMessage.textContent=`Task ${title} created successfully`;

    }
    else{
        taskCreateMessage.textContent=`Something went wrong.}`
    }
})

const deleteTask=document.getElementById('delete-task');
deleteTask.addEventListener('submit',async (event)=>
{
    event.preventDefault();
    const taskId=document.getElementById('task-id').value.trim();
    if(taskId===''){
        globalMessage.textContent='Enter valid id';
        
    }
    try 
    {
        const respons=await fetch(`${API_BASE}/tasks/delete/${taskId}`,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${token}`
            }

        })
        globalMessage.textContent='Taske deleted successfully';
        document.location.reload();
        
    }
    catch (err){
        console.log(`Sometging Werong. Details`);
    }
    


})
getAllTasks();