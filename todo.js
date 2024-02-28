//Variabler

let container = document.querySelector("#container");
//To do- lista(ul)
let todoUl = document.querySelector("#todoUl");
//Array med to do's
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
//Knapp för att lägga till to do
let addTodoBtn = document.querySelector("#addTodoBtn");
//Knapp för att skriva ut listan
let renderListButton = document.querySelector("#renderListButton");

let todoId = 0;
//Funktioner

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
  localStorage.setItem("todoList", `${filteredTodo}`);
  //+1 på todoId
  todoId++;
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

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove Item";
    li.append(deleteBtn);

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    li.append(checkbox);
    deleteBtn.addEventListener("click", () => {
      todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      renderTodoList();
    });
  });
};

addTodoBtn.addEventListener("click", () => {
  addTodoFunction();
  renderTodoList();
});
renderListButton.addEventListener("click", () => {
  renderTodoList();
});
renderTodoList();
