//Variabler

//To do- lista(ul)
let todoUl = document.querySelector("#todoUl");
//Array med to do's
let todoList = [];
//Knapp för att lägga till to do
let addTodoBtn = document.querySelector("#addTodoBtn");

//Funktioner

//Funktion för att lägga till to do
let addTodoFunction = () => {
  //Values från inputs
  let activity = document.querySelector("#activity")?.value;
  let description = document.querySelector("#description")?.value;
  let expirationDate = document.querySelector("#expirationDate")?.value;
  let category = document.querySelector("#category")?.value;

  if (activity) {
    localStorage.setItem("activity", `${activity}`);
  }
  if (description) {
    localStorage.setItem("description", `${description}`);
  }
  if (expirationDate) {
    localStorage.setItem("expirationDate", `${expirationDate}`);
  }
  if (category) {
    localStorage.setItem("category", `${category}`);
  }
};
addTodoBtn.addEventListener("click", () => {
  addTodoFunction();
});
