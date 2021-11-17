function displayTemp(response) {
  let tempSmallElement = document.querySelector("#temp-small");
  tempSmallElement.innerHTML = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let citySmallElement = document.querySelector("#city-small");
  citySmallElement.innerHTML = response.data.name;
}
let apiKey = "b0052e8711d9397947c7695febf9aa9a";
let cityName = "Tehran";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayTemp);
