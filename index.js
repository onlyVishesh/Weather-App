const apiKey = "cfc062e61b31013cdc29a9bd443e646b"
const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
document.querySelector(".search button").addEventListener("click", ()=>{
    const city = document.querySelector(".search input").value
    checkWeather(city);
    document.querySelector(".search input").value =''
    
} )


async function checkWeather(city){
    const response = await fetch(apiURL+city+`&appid=${apiKey}`);

if(response.status == 404){
    document.querySelector(".weather").style.display = "none"
    document.querySelector(".error").style.display = "block"
} else {

    var data = await response.json();
    
    
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round((data.main.temp*10))/10 + '&deg C'
    document.querySelector(".humidity").innerHTML = data.main.humidity +"% "
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h"
    document.querySelector(".weather-icon").scr = `images/${data.weather[0].main}.png`
    document.querySelector(".weather").style.display = "block"
    document.querySelector(".error").style.display = "none"
}

} 
