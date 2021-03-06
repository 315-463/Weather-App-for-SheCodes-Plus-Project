function displayInfo(response) {
  //display temperature
  let tempSmallElement = document.querySelector("#temp-small");
  tempSmallElement.innerHTML = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  //display City name
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name + ", " + response.data.sys.country;
  let citySmallElement = document.querySelector("#city-small");
  citySmallElement.innerHTML =
    response.data.name + ", " + response.data.sys.country;
  // display feels like temp
  let feelsLikeElement = document.querySelector("#feels-like-temp");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  // display main discription
  let mainDiscriptionElement = document.querySelector("#main-discription");
  mainDiscriptionElement.innerHTML = response.data.weather[0].main;
  // display discription
  let discriptionElement = document.querySelector("#disciption");
  discriptionElement.innerHTML =
    "It is " + response.data.weather[0].description;
  // display wind speed
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  // display Humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  // display visibility
  let visibilityElement = document.querySelector("#visibility");
  visibilityElement.innerHTML = response.data.visibility / 1000;
  // display pressure
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  // get coordinates and make forecast
  getForecast(response.data.coord);
}

function changeBackground(response) {
  mainDiscriptionElement = response.data.weather[0].main;
  let el = document.querySelector("#information-card");
  el.setAttribute("style", "background-image: url(src/Atmosphere.jpg)");
  if (mainDiscriptionElement === "Clouds") {
    el.setAttribute("style", "background-image: url(src/Clouds.jpg)");
  }
  if (mainDiscriptionElement === "Clear") {
    el.setAttribute("style", "background-image: url(src/Clear.jpg)");
  }
  if (mainDiscriptionElement === "Drizzle") {
    el.setAttribute("style", "background-image: url(src/Drizzle.jpg)");
  }
  if (mainDiscriptionElement === "Rain") {
    el.setAttribute("style", "background-image: url(src/Rain.jpg)");
  }
  if (mainDiscriptionElement === "Snow") {
    el.setAttribute("style", "background-image: url(src/Snow.jpg)");
  }
  if (mainDiscriptionElement === "Thunderstorm") {
    el.setAttribute("style", "background-image: url(src/Thunderstorm.jpg)");
  }
}

function changeIcon(response) {
  let iconMiniElement = document.querySelector(".weather-image-mini");
  iconMiniElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let iconElement = document.querySelector(".weather-image");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//default city
let cityName = "New York";

let apiKey = "b0052e8711d9397947c7695febf9aa9a";
let unit = "metric";

function search(cityName) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayInfo);
  // change background depend on weather discription
  axios.get(apiUrl).then(changeBackground);
  // change icon
  axios.get(apiUrl).then(changeIcon);
}
search(cityName);

// Time and Week day
function dateMaker(now) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = weekDays[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${weekDay} ${hour}:${minute}`;
}
let now = new Date();

let timeElement = document.querySelector("#time");
timeElement.innerHTML = dateMaker(now);

// making the search form
function submitForm(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-city");
  cityName = cityInputElement.value;
  search(cityName);
  document.querySelector("#tempUnit").innerHTML = "??C";
  document.querySelector("#tempUnit-small").innerHTML = "??C";
  document.querySelector("#feelUnit").innerHTML = "??C";
  celsiusLink.className = "temp-deactive";
  fahrenheitLink.className = "temp-active";
  celsiusUnit = true;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitForm);

// Chaning unit to Fahrenheit
function displayFahrenheit(event) {
  event.preventDefault();
  if (celsiusUnit === true) {
    // main temp change
    let temperature = document.querySelector("#temp");
    fahrenheitTemp = Math.round(Number(temperature.innerHTML) * 1.8 + 32);
    temperature.innerHTML = fahrenheitTemp;
    document.querySelector("#tempUnit").innerHTML = "??F";
    document.querySelector("#temp-small").innerHTML = fahrenheitTemp;
    document.querySelector("#tempUnit-small").innerHTML = "??F";
    // feels like temp change
    let feelTemperature = document.querySelector("#feels-like-temp");
    fahrenheitTemp = Math.round(Number(feelTemperature.innerHTML) * 1.8 + 32);
    feelTemperature.innerHTML = fahrenheitTemp;
    document.querySelector("#feelUnit").innerHTML = "??F";
    fahrenheitLink.className = "temp-deactive";
    celsiusLink.className = "temp-active";
    // Forecast temp unit change

    let forecastColumn = [0, 1, 2, 3, 4, 5];
    forecastColumn.forEach(function (columnNo) {
      let forecastTempMax = document.querySelector(
        `#weather-forecast-temp-max${columnNo}`
      );
      forecastTempMax.innerHTML = Math.round(
        Number(forecastTempMax.innerHTML) * 1.8 + 32
      );
      let forecastTempMin = document.querySelector(
        `#weather-forecast-temp-min${columnNo}`
      );
      forecastTempMin.innerHTML = Math.round(
        Number(forecastTempMin.innerHTML) * 1.8 + 32
      );
      document.querySelector(
        `#weather-forecast-unit-max${columnNo}`
      ).innerHTML = "??F ";
      document.querySelector(
        `#weather-forecast-unit-min${columnNo}`
      ).innerHTML = "??F ";
    });
    celsiusUnit = false;
  }
}

