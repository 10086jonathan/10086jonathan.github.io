// constants and variables
const { openWeatherAPIKey } = CONFIG;

API_KEY = openWeatherAPIKey;

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

let weatherData, userInput;

// cached elements references
const $title = $('#title');
const $temp = $('#temp');
const $index = $('#index');
const $desc = $('#desc');
const $img = $('img');

const $form = $('form');
const input = $('input[type="text"]');

// event listeners
$form.on('submit', handleGetData)

// functions
function handleGetData(event) {
    event.preventDefault();

    userInput = input.val();

    if(!userInput) return;

    $.ajax(`${BASE_URL}q=${userInput}&units=imperial&appid=${API_KEY}`)
    .then(function(data) {
        weatherData = data;
        render();

    }, function(error) {
        console.log('ERROR: ', error);
    });
}

function render() {
    $title.text('Weather For: ' + weatherData.name);
    $temp.text('Temperature: ' + Math.round(weatherData.main.temp) + '°');
    $index.text('Feels Like: ' + Math.round(weatherData.main.feels_like) + '°');
    $desc.text('Weather: ' + weatherData.weather[0].main);
    $img.attr('src', 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png');
}