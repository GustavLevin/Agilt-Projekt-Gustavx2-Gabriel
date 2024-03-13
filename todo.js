//Variabler

const container = document.querySelector("#container");
//To do- lista(ul)
const todoUl = document.querySelector("#todoUl");
//Array med to do's
let userId = localStorage.getItem("userId") || crypto.randomUUID();
localStorage.setItem("userId", userId);
let todoList = JSON.parse(localStorage.getItem(`todoList_${userId}`)) || [];
//Knapp för att lägga till todo
const addTodoBtn = document.querySelector("#addTodoBtn");
//Knapp för att skriva ut listan
const renderListButton = document.querySelector("#renderListButton");
//Knapp för att sortera efter deadline
const sortByDeadlineButton = document.querySelector("#sort-deadline");
//Knapp för att sortera efter tid att göra
const sortByTimeButton = document.querySelector("#sort-time");
//Riktning för sortering(ascending/descending)
let descending = true;




//Funktioner

//Funktion för att hämta värden från input
const getFormInputValues = () => {
  //Values från inputs
  let activity = document.querySelector("#activity")?.value;
  let description = document.querySelector("#description")?.value;
  let expirationDate = document.querySelector("#expirationDate")?.value;
  let category = document.querySelector("#category")?.value;
  let timeToComplete = document.querySelector("#time-to-complete")?.value;
  let todoId = self.crypto.randomUUID();
  //Returnerar värden
  return {
    activity,
    description,
    expirationDate,
    category,
    timeToComplete,
    todoId,
    isCompleted: false,
  };
};

//Funktion för att lägga till todo i array
const addTodoFunction = () => {
  //Objekt med input values från 'getFormInputValues'
  const todo = getFormInputValues();

  //Lägg till objekt med input values i todo lista
  todoList.push(todo);
  //Uppdatera localStorage
  localStorage.setItem(`todoList_${userId}`, JSON.stringify(todoList));
};

//Funktion för att filtrera todo lista
const getFilteredTodoList = (filters) => {
  const filteredTodoList = todoList.filter((todo) => {
    return filters.includes(todo.category);
  });

  return filteredTodoList;
};

//Funktion för att lägga till 'option' i 'select'
const selectOption = (option, value, text, select) => {
  option.value = value;
  option.text = text;
  select.add(option);
};

//Funktion för att skapa inputs när man trycker 'edit'
const createInputsWithClassNames = (todo) => {
  const activityInput = document.createElement("input");
  activityInput.required = true;
  activityInput.classList.add("activityInput");

  const descriptionInput = document.createElement("input");
  descriptionInput.classList.add("descriptionInput");

  const categoryInput = document.createElement("select");
  categoryInput.required = true;
  categoryInput.classList.add("categoryInput");
  //Select options för categoryInput
  const category1 = document.createElement("option");
  selectOption(category1, "work", "Work", categoryInput);
  const category2 = document.createElement("option");
  selectOption(category2, "school", "School", categoryInput);
  const category3 = document.createElement("option");
  selectOption(category3, "health", "Health", categoryInput);
  const category4 = document.createElement("option");
  selectOption(category4, "household", "Household", categoryInput);
  const category5 = document.createElement("option");
  selectOption(category5, "economy", "Economy", categoryInput);
  const category6 = document.createElement("option");
  selectOption(category6, "recreation", "Recreation", categoryInput);

  const expirationDateInput = document.createElement("input");
  expirationDateInput.setAttribute("type", "date");
  expirationDateInput.required = true;
  expirationDateInput.classList.add("expirationDateInput");

  const timeToCompleteInput = document.createElement("select");
  timeToCompleteInput.required = true;
  timeToCompleteInput.classList.add("timeToCompleteInput");
  //Select options för timeToCompleteInput
  const time1 = document.createElement("option");
  selectOption(time1, "0", "Less than 1h", timeToCompleteInput);
  const time2 = document.createElement("option");
  selectOption(time2, "1h", "1h", timeToCompleteInput);
  const time3 = document.createElement("option");
  selectOption(time3, "2h", "2h", timeToCompleteInput);
  const time4 = document.createElement("option");
  selectOption(time4, "3h", "3h", timeToCompleteInput);
  const time5 = document.createElement("option");
  selectOption(time5, "4h+", "4h+", timeToCompleteInput);

  //Visar nuvarande värden i inputs
  activityInput.value = todo.activity;
  descriptionInput.value = todo.description;
  expirationDateInput.value = todo.expirationDate;
  categoryInput.value = todo.category;
  timeToCompleteInput.value = todo.timeToComplete;
  //Returnerar uppdaterade värden
  return {
    activityInput,
    descriptionInput,
    expirationDateInput,
    categoryInput,
    timeToCompleteInput,
  };
};

