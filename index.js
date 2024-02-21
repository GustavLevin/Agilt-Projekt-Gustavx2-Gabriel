document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Hämta användarnamn och lösenord från formuläret
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Skapa ett användarobjekt med användarnamn och lösenord
    const user = {
      username: username,
      password: password,
    };

    // Lagra användarobjektet i Local Storage
    localStorage.setItem("user", JSON.stringify(user));

    // Meddela användaren om att registreringen var framgångsrik
    alert("Registrering lyckades!");

    // Återställ formuläret
    document.getElementById("registrationForm").reset();
  });
