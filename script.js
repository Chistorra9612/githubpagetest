const validUser = {
    username: "admin",
    password: "1234"
};

const tasks = []; // Para almacenar las tareas

// Función de inicio de sesión
document.getElementById("login-btn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
    
    if (username === validUser.username && password === validUser.password) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("app-section").style.display = "block";
        document.getElementById("user-name").innerText = username;
    } else {
        errorMessage.innerText = "Credenciales inválidas. Intenta de nuevo.";
    }
});

// Agregar tarea
document.getElementById("add-task-btn").addEventListener("click", function() {
    const taskId = document.getElementById("task-id").value;
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const startDate = document.getElementById("start-date").value;
    const clientName = document.getElementById("client-name").value;
    const projectId = document.getElementById("project-id").value;
    const comments = document.getElementById("comments").value;
    const status = document.getElementById("status").value;

    // Validaciones
    if (!taskId || !taskTitle || !taskDescription || !startDate || !clientName || !projectId) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Crear tarea y agregarla al array
    const task = {
        taskId,
        taskTitle,
        taskDescription,
        startDate,
        clientName,
        projectId,
        comments,
        status
    };
    tasks.push(task);
    displayTasks();  // Actualizar la tabla
    resetTaskForm();
});

// Mostrar tareas en la tabla
function displayTasks() {
    const tasksTableBody = document.querySelector("#tasks-table tbody");
    tasksTableBody.innerHTML = "";  // Limpiar tabla antes de agregar nuevas filas
    tasks.forEach((task, index) => {
        const row = tasksTableBody.insertRow();
        row.addEventListener("dblclick", function() {
            editTask(index);  // Editar tarea al hacer doble clic
        });
        row.innerHTML = `
            <td>${task.taskId}</td>
            <td>${task.taskTitle}</td>
            <td>${task.taskDescription}</td>
            <td>${task.startDate}</td>
            <td>${task.clientName}</td>
            <td>${task.projectId}</td>
            <td>${task.comments}</td>
            <td>${task.status}</td>
        `;
    });
}

// Editar tarea
function editTask(index) {
    const task = tasks[index];
    document.getElementById("update-task-id").value = task.taskId;
    document.getElementById("update-task-title").value = task.taskTitle;
    document.getElementById("update-task-description").value = task.taskDescription;
    document.getElementById("update-start-date").value = task.startDate;
    document.getElementById("update-client-name").value = task.clientName;
    document.getElementById("update-project-id").value = task.projectId;
    document.getElementById("update-comments").value = task.comments;
    document.getElementById("update-status").value = task.status;

    document.getElementById("update-task-btn").onclick = function() {
        updateTask(index);  // Llamar a la función de actualización
    };
}

// Actualizar tarea
function updateTask(index) {
    const updatedComments = document.getElementById("update-comments").value;
    const newComment = updatedComments.trim();
    if (newComment) {
        const currentDate = new Date().toLocaleString();
        tasks[index].comments = `${currentDate} - ${newComment}\n${tasks[index].comments}`;
    }

    tasks[index].taskTitle = document.getElementById("update-task-title").value;
    tasks[index].taskDescription = document.getElementById("update-task-description").value;
    tasks[index].startDate = document.getElementById("update-start-date").value;
    tasks[index].clientName = document.getElementById("update-client-name").value;
    tasks[index].projectId = document.getElementById("update-project-id").value;
    tasks[index].status = document.getElementById("update-status").value;

    displayTasks();  // Actualizar la tabla
    resetTaskForm();  // Limpiar el formulario
}

// Resetear el formulario
function resetTaskForm() {
    document.getElementById("task-id").value = '';
    document.getElementById("task-title").value = '';
    document.getElementById("task-description").value = '';
    document.getElementById("start-date").value = '';
    document.getElementById("client-name").value = '';
    document.getElementById("project-id").value = '';
    document.getElementById("comments").value = '';
    document.getElementById("status").value = 'Por hacer';
}

// Filtro por estatus
document.getElementById("status-filter").addEventListener("change", function() {
    const statusFilter = this.value;
    const filteredTasks = statusFilter === "Todos" ? tasks : tasks.filter(task => task.status === statusFilter);
    displayFilteredTasks(filteredTasks);
});

// Mostrar tareas filtradas
function displayFilteredTasks(filteredTasks) {
    const tasksTableBody = document.querySelector("#tasks-table tbody");
    tasksTableBody.innerHTML = "";
    filteredTasks.forEach(task => {
        const row = tasksTableBody.insertRow();
        row.innerHTML = `
            <td>${task.taskId}</td>
            <td>${task.taskTitle}</td>
            <td>${task.taskDescription}</td>
            <td>${task.startDate}</td>
            <td>${task.clientName}</td>
            <td>${task.projectId}</td>
            <td>${task.comments}</td>
            <td>${task.status}</td>
        `;
    });
}