const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearButton = document.getElementById("clearButton");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }

        const content = document.createElement("div");
        content.classList.add("task-content");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const text = document.createElement("span");
        text.classList.add("task-text");
        text.textContent = task.text;

        content.appendChild(checkbox);
        content.appendChild(text);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "Excluir";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.appendChild(content);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateCounter();
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Digite uma tarefa primeiro!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

function updateCounter() {
    const pendingTasks = tasks.filter(task => !task.completed).length;

    if (pendingTasks === 1) {
        counter.textContent = "1 tarefa pendente";
    } else {
        counter.textContent = `${pendingTasks} tarefas pendentes`;
    }
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    renderTasks();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

clearButton.addEventListener("click", clearCompleted);

renderTasks();
