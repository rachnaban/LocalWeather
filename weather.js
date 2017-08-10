function initialize() {

    const input = document.getElementById('address');
    let $details = document.getElementById('details'),
        $weathericon = document.getElementById('pic'),
        $address = document.getElementById('address'),
        $city = document.getElementById('city'),
        $country = document.getElementById('country'),
        $currenttemperature = document.getElementById('current-temperature'),
        $mintemperature = document.getElementById('min-temperature'),
        $maxtemperature = document.getElementById('max-temperature'),
        $clouds = document.getElementById('clouds'),
        $pressure = document.getElementById('pressure'),
        $wind = document.getElementById('wind'),
        $description = document.getElementById('description'),
        $icon = document.getElementById('icon'),
        $lblUnit = document.getElementById('unit'),
      
         gTempMinCel,
         gTempMinFeh,
         gTempMaxCel,
         gTempMaxFeh,
         gTempCurCel,
         gTempCurFeh;
            $lblUnit.addEventListener('click', changeunit);

    if (!input) return;

    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        
        const place = dropdown.getPlace();

        if (place.geometry) {
            const lat = place.geometry.location.lat(),
                lng = place.geometry.location.lng(),
                apiKey = "66e767d7b43aea4be8d8ebf4ec634715",
                apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=66e767d7b43aea4be8d8ebf4ec634715`;

            fetch(apiUrl)
                .then(blob => blob.json())
                .then(data => {
                    const  [weatherDescription, iconUrl,tempInCel,minTempInCel,maxTempInCel,country,city,cloud,windSpeed,atmosphericPressure,minTempInF,maxTempInF,tempInF] = getWeather(data);
                    $details.classList.remove("hidden");
                    gTempMinCel= minTempInCel;
                    gTempMinFeh = minTempInF;
                    gTempCurFeh = tempInF;
                    gTempCurCel = tempInCel;
                    gTempMaxFeh = maxTempInF;
                    gTempMaxCel = maxTempInCel;
                    
    $details.classList.add("inline-grid");
    $weathericon.style.border = '1px solid';
    $address.value = "";
    $lblUnit.classList.remove("hidden");

    $city.innerHTML = city;
    $country.innerHTML = country;
    $currenttemperature.innerHTML = tempInCel.toFixed(1) + '&deg;C';
    $mintemperature.innerHTML = minTempInCel.toFixed(1) + '&deg;C';
    $maxtemperature.innerHTML = maxTempInCel.toFixed(1) + '&deg;C';
    $clouds.innerHTML = cloud + " %";
    $pressure.innerHTML = atmosphericPressure + " hPa";
    $wind.innerHTML = windSpeed + " miles per hour";
    $description.innerHTML = weatherDescription;
    $icon.src = iconUrl;
                    });
        } else {
            alert('Please select the name of the place from the suggestions!');
            return;
        }
    });

     function changeunit(e){
    
       if (this.innerText == "°C") {
    
            this.innerText = "°F";

            $currenttemperature.innerHTML = gTempCurFeh.toFixed(1) + '&deg;F';
            $mintemperature.innerHTML = gTempMinFeh.toFixed(1) + '&deg;F';
            $maxtemperature.innerHTML = gTempMaxFeh.toFixed(1) + '&deg;F';
        } else {
    
            this.innerText = "°C";
            $currenttemperature.innerHTML =gTempCurCel.toFixed(1) + '&deg;C';
            $mintemperature.innerHTML = gTempMinCel.toFixed(1) + '&deg;C';
            $maxtemperature.innerHTML = gTempMaxCel.toFixed(1) + '&deg;C';
        }
    };
    // if someone hits enter on the address field, don't submit the form

    input.addEventListener('keydown', (e) => {

        if (e.keyCode === 13) e.preventDefault();
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

function getWeather(weatherData) {
    
       let weatherDescription = weatherData.weather[0].description,
        iconUrl = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png",
        tempInCel = weatherData.main.temp - 273,
        minTempInCel = weatherData.main.temp_min - 273,
        maxTempInCel = weatherData.main.temp_max - 273,
        country = weatherData.sys.country,
        city = weatherData.name,
        cloud = weatherData.clouds.all,
        windSpeed = weatherData.wind.speed, //miles per hour
        atmosphericPressure = weatherData.main.pressure,
        minTempInF = minTempInCel * (9 / 5) + 32,
        maxTempInF = maxTempInCel * (9 / 5) + 32,
        tempInF = tempInCel * (9 / 5) + 32;
        return [weatherDescription, iconUrl,tempInCel,minTempInCel,maxTempInCel,country,city,cloud,windSpeed,atmosphericPressure,minTempInF,maxTempInF,tempInF];
      }

    
