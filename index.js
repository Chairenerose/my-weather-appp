let now = new Date();

let days = ["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let time = document.querySelector("#dateHour");
time.innerHTML = `${day} ${currentHour}:${currentMinutes}`;

function showTemperature(response) {
    let city = document.querySelector("#yourCity");
    let weather = document.querySelector("#yourTemp");
    let temperature = Math.round(response.data.main.temp);
    weather.innerHTML = ` ${temperature}`;
    city.innerHTML = `${response.data.name}`;
}

function showCity(event) {
    event.preventDefault();
    let units = "metric";
    let apiKey = "85124d3b69d8be26af9d3cdbcd7b5d6c";
    let findCity = document.querySelector("#city-input");
    findCity = findCity.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", showCity);

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "85124d3b69d8be26af9d3cdbcd7b5d6c";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

let currentCity = document.querySelector(".btn-dark");
currentCity.addEventListener("click", showPosition);
navigator.geolocation.getCurrentPosition(showPosition);
