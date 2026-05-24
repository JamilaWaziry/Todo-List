let categories = [
{title:"Personal",img:"woman.PNG"},
{title:"Work",img:"working.png"},
{title:"Coding",img:"programming.png"},
{title:"Weekend",img:"weekend.png"},
{title:"Study",img:"books.png"}
];

let tasks = [];

let selectedCategory = categories[0];

// DOM
const categoriesContainer = document.querySelector(".categories");
const tasksContainer = document.querySelector(".tasks");

const categoryTitle = document.getElementById("category-title");
const categoryImg = document.getElementById("category-img");
const numTasks = document.getElementById("num-tasks");
const totalTasks = document.getElementById("total-tasks");

const homeScreen = document.querySelector(".home-screen");
const categoryScreen = document.querySelector(".category-screen");

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskWrapper = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const taskInput = document.getElementById("task-input");
const categorySelect = document.getElementById("category-select");

const backBtn = document.querySelector(".back-btn");

// local storage

function saveLocal(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getLocal(){
const data = JSON.parse(localStorage.getItem("tasks"));
if(data){
tasks = data;
}
}

// navigation

function showCategory(category){

selectedCategory = category;

homeScreen.style.display="none";
categoryScreen.style.display="block";

categoryTitle.innerText = category.title;
categoryImg.src = `images/${category.img}`;

renderTasks();
}

function goBack(){
homeScreen.style.display="block";
categoryScreen.style.display="none";
}

// rendr

function renderCategories(){

categoriesContainer.innerHTML="";

categories.forEach(category=>{

const categoryTasks = tasks.filter(
t => t.category === category.title
);

const div = document.createElement("div");

div.classList.add("category");

div.innerHTML=`
<img src="images/${category.img}">
<h3>${category.title}</h3>
<p>${categoryTasks.length} Tasks</p>
`;

div.onclick = ()=>showCategory(category);

categoriesContainer.appendChild(div);

});


totalTasks.innerText = tasks.length;
}


function renderTasks(){

tasksContainer.innerHTML="";

const categoryTasks = tasks.filter(
t => t.category === selectedCategory.title
);

numTasks.innerText = categoryTasks.length + " Tasks";

categoryTasks.forEach(task=>{

const div = document.createElement("div");
div.classList.add("task");

div.innerHTML=`
<input type="checkbox" ${task.completed ? "checked": ""}>
<span>${task.task}</span>
<button class="delete">Delete</button>
`;

div.querySelector("input").onchange = ()=>{
task.completed = !task.completed;
saveLocal();
};

div.querySelector(".delete").onclick = ()=>{

tasks = tasks.filter(t => t.id !== task.id);

saveLocal();
renderTasks();
renderCategories();
};

tasksContainer.appendChild(div);

});

}

// add task

function toggleAddForm(){
addTaskWrapper.classList.toggle("active");
blackBackdrop.classList.toggle("active");
}

function addTask(){

const task = taskInput.value;
const category = categorySelect.value;

if(task===""){
alert("Enter task");
return;
}

tasks.push({
id: Date.now(),
task,
category,
completed:false
});

taskInput.value="";

saveLocal();

toggleAddForm();


renderTasks();
renderCategories();
}

// EVENTS

addTaskBtn.onclick = toggleAddForm;
blackBackdrop.onclick = toggleAddForm;
cancelBtn.onclick = toggleAddForm;
addBtn.onclick = addTask;
backBtn.onclick = goBack;

// dropdown
categories.forEach(cat=>{
const option = document.createElement("option");
option.value = cat.title;
option.innerText = cat.title;
categorySelect.appendChild(option);
});

// INIT
getLocal();
renderCategories();