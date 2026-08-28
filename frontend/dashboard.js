
const API_BASE='http://localhost:3001';
const tasks=document.getElementById('tasks');
const errorMessage=document.getElementById('error-message');

const getAllTasks= async ()=>{
    try {
        const token=localStorage.getItem('token');
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
        tasks.textContent=JSON.stringify(data);
    }
    catch(err)
    {
        errorMessage.textContent="Could not reach the server!";
        console.log(err);
    }
}
getAllTasks();