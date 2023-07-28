var key = "4fab1e963a8ceebf4f06fe67534f567e";
var searchBtn = document.getElementById("search-btn");
var searchInput = document.getElementById("search-input");
var title = document.getElementById("title");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var icon = document.getElementById("icon");
var forecast = document.querySelectorAll(".forecast");
var listGroup = document.querySelector(".list-group");
// declared variables
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var city = searchInput.value;
  saveCityToLocalStorage(city);
  fetchWeather(city);
});
//  event listener to search weather based on city input from search button.
// function to fetch the weather based on city input from search also for looping through
// the date and to fetch the api for weather icons.
function fetchWeather(cityName) {
  console.log(cityName);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      var date = new Date();
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      title.innerHTML = data.name + "(" + month + "/" + day + "/" + year + ")";
      icon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
      icon.setAttribute("alt", data.weather[0].description);
      temp.innerHTML = "Temperature: " + Math.round(data.main.temp) + "&#176F";
      wind.innerHTML = "Wind Speed: " + Math.round(data.wind.speed) + " MPH";
      humidity.innerHTML = "Humidity: " + Math.round(data.main.humidity) + "%";
    })
    .then(function () {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=imperial`
      )
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          console.log(data);
          for (var i = 0; i < forecast.length; i++) {
            var index = i * 8 + 4;
            forecast[i].innerHTML = "";
            var forecastDate = new Date(data.list[index].dt * 1000);
            var forecastDay = forecastDate.getDate();
            var forecastMonth = forecastDate.getMonth() + 1;
            var forecastYear = forecastDate.getFullYear();
            var forecastTitle = document.createElement("h5");
            var forecastIcon = document.createElement("img");
            var forecastTemp = document.createElement("p");
            var forecastWind = document.createElement("p");
            var forecastHumidity = document.createElement("p");
            forecastTitle.innerHTML =
              "(" +
              forecastMonth +
              "/" +
              forecastDay +
              "/" +
              forecastYear +
              ")";
            forecastIcon.setAttribute(
              "src",
              `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`
            );
            forecastIcon.setAttribute(
              "alt",
              data.list[index].weather[0].description
            );
            forecastTemp.innerHTML =
              "Temp: " + Math.round(data.list[index].main.temp) + "&#176F";
            forecastWind.innerHTML =
              "Wind: " + Math.round(data.list[index].wind.speed) + " MPH";
            forecastHumidity.innerHTML =
              "Hum: " + Math.round(data.list[index].main.humidity) + "%";
            forecast[i].append(forecastTitle);
            forecast[i].append(forecastIcon);
            forecast[i].append(forecastTemp);
            forecast[i].append(forecastWind);
            forecast[i].append(forecastHumidity);
          }
        });
    });
}
// loads to the DOM
document.addEventListener("DOMContentLoaded", function () {
  retrieveAndCreateListItems();
});

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
});
// saves cities to local storage
function saveCityToLocalStorage(city) {
  var cities = localStorage.getItem("cities") || "[]";
  cities = JSON.parse(cities);
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
}
// attempting to get the local storage to refelct the target buttons--unsuccesfful may need to redo
function retrieveAndCreateListItems() {
  var cities = localStorage.getItem("cities");
  cities = cities ? JSON.parse(cities) : [];
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-secondary w-100 ");
    button.textContent = city;
    button.addEventListener("click",function(){
    fetchWeather(this.textContent)
     updateCityList.appendChild(button);
    })
   
    var li = document.createElement("li");
    li.innerHTML = city;
    li.addEventListener("click", function () {
      // Call fetchWeather passing the value of li innerHTML
      fetchWeather(this.innerHTML);
    });
// button to get the weather data to the dispaly into local storage. maybe i need to add a for loop in the function retireve and
// create list items:
    document.querySelector(".list-group").appendChild(li);
  }
}
function updateCityList(city) {
  var button=document.createElement("button");
  button.innerHTML =city;
  // Create a new li element for the city and add event listener
  var li = document.createElement("li");
  li.addEventListener("click", function () {
    // Call fetchWeather passing the value of li innerHTML
    fetchWeather(this.innerHTML);
  });

  // Append the new li to the list of cities
  document.querySelector(".list-group").appendChild(li);
  document.querySelector(li).appendChild(button);
}
retrieveAndCreateListItems()
//  to do list to make changes some codes are commented out.
// when we click the search 
// // for (let index = 0; index < array.length; index++) {
//     const element = array[index];
//     button
// }, we want the city variable to be saved to localStorage
// after local storage is created, you want to write a function that will retrieve local storage
// loop through the retrieved data, create a li in the for loop
// give the li a innerHTML of whatever the city name coming from localStorage is
// append the li to the dom where it need to go
// add an event listener to each li so that when the li is clicked, it re-calls fetchWeather() passing in the value of that li innerHTML
// pseudo code in the comments above: to do list.