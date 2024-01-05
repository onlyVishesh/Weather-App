const apiKey = "cfc062e61b31013cdc29a9bd443e646b";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

let cityData = [];

let updateHistory = () => {
  document.querySelector(".history-cards").style.display = "flex"
  let historyCities = document.querySelector(".history-cities");
  let cityList = cityData.map(
    (city) => `
  <div class="card history">
    <h3 class="history-city">${city.name}</h3>
    <p class="history-temp">Temperature - ${Math.round(city.main.temp * 10) / 10} &deg C</p>
    <p class="history-humidity">Humidity - ${city.main.humidity}%</p>
    <p class="history-wind">Wind Speed- ${city.wind.speed} Km/h</p>
  </div>
  `
  );
  historyCities.innerHTML = cityList.join("")
};

let checkCityPresent = (city, arr) => {
  console.log(city.toLowerCase());
  // console.log(arr.name.toLowerCase())

  for (let i = 0; i < arr.length; i++) {
    if (city.toLowerCase() === arr[i].name.toLowerCase()) {
      return true;
    }
  }
  return false;
};

let addCity = (city, data) => {
  console.log(cityData.length, checkCityPresent(city, cityData));
  if (cityData.length < 3 && !checkCityPresent(city, cityData)) {
    cityData.unshift(data);
  } else if (!checkCityPresent(city, cityData)) {
    cityData.pop();
    cityData.unshift(data);
  }
  updateHistory()
};

document.querySelector(".search button").addEventListener("click", () => {
  const city = document.querySelector(".search input").value;
  checkWeather(city);
  document.querySelector(".search input").value = "";
});

document.querySelector(".search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = document.querySelector(".search input").value;
    checkWeather(city);
    document.querySelector(".search input").value = "";
  }
});

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  } else {
    var data = await response.json();
    console.log(data);
    addCity(city, data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp * 10) / 10 + "&deg C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "% ";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    document.querySelector(
      ".weather-icon"
    ).src = `images/${data?.weather[0]?.main?.toLowerCase()}.png`;
    console.log(data?.weather[0]?.main?.toLowerCase());
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
