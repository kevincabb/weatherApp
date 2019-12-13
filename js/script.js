
///------load your variables for all to use-------//
let cityObj = [];
let cityForecast = [];
let capCity;
let capFcast;
let validChar = true;

let currentPosition = 0;
let deleteCity = document.getElementById('delete');
let search = document.getElementById('search');
let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
let url_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
let url_city_pt2 = "";
let url_temp_pt3 = "&units=imperial";
let url_key_pt4 = "&appid=02a6b0340647c8f8cd4dabe06abbe972";

let cityInput = document.getElementById('cityInput');
let currentCity = document.getElementById('current');
let currentTemp = document.getElementById('currentTemp');
let currentLow = document.getElementById('currentLow');
let currentHigh = document.getElementById('currentHigh');
let next = document.getElementById('next');
let previous = document.getElementById('previous');

let day1pic = document.getElementById('day1pic');
let date1 = document.getElementById('date1');
let date1Low = document.getElementById('date1Low');
let date1High = document.getElementById('date1High');

let day2pic = document.getElementById('day2pic');
let date2 = document.getElementById('date2');
let date2Low = document.getElementById('date2Low');
let date2High = document.getElementById('date2High');

let day3pic = document.getElementById('day3pic');
let date3 = document.getElementById('date3');
let date3Low = document.getElementById('date3Low');
let date3High = document.getElementById('date3High');

let day4pic = document.getElementById('day4pic');
let date4 = document.getElementById('date4');
let date4Low = document.getElementById('date4Low');
let date4High = document.getElementById('date4High');

let day5pic = document.getElementById('day5pic');
let date5 = document.getElementById('date5');
let date5Low = document.getElementById('date5Low');
let date5High = document.getElementById('date5High');

//If items stored in localStorage
//Load saved current day forecast object
if (localStorage.getItem('myObj')) {
    cityObj = JSON.parse(localStorage.getItem('myObj'));

    if (cityObj.length > 0) {
        currentDisplay();
    }
}

//Load saved 5 day forecast object
if (localStorage.getItem('myForecast')) {
    cityForecast = JSON.parse(localStorage.getItem('myForecast'));

    if (cityForecast.length > 0) {
        forecastDisplay();
    }
}

//-------------Add Event Listeners------------//

//Deletes the city currently displayed on screen
deleteCity.addEventListener('click', function (e) {
    if (cityObj.length > 0) {
        cityObj.splice(currentPosition, 1);
        cityForecast.splice(currentPosition, 1);
        saveData();

        currentPosition = 0;
        if (cityObj.length < 1) {
            location.reload();
        } else {
            currentDisplay();
            forecastDisplay();
        }

    } else {
        alert("No city to delete!");
    }
});

//Initiates search through API data for city weather
search.addEventListener('click', function (e) {
    
    //Checks if user input is ONLY letters
    allLetter(cityInput, e);

    //If characters other than letters are detected, function will NOT continue
    if(validChar === false){
        validChar = true;
        return;
    }

    //Checks for duplicate Cities, will alert if there is. If not, continue
    if (cityObj.length > 0) {
        capFcast = cityInput.value.toUpperCase();
        for (let i = 0; i < cityObj.length; i++) {
            capCity = cityObj[i].name.toUpperCase();
            if (capCity === capFcast) {
                alert("City exist already, please enter another!");
                cityInput.value = "";
                return;
            } else {
                url_city_pt2 = cityInput.value;
            }
        }
    } else {
        url_city_pt2 = cityInput.value;
    }

    //If pass all checks, make FULL API keys
    let fullURL = url_pt1 + url_city_pt2 + url_temp_pt3 + url_key_pt4;
    let fullURL_forecast = url_forecast + url_city_pt2 + url_temp_pt3 + url_key_pt4;

    //Call JSON
    loadJSON(fullURL);
    loadJSONForecast(fullURL_forecast);

    //Clear InputBox field
    cityInput.value = "";
});