//Funktion för att spara uppdaterade värden
const saveEditedValues = (todo) => {
  const activityInput = document.querySelector(
    ".listItem .activityInput"
  )?.value;
  const descriptionInput = document.querySelector(
    ".listItem .descriptionInput"
  )?.value;
  const expirationDateInput = document.querySelector(
    ".listItem .expirationDateInput"
  )?.value;
  const categoryInput = document.querySelector(
    ".listItem .categoryInput"
  )?.value;
  const timeToCompleteInput = document.querySelector(
    ".listItem .timeToCompleteInput"
  )?.value;

  //Sätter nya värden
  todo.activity = activityInput;
  todo.description = descriptionInput;
  todo.expirationDate = expirationDateInput;
  todo.category = categoryInput;
  todo.timeToComplete = timeToCompleteInput;

  //Uppdaterar localStorage
  localStorage.setItem(`todoList_${userId}`, JSON.stringify(todoList));
};

//Funktion för att skriva ut todo's
const renderTodoList = (filters) => {
  container.innerHTML = "";
  let ul = document.createElement("ul");
  container.append(ul);

  //Om det finns todo's i filtrerade array, skriv ut. Annars skriv ut hela todo
  const todoListToRender =
    filters && filters.length > 0 ? getFilteredTodoList(filters) : todoList;

  //forEach- loop för att skriva ut todos
  todoListToRender.forEach((todo, index) => {
    let li = document.createElement("li");
    const form = document.createElement("form");
    li.classList.add("listItem");

    //Om 'isEditing' = true, skapa inputs
    if (todo.isEditing) {
      const {
        activityInput,
        descriptionInput,
        categoryInput,
        expirationDateInput,
        timeToCompleteInput,
      } = createInputsWithClassNames(todo);
      const div = document.createElement("div");

      div.append(activityInput);
      div.append(descriptionInput);
      div.append(categoryInput);
      div.append(expirationDateInput);
      div.append(timeToCompleteInput);
      form.append(div);
      li.append(form);

      ul.append(li);
      //Annars skriv ut information
    } else {
      li.innerText = `Activity: ${todo.activity} Description: ${
        todo.description
      } 
      Category: ${todo.category} 
      Deadline: ${todo.expirationDate} Time to complete: ${todo.timeToComplete} 
      ${todo.isCompleted ? "Completed" : "Unfinished"}`;
      li.dataset.id = todo.id;
      ul.append(li);
      //Om todo 'isCompleted' = true, färga todo grön
      if (todo.isCompleted) {
        li.style.backgroundColor = "green";
      }
    }

    //Skapa upp knappar
    const buttonDiv = document.createElement("div");
    const completedBtn = document.createElement("button");
    completedBtn.innerText = "Completed";
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove Item";
    const editBtn = document.createElement("button");
    editBtn.innerText = todo.isEditing ? "Save" : "Edit";
    //Om 'isEditing' = true, 'Edit' knapp blir 'submit/save'
    if (todo.isEditing) {
      editBtn.setAttribute("type", "submit");
      form.append(buttonDiv);
      buttonDiv.append(editBtn);
    } else {
      li.append(buttonDiv);
      buttonDiv.append(completedBtn, deleteBtn, editBtn);
    }

    //Sätter 'isCompleted' = true
    completedBtn.addEventListener("click", () => {
      todo.isCompleted = true;

      if (todo.isCompleted) {
        li.style.backgroundColor = "green";
      }

      localStorage.setItem(`todoList_${userId}`, JSON.stringify(todoList));
    });

    //Knapp för att ta bort todo
    deleteBtn.addEventListener("click", () => {
      todoList.splice(index, 1);
      localStorage.setItem(`todoList_${userId}`, JSON.stringify(todoList));
      renderTodoList();
    });

    if (todo.isEditing) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        todo.isEditing = false;
        saveEditedValues(todo);

        renderTodoList();
      });
    } else {
      editBtn.addEventListener("click", () => {
        todo.isEditing = true;

        renderTodoList();
      });
    }
  });
};

//Funktion för att sortera efter deadline
const sortByExpirationDate = (array) => {
  if (descending) {
    array.sort((a, b) => a.expirationDate.localeCompare(b.expirationDate));
    descending = !descending;
  } else {
    array.sort((a, b) => b.expirationDate.localeCompare(a.expirationDate));
    descending = !descending;
  }
};

//Funktion för att sortera efter tid att göra
const sortByTimeToComplete = (array) => {
  if (!descending) {
    array.sort((a, b) => a.timeToComplete.localeCompare(b.timeToComplete));
    descending = !descending;
  } else {
    array.sort((a, b) => b.timeToComplete.localeCompare(a.timeToComplete));
    descending = !descending;
  }
};

//Filtrerar todo's
const getFilterValues = () => {
  let filterCategories = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  let filterValues = [];
  for (let i = 0; i < filterCategories.length; i++) {
    filterValues.push(filterCategories[i].value);
  }

  return filterValues;
};

addTodoBtn.addEventListener("click", () => {
  addTodoFunction();
  renderTodoList();
});
renderListButton.addEventListener("click", () => {
  sortByTimeToComplete(todoList);

  const filters = getFilterValues();
  renderTodoList(filters);
});
sortByDeadlineButton.addEventListener("click", () => {
  sortByExpirationDate(todoList);

  const filters = getFilterValues();
  renderTodoList(filters);
});
sortByTimeButton.addEventListener("click", () => {
  sortByTimeToComplete(todoList);

  const filters = getFilterValues();
  renderTodoList(filters);
});
renderTodoList();
