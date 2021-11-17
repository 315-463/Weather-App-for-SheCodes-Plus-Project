function displayTemp(response) {
  console.log(response.data);
}
let apiKey = "b0052e8711d9397947c7695febf9aa9a";
let cityName = "Tehran";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displayTemp);
