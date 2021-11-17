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
  feelsLikeElement.innerHTML = response.data.main.feels_like;
  // display main discription
  let mainDiscriptionElement = document.querySelector("#main-discription");
  mainDiscriptionElement.innerHTML = response.data.weather[0].main;
  // display discription
  let discriptionElement = document.querySelector("#disciption");
  discriptionElement.innerHTML =
    "The sky will be " +
    response.data.weather[0].description +
    ". The high temperature will be " +
    Math.round(response.data.main.temp_max);
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
}

let apiKey = "b0052e8711d9397947c7695febf9aa9a";
let cityName = "Tehran";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayInfo);
