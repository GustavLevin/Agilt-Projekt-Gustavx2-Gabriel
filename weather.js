// här skapar jag en variabel för att kunna använda min api key
const apiKey = "fd6b1392f6ba23556759c2cf3dd27131";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// här skapar jag variabler för att kunna använda dom i mina funktioner
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const returnBtn = document.querySelector(".returnBtn");
// här skapar jag en async function för att hämta datan från api
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  // här sätter jag in en if sats för att visa en error om staden inte finns
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    // här sätter jag in datan i mina divar

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    // här sätter jag in en if sats för att sätta in rätt bild beroende på vad vädret är
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
// här lägger jag till en eventlistener på min knapp

returnBtn.addEventListener("click", () => {
  history.back();
});

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
// här kallar jag funktionen
checkWeather();