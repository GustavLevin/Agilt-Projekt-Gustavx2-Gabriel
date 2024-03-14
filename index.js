let h2 = document.getElementById('h2');
let registerButton = document.getElementById('registerButton');
let loginButton = document.getElementById('loginButton');
let choiceContainer = document.getElementById('choiceContainer');
let registrationContainer = document.getElementById('registrationContainer');
let loginContainer = document.getElementById('loginContainer');
let loginForm = document.getElementById('loginForm');
let registrationForm = document.getElementById('registrationForm');


registerButton.addEventListener('click', () => {
  registrationContainer.classList.remove('hidden');
  loginContainer.classList.add('hidden');
});

loginButton.addEventListener('click', () => {
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
    
    window.location.href = 'start.html';

   
  } else {
    alert('Incorrect username or password.');
  }

  document.getElementById('loginUsername').value = ''; 
  document.getElementById('loginPassword').value = ''; 
});


