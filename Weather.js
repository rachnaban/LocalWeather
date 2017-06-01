function useLatLongForWeather(coords) {
    var lat = coords.latitude;
    var lon = coords.longitude;
    var apiKey = "66e767d7b43aea4be8d8ebf4ec634715";
    var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + coords.latitude + "&lon=" + coords.longitude + "&appid=66e767d7b43aea4be8d8ebf4ec634715";
    callWeatherApi(apiUrl, getWeatherData);
}
function callWeatherApi(url, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cFunction(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function getWeatherData(xhttp) {
    var obj = JSON.parse(xhttp.responseText);
    var weatherDescription = obj.weather[0].description;

    var iconUrl = "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";

    var $img = $("<img src=" + iconUrl + "></img>");
    var $span = $("<div><span id='condition'></span></div>");
    var $currentTemp = $("<div><span id='curTemp'></span></div>");
    var $maxMinTemp = $("<div id='minMaxDiv'> <span id='minTemp'></span> to <span id='maxTemp'></span></div>");
    var $otherDetails = $("<div>Wind <span id='windspeed'></span> Clouds <span id='clouds'></span> Atmospheric Pressure <span id='pressure'></span></div>");
    $("#icon").append($span).append($img).append($currentTemp).append($maxMinTemp).append($otherDetails);

    var tempInCel = obj.main.temp - 273;
    var minTempInCel = obj.main.temp_min - 273;
    var maxTempInCel = obj.main.temp_max - 273;
    document.getElementById("curTemp").innerHTML = tempInCel.toFixed(1) + '&deg;C';
    document.getElementById("minTemp").innerHTML = minTempInCel.toFixed(1) + '&deg;C';
    document.getElementById("maxTemp").innerHTML = maxTempInCel.toFixed(1) + '&deg;C';
    var minTempInF = minTempInCel * (9 / 5) + 32;
    var maxTempInF = maxTempInCel * (9 / 5) + 32;
    var tempInF = tempInCel * (9 / 5) + 32;
    document.getElementById("country").innerHTML = obj.sys.country;
    document.getElementById("city").innerHTML = obj.name;
    document.getElementById("condition").innerHTML = weatherDescription;

    document.getElementById("clouds").innerHTML = obj.clouds.all + "%";
    document.getElementById("windspeed").innerHTML = obj.wind.speed + " miles per hour";
    document.getElementById("pressure").innerHTML = obj.main.pressure + " hPa";


    $('input[type="radio"]').change(function () {
        if (this.id == "tempF") {
            document.getElementById("curTemp").innerHTML = tempInF.toFixed(1) + '&deg;F';
            document.getElementById("minTemp").innerHTML = minTempInF.toFixed(1) + '&deg;F';
            document.getElementById("maxTemp").innerHTML = maxTempInF.toFixed(1) + '&deg;F';

        }
        else {
            document.getElementById("curTemp").innerHTML = tempInCel.toFixed(1) + '&deg;C';
            document.getElementById("minTemp").innerHTML = minTempInCel.toFixed(1) + '&deg;C';
            document.getElementById("maxTemp").innerHTML = maxTempInCel.toFixed(1) + '&deg;C';
        }
    });
}

navigator.geolocation.getCurrentPosition(function (position) {
    useLatLongForWeather(position.coords);
},
    function (failure) {
        $.getJSON('https://ipinfo.io/geo', function (response) {
            var loc = response.loc.split(',');
            var coords = {
                latitude: loc[0],
                longitude: loc[1]
            };
            useLatLongForWeather(coords);
        });
    }
);// JavaScript source code
