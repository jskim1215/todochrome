const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#work-form");
const subjectInput = document.querySelector("#subject-form");
const formatInput = document.querySelector("#format-form");
const toDoList = document.getElementById("todo-list");
const worktable = document.getElementById("work-columns");
const subjectDropdown=document.getElementById("subject-select")

const TODOS_KEY = "todos";

const savedToDos = localStorage.getItem(TODOS_KEY);

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event) {
    const tr = event.target.parentElement.parentElement;
    tr.remove();
    const deleteTargetSubject = subjectDropdown.querySelector(`[id="${tr.id}"]`);
    deleteTargetSubject.remove();
    toDos = toDos.filter((targetId) => targetId.id !== parseInt(tr.id));
    saveToDos();
}


function paintToDo(newToDo) {
    const tr = document.createElement("tr");
    tr.id = newToDo.id;
    const th1 = document.createElement("th");
    th1.innerText = newToDo.text;
    const th2 = document.createElement("th");
    th2.innerText = newToDo.subject;
    const th3 = document.createElement("th");
    th3.innerText = newToDo.format;
    const th4 = document.createElement("th");
    th4.innerText = newToDo.total_usage_time;
    const th5 = document.createElement("th");
    const button = document.createElement("button");
    button.innerText = "❌";
    th5.appendChild(button);
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    worktable.appendChild(tr);
    button.addEventListener("click", deleteTodo);

    const option = document.createElement("option");
    option.id = newToDo.id;
    option.innerText = newToDo.text;
    subjectDropdown.appendChild(option);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    const newSubject = subjectInput.value;
    const newFormat = formatInput.value;
    toDoInput.value = "";
    subjectInput.value = "";
    formatInput.value = "";
    const newTodoObj = {
        text: newToDo,
        subject: newSubject,
        format: newFormat,
        id: Date.now(),
        total_usage_time: "00:00:00",
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}


toDoForm.addEventListener("submit", handleToDoSubmit);


if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

