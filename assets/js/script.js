var key = "4fab1e963a8ceebf4f06fe67534f567e";
var searchBtn = document.getElementById("search-btn");
var searchInput = document.getElementById("search-input");
var title = document.getElementById("title")
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var icon = document.getElementById("icon");
var forecast = document.querySelectorAll(".forecast");

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var city = searchInput.value
    fetchWeather(city);
})

function fetchWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            title.innerHTML = data.name + "(" + month + "/" + day + "/" + year + ")";
            icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            icon.setAttribute("alt", data.weather[0].description);
            temp.innerHTML = "Temperature: " + Math.round(data.main.temp) + "&#176F";
            wind.innerHTML = "Wind Speed: " + Math.round(data.wind.speed) + " MPH";
            humidity.innerHTML = "Humidity: " + Math.round(data.main.humidity) + "%";
        })
        .then(function () {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=imperial`)
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    console.log(data)
                    for(var i = 0; i < forecast.length; i++) {
                        var index = i * 8 + 4;
                        forecast[i].innerHTML = "";
                        var forecastDate = new Date(data.list[index].dt * 1000);
                        var forecastDay = forecastDate.getDate();
                        var forecastMonth = forecastDate.getMonth() + 1;
                        var forecastYear = forecastDate.getFullYear();
                        var forecastTitle = document.createElement("h5")
                        var forecastIcon = document.createElement("img")
                        var forecastTemp = document.createElement("p")
                        var forecastWind = document.createElement("p")
                        var forecastHumidity = document.createElement("p")
                        forecastTitle.innerHTML = "(" + forecastMonth + "/" + forecastDay + "/" + forecastYear + ")";
                        forecastIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`)
                        forecastIcon.setAttribute("alt", data.list[index].weather[0].description);
                        forecastTemp.innerHTML = "Temp: " + Math.round(data.list[index].main.temp) + "&#176F"
                        forecastWind.innerHTML = "Wind: " + Math.round(data.list[index].wind.speed) + " MPH"
                        forecastHumidity.innerHTML = "Hum: " + Math.round(data.list[index].main.humidity) + "%"
                        forecast[i].append(forecastTitle)
                        forecast[i].append(forecastIcon)
                        forecast[i].append(forecastTemp)
                        forecast[i].append(forecastWind)
                        forecast[i].append(forecastHumidity)
                    }
                })
        })
}
