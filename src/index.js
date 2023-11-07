import "./css/base.css";

import { LocalStorageReader } from "./js/localStorage";

const lcReader = new LocalStorageReader('mydayapp-js');
const tasks = lcReader.getLocalSotageInfo();
const input = document.getElementsByClassName('new-todo')[0];
const tasksList = document.getElementsByClassName('todo-list')[0];
const mainSection = document.getElementsByClassName('main')[0];
const footer = document.getElementsByClassName('footer')[0];
const count = document.getElementsByClassName('todo-count')[0];
const clearButton = document.getElementsByClassName('clear-completed')[0];

toggleMainFooter();
renderTasks();
renderCount();
renderClear();

input.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        if(!(input.value === "")){
            createTask(input.value.trim());
            input.value = "";
        }
    }
})

clearButton.addEventListener('click',()=>{
    let uncompletedTasks = tasks.filter((t)=>(t.completed));
    uncompletedTasks.forEach((t)=>{
        tasks.splice(tasks.indexOf(t),1);
    })
    lcReader.updateLocalStorage(tasks)
    renderTasks();
    renderCount();
    renderClear();
    toggleMainFooter();
})

function toggleMainFooter(){
    if(tasks.length === 0){
        mainSection.style = 'display: none;'
        footer.style = 'display: none;'
        clearButton.style = 'display:none;'
    } else {
        mainSection.style = 'display: auto;'
        footer.style = 'display: auto;'
    }
}

function createTask(title){
    if(tasks.length > 0){
        let newId = parseInt(tasks[tasks.length-1].id) + 1;
        let newTask = {
            id:newId.toString(),
            title:title,
            completed:false
        }
        tasks.push(newTask);
        lcReader.updateLocalStorage(tasks);
        renderTasks();
        renderCount();
        toggleMainFooter();
    } else {
        let newTask = {
            id:"1",
            title:title,
            completed:false
        }
        tasks.push(newTask);
        lcReader.updateLocalStorage(tasks);
        renderTasks();
        renderCount();
        toggleMainFooter();
    }
}

function completeTask(task, li){
    task.completed = !task.completed;
    li.className = task.completed? "completed" : "";
    lcReader.updateLocalStorage(tasks);
    renderCount();
    renderClear();
}

function deleteTask(task){
    let index = tasks.indexOf(task);
    tasks.splice(index,1);
    lcReader.updateLocalStorage(tasks);
    renderTasks();
    renderCount();
    renderClear();
    toggleMainFooter();
}

function editTask(task, title){
    task.title = title;
    lcReader.updateLocalStorage(tasks);
    renderTasks();
}

function editMode(li){
    li.className = "editing";
}

function exitEditMode(li){
    li.className = "";
}

function readKey(e,li,task,edit){
    if(e.key === 'Escape'){
        exitEditMode(li);
    } else if(e.key === 'Enter'){
        if(!(edit.value === "")){
            editTask(task,edit.value.trim());
        }
    }
}

function renderClear(){
    let itemsLeft = tasks.filter((t)=>(t.completed))
    if(itemsLeft.length===0){
        clearButton.style = 'display:none;'
    } else {
        clearButton.style = 'display:auto;'
    }
}

function renderCount(){
    let itemsLeft = tasks.filter((t)=>(!t.completed))
    count.innerHTML = `<strong>${itemsLeft.length}</strong>${itemsLeft.length>1? " items": " item"} left`
}

function renderTasks(){
    tasksList.innerHTML = "";
    tasks.forEach((task)=>{
        let newLi = document.createElement('li');
        let newDiv = document.createElement('div');
        let newCheck = document.createElement('input');
        let newLabel = document.createElement('label');
        let newButton = document.createElement('button');
        let newEdit = document.createElement('input');
  
        newLi.className = task.completed? "completed" : "";
  
        newDiv.className = "view";
  
        newCheck.className = "toggle";
        newCheck.type = "checkbox";
        newCheck.checked = task.completed? 1:0;
        newCheck.addEventListener('click',()=>{completeTask(task, newLi)})
  
        newButton.className = "destroy";
        newButton.addEventListener('click',()=>{deleteTask(task)})
  
        newEdit.className = "edit";
        newEdit.addEventListener('keyup',(event)=>{readKey(event,newLi,task,newEdit)})
  
        newLabel.innerText = task.title;
        newLabel.addEventListener('dblclick',()=>{editMode(newLi)})
  
        newEdit.value = task.title;
  
        newDiv.appendChild(newCheck);
        newDiv.appendChild(newLabel);
        newDiv.appendChild(newButton);
  
        newLi.appendChild(newDiv)
        newLi.appendChild(newEdit)
  
        tasksList.appendChild(newLi)
    })
  }
