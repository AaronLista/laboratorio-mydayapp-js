import "./css/base.css";

import { LocalStorageReader } from "./js/localStorage";

const lcReader = new LocalStorageReader('mydayapp-js');
const tasks = lcReader.getLocalSotageInfo();
const tasksList = document.getElementById('todo-list');
const mainSection = document.getElementById('main');
const footer = document.getElementById('footer');

toggleMainFooter();
renderTasks();

function toggleMainFooter(){
    if(tasks.length === 0){
        mainSection.style = 'display: none;'
        footer.style = 'display: none;'
    } else {
        mainSection.style = 'display: auto;'
        footer.style = 'display: auto;'
    }
}

function renderTasks(){
    tasksList.innerHTML = ""
    tasks.forEach((task)=>{
        let newLi = document.createElement('li');
        let newDiv = document.createElement('div');
        let newCheck = document.createElement('input');
        let newLabel = document.createElement('label');
        let newButton = document.createElement('button');
        let newEdit = document.createElement('input');

        newDiv.className = "view";

        newCheck.className = "toggle";
        newCheck.type = "checkbox";
        newCheck.checked = task.completed? 1:0;
        newCheck.addEventListener('click',()=>{completeTask(task.id)})

        newButton.className = "destroy";
        newButton.addEventListener('click',()=>{deleteTask(task.id)})

        newEdit.className = "edit";

        newLabel.innerText = task.title;
        newLabel.addEventListener('dblclick',()=>{editMode(newLi,task.id)})

        newEdit.value = task.title;



        newDiv.appendChild(newCheck);
        newDiv.appendChild(newLabel);
        newDiv.appendChild(newButton);

        newLi.appendChild(newDiv)
        newLi.appendChild(newEdit)

        tasksList.appendChild(newLi)
    })
}

function completeTask(id){
    let task = tasks.find((t)=>(t.id === id));
    let index = tasks.indexOf(task);
    tasks[index].completed = !tasks[index].completed;
    lcReader.updateLocalStorage(tasks)
}

function deleteTask(id){
    let task = tasks.find((t)=>(t.id === id))
    let index = tasks.indexOf(task);
    tasks.splice(index,1);
    lcReader.updateLocalStorage(tasks)
    renderTasks()
}
