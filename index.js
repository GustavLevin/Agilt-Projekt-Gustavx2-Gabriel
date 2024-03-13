// Importera funktionen getData för att hämta data från en URL
let getData = async (URL) => {
    let response = await fetch(URL);
    let json = await response.json();
    return json;
 }
 
let registerButton = document.getElementById('registerButton');
let loginButton = document.getElementById('loginButton');
let choiceContainer = document.getElementById('choiceContainer');
let registrationContainer = document.getElementById('registrationContainer');
let loginContainer = document.getElementById('loginContainer');
let logoutButton = document.getElementById('logoutButton');
let welcomeMessage = document.getElementById('welcomeMessage');
let loginForm = document.getElementById('loginForm');
let registrationForm = document.getElementById('registrationForm');

registerButton.addEventListener('click', () => {
  // Döljer alternativen och visar registeringsformuläret
  choiceContainer.classList.add('hidden');
  registrationContainer.classList.remove('hidden');
  loginContainer.classList.add('hidden');
});

loginButton.addEventListener('click', () => {
  choiceContainer.classList.add('hidden');
  loginContainer.classList.remove('hidden');
  registrationContainer.classList.add('hidden');
});

// Hämta användaruppgifter från localStorage eller skapa en tom lista om det inte finns några
let users = JSON.parse(localStorage.getItem('users')) || [];


registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  if (username && password) {
    
    if (users.some(user => user.username === username)) {
      alert('Username already exists. Please choose another one.');
      return;
    }
    let userId = crypto.randomUUID();
    users.push({id: userId, username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
    registrationContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');

    currentUser = { id: userId, username, password };
    console.log(currentUser);
  } else {
    alert('Please enter a username and password.');
  }
});



loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  let loginUsername = document.getElementById('loginUsername').value;
  let loginPassword = document.getElementById('loginPassword').value;

  let user = users.find(user => user.username === loginUsername && user.password === loginPassword);

  if (user) {
    welcomeMessage.textContent = `Hello ${user.username}`;
    loginContainer.classList.add('hidden');
    logoutButton.classList.remove('hidden');
    let quote = await getData("https://api.quotable.io/quotes/random");
    let quoteText = document.createElement("p");
    quoteText.innerText = `${quote[0].content} 
    - ${quote[0].author}`;
    document.body.append(quoteText);

    // Retrieve the userId from the user object
    let userId = user.id;

    // After successful login
    let todoListButton = document.createElement('button');
    todoListButton.textContent = 'Go to Todo List';
    todoListButton.addEventListener('click', () => {
        localStorage.setItem('userId', userId); 
        window.location.href = 'todo.html'; 
    });
    let habitsButton = document.createElement('button');
    habitsButton.textContent = 'Go to Todo List';
    habitsButton.addEventListener('click', () => {
        localStorage.setItem('userId', userId); 
        window.location.href = 'Gabriel/index-3.html'; 
    });
    document.body.appendChild(todoListButton);
    document.body.appendChild(habitsButton);
    registerButton.classList.add('hidden');
    loginButton.classList.add('hidden');
    registrationContainer.classList.add('hidden');
    loginContainer.classList.add('hidden');
  } else {
    alert('Incorrect username or password.');
  }

  document.getElementById('loginUsername').value = ''; 
  document.getElementById('loginPassword').value = ''; 
});

