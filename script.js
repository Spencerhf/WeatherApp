$(document).ready(function() {

    //This is my variable section.

var apiKey = '15722274a95bedaa5b77dd790c4ae94b';

var zipSearch = $('#zipSearch').value;
var zipCodeButton = document.getElementById('zipCodeButton');
var cityButton = document.getElementById('cityButton');
var weatherInfoDiv = document.getElementById('weatherInfo');
var currentTemp = document.getElementById('currentTemp');
var feelsLike = document.getElementById('feelsLike');


//This function is retrieving user input.

function weatherData() {

    zipCodeButton.addEventListener('click', function() {
        weatherInfoDiv.innerHTML = '';
        var zipSearch = document.getElementById('zipSearch').value;
        testInputZip(zipSearch);
});

    cityButton.addEventListener('click', function() {
        weatherInfoDiv.innerHTML = '';
        var citySearch = document.getElementById('citySearch').value;
        testInputCity(citySearch);
    }); 
}

//Data validation functions
function testInputZip(zipSearch) {
    if(isNaN(zipSearch) || zipSearch == '' || zipSearch.length != 5) {
        alert('Please enter a valid zipcode');
    } else {
        $.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipSearch},us&appid=${apiKey}&units=imperial`, function(data) {
            console.log(data);
            var weatherData = data;
            printWeather(weatherData);
        });
    }
}
function testInputCity(citySearch) {
    if(citySearch == '') {
        alert('Please enter a valid city');
    } else {
        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch},us&appid=${apiKey}&units=imperial`, function(data) {
            console.log(data);
            var weatherData = data;
            printWeather(weatherData, zipSearch);
        });
    }
}

//The function for printing out the data
function printWeather(weatherData) {

    console.log(Math.round(weatherData.main.temp));

    currentTemp.innerHTML = `<br>The current temperature in ${weatherData.name} is ${Math.round(weatherData.main.temp)}&#176`;
    weatherInfoDiv.appendChild(currentTemp);

    feelsLike.innerHTML = `It feels like ${Math.round(weatherData.main.feels_like)}&#176`;
    weatherInfoDiv.appendChild(feelsLike);
}

weatherData();

});