//Variabler

let container = document.querySelector("#container");
//To do- lista(ul)
let todoUl = document.querySelector("#todoUl");
//Array med to do's
let todoList = [];
//Knapp för att lägga till to do
let addTodoBtn = document.querySelector("#addTodoBtn");

let todoId = 0;
//Funktioner

//Funktion för att lägga till to do
let addTodoFunction = () => {
  container.innerHTML = ``;
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
  //Lägg till todo lista i local storage
  localStorage.setItem("todoList", `${todoList}`);
  todoId++;

  let ul = document.createElement("ul");
  container.append(ul);

  let storedTodo = localStorage.getItem("todoList");

  todoList.forEach((todo, index) => {
    let li = document.createElement("li");
    li.innerText = `${todo.activity} ${todo.description} ${todo.expirationDate} ${todo.category}`;
    li.dataset.id = todo.id;
    ul.append(li);

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = `Remove Item`;
    li.append(deleteBtn);
    deleteBtn.addEventListener("click", () => {
      delete todoList[index];
      li.remove();
    });
  });
  console.log(storedTodo);
};

addTodoBtn.addEventListener("click", () => {
  addTodoFunction();
});
