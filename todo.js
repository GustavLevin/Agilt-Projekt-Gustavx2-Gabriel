//Variabler
let container = document.querySelector("#container");
let completedContainer = document.querySelector("#completedContainer"); // Container for completed tasks
let userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);
let todoList = JSON.parse(localStorage.getItem(`todoList_${userId}`)) || [];
let completedList = JSON.parse(localStorage.getItem(`completedList_${userId}`)) || [];
let addTodoBtn = document.querySelector("#addTodoBtn");
let renderListButton = document.querySelector("#renderListButton");

let todoId = 0;

//Funktion för att lägga till to do
let addTodoFunction = () => {
  //Values från inputs
  let activity = document.querySelector("#activity")?.value;
  let description = document.querySelector("#description")?.value;
  let expirationDate = document.querySelector("#expirationDate")?.value;
  let category = document.querySelector("#category")?.value;

  //Objekt med input values
  let valuesObject = {
    activity: `${activity}`,
    description: `${description}`,
    expirationDate: `${expirationDate}`,
    category: `${category}`,
    id: `${todoId}`,
  };
  //Lägg till objekt med input values i todo lista
  todoList.push(valuesObject);
  //Lägg till filtrerad todo lista i local storage
  let filteredTodo = JSON.stringify(todoList.filter((item) => item !== true));
  localStorage.setItem(`todoList_${userId}`, `${filteredTodo}`);
  //+1 på todoId
  todoId++;
};

//Funktion för att markera en to do som komplett
let completeTodoItem = (todo) => {
  // Flytta från aktiv lista till avslutad lista
  let index = todoList.findIndex(item => item.id === todo.id);
  todoList.splice(index, 1);
  completedList.push(todo);

  // Uppdatera local storage
  localStorage.setItem(`todoList_${userId}`, JSON.stringify(todoList));
  localStorage.setItem(`completedList_${userId}`, JSON.stringify(completedList));

  // Uppdatera UI
  renderTodoList();
  renderCompletedList();
};

//Funktion för att skriva ut todo lista
let renderTodoList = () => {
  container.innerHTML = "";
  let ul = document.createElement("ul");
  container.append(ul);

  todoList.forEach((todo, index) => {
    let li = document.createElement("li");
    li.innerText = `${todo.activity} ${todo.description} ${todo.expirationDate} ${todo.category}`;
    li.dataset.id = todo.id;
    ul.append(li);

    let completeBtn = document.createElement("button");
    completeBtn.innerText = "Completed"
    li.append(completeBtn);

    completeBtn.addEventListener("click", () => {
      completeTodoItem(todo);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove Item";
    li.append(deleteBtn);
    
    deleteBtn.addEventListener("click", () => {
      todoList.splice(index, 1);
      localStorage.setItem(`todoList_${userId}`, JSON.stringify(todoList));
      renderTodoList();
    });
  });
};

// Funktion för att skriva ut den avklarade listan
let renderCompletedList = () => {
  completedContainer.innerHTML = "";
  let ul = document.createElement("ul");
  completedContainer.append(ul);

  completedList.forEach((todo) => {
    let li = document.createElement("li");
    li.innerText = `${todo.activity} ${todo.description} ${todo.expirationDate} ${todo.category}`;
    ul.appendChild(li);
  });
};

addTodoBtn.addEventListener("click", () => {
  addTodoFunction();
  renderTodoList();
});
renderListButton.addEventListener("click", () => {
  renderTodoList();
  renderCompletedList(); 
});
renderTodoList();
renderCompletedList(); 