let celsiusUnit = true;
let fahrenheitLink = document.querySelector("#f-deg");
fahrenheitLink.addEventListener("click", displayFahrenheit);

// Chaning unit to Celsius
function displayCelsius(event) {
  event.preventDefault();
  if (celsiusUnit === false) {
    let Temperature = document.querySelector("#temp");
    celsiusTemp = Math.round((Number(Temperature.innerHTML) - 32) / 1.8);
    Temperature.innerHTML = celsiusTemp;
    document.querySelector("#tempUnit").innerHTML = "??C";
    document.querySelector("#temp-small").innerHTML = celsiusTemp;
    document.querySelector("#tempUnit-small").innerHTML = "??C";
    // feels like temp change
    let feelTemperature = document.querySelector("#feels-like-temp");
    celsiusTemp = Math.round((Number(feelTemperature.innerHTML) - 32) / 1.8);
    feelTemperature.innerHTML = celsiusTemp;
    document.querySelector("#feelUnit").innerHTML = "??C";
    celsiusLink.className = "temp-deactive";
    fahrenheitLink.className = "temp-active";
    // Forecast temp unit change
    let forecastColumn = [0, 1, 2, 3, 4, 5];
    forecastColumn.forEach(function (columnNo) {
      let forecastTempMax = document.querySelector(
        `#weather-forecast-temp-max${columnNo}`
      );
      forecastTempMax.innerHTML = Math.round(
        (Number(forecastTempMax.innerHTML) - 32) / 1.8
      );
      let forecastTempMin = document.querySelector(
        `#weather-forecast-temp-min${columnNo}`
      );
      forecastTempMin.innerHTML = Math.round(
        (Number(forecastTempMin.innerHTML) - 32) / 1.8
      );
      document.querySelector(
        `#weather-forecast-unit-max${columnNo}`
      ).innerHTML = "??C ";
      document.querySelector(
        `#weather-forecast-unit-min${columnNo}`
      ).innerHTML = "??C ";
    });
    celsiusUnit = true;
  }
}

let celsiusLink = document.querySelector("#c-deg");
celsiusLink.addEventListener("click", displayCelsius);

// adding forecast HTML
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `           <div class="col-2">
                  <div class="date">${formatDay(forecastDay.dt)}</div>
                  <div class="weather-forecast-icon">
                    <img
                      src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      alt="forecast image"
                    />
                  </div>
                  <div class="weather-forecast-temp">
                    <span class="weather-forecast-temp-max" id="weather-forecast-temp-max${index}">${Math.round(
          forecastDay.temp.max
        )} </span
                    ><span class="forecast-unit-max" id="weather-forecast-unit-max${index}">??C </span
                    ><span class="weather-forecast-temp-min" id="weather-forecast-temp-min${index}">${Math.round(
          forecastDay.temp.min
        )}</span
                    ><span class="forecast-unit-min" id="weather-forecast-unit-min${index}">??C </span>
                  </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
