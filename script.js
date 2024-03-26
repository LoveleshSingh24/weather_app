const apiKey = "802b72fb43ed9aade37b54210f271d6b";
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon")

//https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=802b72fb43ed9aade37b54210f271d6b
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status== 404){
        document.querySelector(".weather").style.display="none";
        document.querySelector(".error").style.display="block";
    }else{
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "° C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        if(data.weather[0].main=="Clouds"){
            weatherIcon.src="images/cloudy.png";
        }
        else if(data.weather[0].main=="Clear"){
            weatherIcon.src="images/sun.png";
        }
        else if(data.weather[0].main=="Rain"){
            weatherIcon.src="images/rain.png";
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src="images/dizzey.png";
        }
        else if(data.weather[0].main=="Mist"){
            weatherIcon.src="images/mist.png";
        }
        else if(data.weather[0].main=="Snow"){
            weatherIcon.src="images/snow.png";
        }
        else if(data.weather[0].main=="Haze"){
            weatherIcon.src="images/haze.png";
        }
        else if(data.weather[0].main=="Thunderstorm"){
            weatherIcon.src="images/storm.png";
        }
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";

    }
    
}

searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value.trim(); // Trim the input value
    if (cityName !== "") { // Check if the trimmed value is not empty
        checkWeather(cityName);
    }
    searchBox.value = "";

});


searchBox.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        // Check if the key pressed is Enter (key code 13)
        const cityName = searchBox.value.trim(); // Trim the input value
        if (cityName !== "") { // Check if the trimmed value is not empty
            checkWeather(cityName);
        }
        searchBox.value = "";
    }
});
