let now = new Date();

//current date
//day
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
//month
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
//date
let date = now.getDate();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}`;

//current time
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//display weather forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `
        <div class="col-sm">
          <div class="forecastDay">
          ${formatDay(forecastDay.dt)}
          </div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="42"/>
          <div class="forecastTemps">
            <span class="forecastLow">${Math.round(
              forecastDay.temp.min
            )}°</span> | <span class="forecastHigh">${Math.round(
          forecastDay.temp.max
        )}°</span>
          </div>
        </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c0d34ff35f99187b8089dbc8ea55c072";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

//display weather on load or search
function showWeather(response) {
  let currentCityElement = document.querySelector("#currentCity");
  currentCityElement.innerHTML = response.data.name;
  let currentTempElement = document.querySelector("#currentTemp");
  currentTempElement.innerHTML = Math.round(response.data.main.temp);
  let currentDescriptionElement = document.querySelector("#currentDescription");
  currentDescriptionElement.innerHTML = response.data.weather[0].main;
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  let currentLowTempElement = document.querySelector("#current-low-temp");
  currentLowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  let currentHighTempElement = document.querySelector("#current-high-temp");
  currentHighTempElement.innerHTML = Math.round(response.data.main.temp_max);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let currrentWeatherIcon = document.querySelector("#currentWeatherIcon");
  currrentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //let sunriseElement = document.querySelector("#sunrise");
  //sunriseElement.innerHTML = Math.round(response.data.sys.sunrise);
  //let sunsetElement = document.querySelector("#sunset");
  //sunsetElement.innerHTML = Math.round(response.data.sys.sunset);
  fahrenheitTemp = response.data.main.temp;
  console.log(response.data);

  getForecast(response.data.coord);
}

//search for cities and import data
function search(city) {
  let apiKey = "c0d34ff35f99187b8089dbc8ea55c072";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchBarElement = document.querySelector("#searchBar");
  search(searchBarElement.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
//use current location button
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(userLocation);
}

function userLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "c0d34ff35f99187b8089dbc8ea55c072";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}

//change Temp to C when clicking C link
function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let currentTempElement = document.querySelector("#currentTemp");
  currentTempElement.innerHTML = Math.round(celsiusTemp);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemp);

//change Temp to F when clicking F link
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let currentTempElement = document.querySelector("#currentTemp");
  currentTempElement.innerHTML = Math.round(fahrenheitTemp);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

search("New York");
