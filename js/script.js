
///------load your variables for all to use-------//
let cityObj = [];
let cityForecast = [];

let currentPosition = 0;
let getW = document.getElementById('search');
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

// If items stored in localStorage
if (localStorage.getItem('myObj')) {
    cityObj = JSON.parse(localStorage.getItem('myObj'));

    currentDisplay();
}

if (localStorage.getItem('myForecast')) {
    cityForecast = JSON.parse(localStorage.getItem('myForecast'));

    forecastDisplay();
}

//-------------Add Event Listeners------------//
getW.addEventListener('click', function (e) {
    url_city_pt2 = cityInput.value;

    let fullURL = url_pt1 + url_city_pt2 + url_temp_pt3 + url_key_pt4;
    let fullURL_forecast = url_forecast + url_city_pt2 + url_temp_pt3 + url_key_pt4;
    loadJSON(fullURL);
    loadJSONForecast(fullURL_forecast);
    cityInput.value = "";
});

next.addEventListener('click', function (e) {
    if (currentPosition === cityObj.length - 1) {
        currentPosition = 0;
    } else {
        currentPosition++;
    }

    currentDisplay();

    forecastDisplay();


});

previous.addEventListener('click', function (e) {
    if (currentPosition === 0) {
        currentPosition = cityObj.length - 1;
    } else {
        currentPosition--;
    }

    currentDisplay();

    forecastDisplay();
});

//---------Load Your JSON Weather File--------//

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

function getWeather(info) {
    cityObj.push(info);
    console.log(cityObj);
    saveData();

    if (currentPosition === 0) {
        currentDisplay();
    }
}
function getForecast(info) {
    cityForecast.push(info);
    console.log(cityForecast);
    saveData();

    if (currentPosition === 0) {
        forecastDisplay();
    }
}

function saveData() {
    localStorage.setItem('myObj', JSON.stringify(cityObj));
    localStorage.setItem('myForecast', JSON.stringify(cityForecast));
}

function currentDisplay() {
    currentCity.innerText = cityObj[currentPosition].name;
    currentTemp.innerText = Math.round(cityObj[currentPosition].main.temp);
    currentLow.innerText = Math.round(cityObj[currentPosition].main.temp_min);
    currentHigh.innerText = Math.round(cityObj[currentPosition].main.temp_max);
}

function forecastDisplay() {
    day1pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[0].weather[0].icon + '@2x.png');
    // date1.innerText = cityForecast[currentPosition].n
    date1Low.innerText = cityForecast[currentPosition].list[0].main.temp_min;
    date1High.innerText = cityForecast[currentPosition].list[0].main.temp_max;
    day2pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[7].weather[0].icon + '@2x.png');
    // date1.innerText = cityForecast[currentPosition].n
    date2Low.innerText = cityForecast[currentPosition].list[7].main.temp_min;
    date2High.innerText = cityForecast[currentPosition].list[7].main.temp_max;
    day3pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[15].weather[0].icon + '@2x.png');
    // date1.innerText = cityForecast[currentPosition].n
    date3Low.innerText = cityForecast[currentPosition].list[15].main.temp_min;
    date3High.innerText = cityForecast[currentPosition].list[15].main.temp_max;
    day4pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[23].weather[0].icon + '@2x.png');
    // date1.innerText = cityForecast[currentPosition].n
    date4Low.innerText = cityForecast[currentPosition].list[23].main.temp_min;
    date4High.innerText = cityForecast[currentPosition].list[23].main.temp_max;
    day5pic.setAttribute('src', 'http://openweathermap.org/img/wn/' + cityForecast[currentPosition].list[31].weather[0].icon + '@2x.png');
    // date1.innerText = cityForecast[currentPosition].n
    date5Low.innerText = cityForecast[currentPosition].list[31].main.temp_min;
    date5High.innerText = cityForecast[currentPosition].list[31].main.temp_max;
}
