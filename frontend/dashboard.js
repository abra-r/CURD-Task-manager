
const API_BASE = 'http://localhost:3001';
const tasks = document.getElementById('tasks');
const errorMessage = document.getElementById('error-message');
const listContainer = document.getElementById('list-container');
const taskForm = document.getElementById('create-task');
const token = localStorage.getItem('token');

const globalMessage = document.getElementById('global-message');

const getAllTasks = async () => {
    try {
        if (!token) {
            window.location.href='login.html';
            return ;

        }
        const response = await fetch(`${API_BASE}/tasks`, {
            method: 'GET',
            headers: {

                'Authorization': `Bearer ${token}`
            }

        });
        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.error || "Something worng";
            return;
        }
        console.log(typeof data);
        listContainer.innerHTML = data.tasks.map(task =>
            `<li>
            <h4>Title: ${task.title}</h4>
            <span><b>Task id:</b> ${task._id},</span> 
            <span><b>Details:</b> ${task.description === undefined ? 'N/A ' : task.description}</span>,
            
            <span><b>Status: </b> ${task.completed ? 'Completed' : 'Pending'}</span>  
            
            </li>`

        ).join(' ');

    }
    catch (err) {
        errorMessage.textContent = "Could not reach the server!";
        console.log(err);
    }
}
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const taskTitle = document.getElementById('new-title').value.trim();
    const newDetails = document.getElementById('new-details').value.trim();
    const taskCreateMessage = document.getElementById('task-create-message');
    if (taskTitle === '') {
        taskCreateMessage.textContent = 'Title can not be empty';
        return;

    }



    const response = await fetch(`${API_BASE}/tasks/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'title': taskTitle, 'description': newDetails })

    })
    if (response.ok) {
        window.location.reload();

    }
    else {
        taskCreateMessage.textContent = `Something went wrong.}`
    }
})

const deleteTask = document.getElementById('delete-task');
deleteTask.addEventListener('submit', async (event) => {
    event.preventDefault();
    const taskId = document.getElementById('task-id').value.trim();
    if (taskId === '') {
        globalMessage.textContent = 'Enter valid id';
        return;

    }
    try {
        const response = await fetch(`${API_BASE}/tasks/delete/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
        const data=await response.json();
        if(!response.ok)
        {
            globalMessage.textContent=data.error||'Deleted Failed';
            return;

        }
        globalMessage.textContent = 'Taske deleted successfully';
        document.location.reload();

    }
    catch (err) {
        console.log(`Could not reach the server`);
        console.log(err);
    }



});

function updtaeTask() {
    const updateButton = document.getElementById('update-button');
    const idOfUpdateTask = document.getElementById('id-of-update-task');
    const updatedTitle = document.getElementById('updated-title');
    const updatedDatiles = document.getElementById('updated-details');
    const updatedCompleted = document.getElementById('updated-completed');
    updateButton.disabled = true;


    idOfUpdateTask.addEventListener('change', async (event) => {

        const currentId = document.getElementById('id-of-update-task').value.trim();
        try {
            if (!currentId) {
                updateButton.disabled = true;
                return;
            }
            const data = await getTaskByid(currentId);

            updatedTitle.value = data.task.title;
            updatedDatiles.value = data.task.description;
            updatedCompleted.checked = data.task.completed;
            console.log(data);
            updateButton.disabled = false;


        }
        catch (err) {
            globalMessage.textContent = 'The task id is not valid';

        }


    })

    updateButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const cruledTaskId = document.getElementById('id-of-update-task').value;
        try {
            const response = await fetch(`${API_BASE}/tasks/edit/${cruledTaskId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'title': updatedTitle.value,
                    'description': updatedDatiles.value,
                    'completed': updatedCompleted.checked
                })

            })
            const data=await response.json();
            if(!response.ok)
            {
                globalMessage.textContent=data.error||'Update failed';
                return;
            }
            window.location.reload();
        }
        catch (err) {
            console.log(`Could not reach the server`);
            console.log(err);

        }
    })
}

async function getTaskByid(id) {
    console.log(id);
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`

        }
    })
    if (!response.ok) {
        throw new Error('Failed to fetch task with thos id');
    }
    return await response.json();


}

const logoutButton=document.getElementById('logout-button');
logoutButton.addEventListener('click',async(event)=>{
    localStorage.removeItem('token');
    window.location.reload();
})
updtaeTask();
getAllTasks();