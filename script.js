// adds task in html format
function addTask(object) {
    let li = document.createElement("li");
    let input = document.createElement("input");
    let span = document.createElement("span");
    let button = document.createElement("button");
    input.type = "checkbox";
    input.addEventListener("change", function () {
        updateCheckboxStatus(li);
    });
    span.className = "task";
    span.innerText = object.task;
    if (object.finished) {
        input.checked = true;
        span.classList.add("task-finished");
    }
    button.className = "delete-btn";
    button.innerText = "x";
    button.addEventListener("click", function () {
        removeTask(li);
    })
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
}

// updates tasks in taskList
function updateTaskList() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

// creates a new task
function createTask(task) {
    let object = {
        task: task,
        finished: false
    };
    addTask(object);
    taskList.push(object);
    updateTaskList();
}

// updates checkbox status
function updateCheckboxStatus(element){
    let span = element.querySelector("span");
    let finished = span.classList.contains("task-finished");
    if (!finished) {
        span.classList.add("task-finished");
    } else {
        span.classList.remove("task-finished")
    }
    taskList.forEach(function (object) {
        if (object.task === span.innerText) {
            object.finished = !finished;
        }
    });
    updateTaskList();
}

// removes a task
function removeTask(element) {
    let task = element.querySelector("span").innerText;
    list.removeChild(element);
    taskList = taskList.filter(obj => obj.task !== task);
    updateTaskList();
}

const list = document.getElementById("task-list");

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
taskList.forEach((object) => addTask(object));

document.getElementById("add-task-button").addEventListener("click", function () {
    let inputField = document.getElementById("input-task");
    if (inputField.value) {
        createTask(inputField.value)
        inputField.value = "";
    }
});