//Displays next city on screen
next.addEventListener('click', function (e) {
    if (cityObj.length < 1) {
        alert("No cities available!");
    } else {
        if (currentPosition === cityObj.length - 1) {
            currentPosition = 0;
        } else {
            currentPosition++;
        }

        currentDisplay();
        forecastDisplay();
    }
});

//Displays previous city on screen
previous.addEventListener('click', function (e) {
    if (cityObj.length < 1) {
        alert("No cities available!");
    } else {
        if (currentPosition === 0) {
            currentPosition = cityObj.length - 1;
        } else {
            currentPosition--;
        }

        currentDisplay();
        forecastDisplay();
    }
});

//---------Load Your JSON Weather File--------//

//Pulls weather data for current day
function loadJSON(url) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            getWeather(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//Pulls weather data for next five days
function loadJSONForecast(url) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            getForecast(myArr);
        } 
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

//Push current weather data to cityObj array
function getWeather(info) {
    cityObj.push(info);
    console.log(cityObj);
    saveData();

    if (currentPosition === 0) {
        currentDisplay();
    } 
}

//push forecast weather data to forecastObj array
function getForecast(info) {
    cityForecast.push(info);
    console.log(cityForecast);
    saveData();

    if (currentPosition === 0) {
        forecastDisplay();
    }
}

//Save to localStorage
function saveData() {
    localStorage.setItem('myObj', JSON.stringify(cityObj));
    localStorage.setItem('myForecast', JSON.stringify(cityForecast));
}

//Function to display current weather
function currentDisplay() {
    currentCity.innerText = cityObj[currentPosition].name;
    currentTemp.innerText = Math.round(cityObj[currentPosition].main.temp);
    currentLow.innerText = Math.round(cityObj[currentPosition].main.temp_min);
    currentHigh.innerText = Math.round(cityObj[currentPosition].main.temp_max);
}

//Function to display forecast weather
function forecastDisplay() {
    day1pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[0].weather[0].icon + '@2x.png');
    date1.innerText = getDate(0);
    date1Low.innerText = Math.round(cityForecast[currentPosition].list[0].main.temp_min) + "°F";
    date1High.innerText = Math.round(cityForecast[currentPosition].list[0].main.temp_max) + "°F";

    day2pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[11].weather[0].icon + '@2x.png');
    date2.innerText = getDate(11);
    date2Low.innerText = Math.round(cityForecast[currentPosition].list[11].main.temp_min) + "°F";
    date2High.innerText = Math.round(cityForecast[currentPosition].list[11].main.temp_max) + "°F";

    day3pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[19].weather[0].icon + '@2x.png');
    date3.innerText = getDate(19);
    date3Low.innerText = Math.round(cityForecast[currentPosition].list[19].main.temp_min) + "°F";
    date3High.innerText = Math.round(cityForecast[currentPosition].list[19].main.temp_max) + "°F";

    day4pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[27].weather[0].icon + '@2x.png');
    date4.innerText = getDate(27);
    date4Low.innerText = Math.round(cityForecast[currentPosition].list[27].main.temp_min) + "°F";
    date4High.innerText = Math.round(cityForecast[currentPosition].list[27].main.temp_max) + "°F";

    day5pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[35].weather[0].icon + '@2x.png');
    date5.innerText = getDate(35);
    date5Low.innerText = Math.round(cityForecast[currentPosition].list[35].main.temp_min) + "°F";
    date5High.innerText = Math.round(cityForecast[currentPosition].list[35].main.temp_max) + "°F";
}

//Function to pull MONTH & DAY ONLY
function getDate(dayPosition) {
    let fullDate = cityForecast[currentPosition].list[dayPosition].dt_txt;
    let actualDate = "";

    actualDate = fullDate[5] + fullDate[6] + "/" + fullDate[8] + fullDate[9]

    return actualDate;
}

//Function to check if user is ONLY typing in Letters, and white space/ " " if followed by a LETTER
function allLetter(inputtxt, ev) {
    let letters = /^[a-zA-Z\s-, ]+$/;
    if (!inputtxt.value.match(letters)) {
        alert('Please input letters only');
        cityInput.value = "";
        validChar = false;
    }
}
