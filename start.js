// Importera funktionen getData för att hämta data från en URL
let getData = async (URL) => {
    let response = await fetch(URL);
    let json = await response.json();
    return json;
}

// Retrieve the user object from local storage
let user = JSON.parse(localStorage.getItem('users'));
if (user) {
    let welcomeMessage = document.getElementById('welcomeMessage');
    let header = document.getElementById('header');
    let todoOrHabits = document.getElementById('todoOrHabits');
    let weatherBtn = document.createElement('button');
    weatherBtn.textContent = "Weather";

    window.addEventListener("load", async () => {
     
        welcomeMessage.textContent = `Hello ${user[0].username}`;
        let quote = await getData("https://api.quotable.io/quotes/random");
        let quoteText = document.createElement("p");
        quoteText.innerText = `${quote[0].content} - ${quote[0].author}`;
        welcomeMessage.append(quoteText);
    });

    // Retrieve the userId from the user object
    let userId = user.id;

    // After successful login
    let todoListButton = document.createElement('button');
    todoListButton.classList.add('todoBtn')
    todoListButton.textContent = 'Go to Todo List';
    todoListButton.addEventListener('click', () => {
        localStorage.setItem('userId', userId); 
        window.location.href = 'todo.html'; 
    });

    let habitsButton = document.createElement('button');
    habitsButton.classList.add('habitBtn')
    habitsButton.textContent = 'Go to Habits';
    habitsButton.addEventListener('click', () => {
        localStorage.setItem('userId', userId); 
        window.location.href = 'index-3.html'; 
    });

    todoOrHabits.append(todoListButton);
    todoOrHabits.append(habitsButton);
    header.append(weatherBtn);

    // Event listener for logout button
    logoutButton.addEventListener("click" ,() => {
        window.location.href = 'index.html';
    });

    // Event listener for weather button
    weatherBtn.addEventListener("click" ,() => {
        window.location.href = 'weather.html'
    });
}
