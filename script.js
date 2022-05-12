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

function citySearch(event) {
  event.preventDefault();
  let apiKey = "c0d34ff35f99187b8089dbc8ea55c072";
  let city = document.querySelector("#searchBar").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", citySearch);

function showWeather(response) {
  console.log(response.data);
  document.querySelector("h3").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#currentDescription").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
}

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
