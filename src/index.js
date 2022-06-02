import './css/style.css';
import './css/normalize.css';
import { fetchWeather, fetchForecast } from './requestData';
import { format } from 'date-fns';

const main = async () => {
  const data = await fetchWeather('Vancouver');
  weatherSearch();
  setTodayWeather(data.name, data.weather, data.main.temp);
  setTodayDescription(
    data.wind.speed,
    data.main.feels_like,
    data.main.humidity,
    data.clouds.all
  );
  setForecast('Vancouver');
};

const weatherSearch = async () => {
  const weatherInput = document.querySelector('input');
  const weatherSubmit = document.querySelector('.searchWeather');
  weatherSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    fetchWeather(weatherInput.value).then((result) => {
      console.log(result);
      //sends only todays weather for today div
      setTodayWeather(result.name, result.weather, result.main.temp);
      setTodayDescription(
        result.wind.speed,
        result.main.feels_like,
        result.main.humidity,
        result.clouds.all
      );
      setForecast(weatherInput.value);
    });
  });
};

const setTodayWeather = (city, data, temp) => {
  const today = document.querySelector('.today');
  today.innerHTML = '';
  const weatherMainData = data[0].main;
  const weatherDescriptionData = data[0].description;
  const weatherIconData = data[0].icon;
  const todayMain = document.createElement('h2');
  const todayTemp = document.createElement('h3');
  const cityHeader = document.createElement('h1');
  cityHeader.textContent = city;
  todayMain.textContent = weatherMainData;
  todayTemp.textContent = `${temp} °C`;
  const todayIcon = new Image();
  //grabs the icon from the openweathermap API doc
  todayIcon.src = `http://openweathermap.org/img/wn/${weatherIconData}@4x.png`;
  const todayDescription = document.createElement('p');
  todayDescription.textContent = weatherDescriptionData;
  const div = document.createElement('div');
  div.classList.add('mainAndTemp');
  today.appendChild(cityHeader);
  div.appendChild(todayMain);
  div.appendChild(todayTemp);
  today.appendChild(div);
  today.appendChild(todayIcon);
  today.appendChild(todayDescription);
};

const setTodayDescription = async (wind, feelsLike, humidity, cloud) => {
  //const todayDescription = document.querySelector('.todayDetailedDescription');
  let windDescription = `${wind} km/h`;
  let feelsDescription = `${feelsLike} °C`;
  let humidityDescription = `${humidity}%`;
  let cloudDescription = `${cloud}% for Clouds`;
  let descriptionContent = [
    windDescription,
    feelsDescription,
    humidityDescription,
    cloudDescription,
  ];

  const description = document.querySelectorAll('.descriptionValues');
  for (let i = 0; i < description.length; i++) {
    description[i].textContent = descriptionContent[i];
  }
};

const setForecast = async (city) => {
  const forecast = await fetchForecast(city);
  console.log(forecast);
  displayForecast(forecast);
};

const displayForecast = async (forecastArr) => {
  const forecastSection = document.querySelector('.bottomSection');
  forecastSection.innerHTML = '';
  for (let i = 0; i <= 39; i += 8) {
    let dailyWeatherDiv = document.createElement('div');
    dailyWeatherDiv.classList.add('dailyWeatherForecast');
    let dailyMainData = await forecastArr[i].weather[0].main;
    let dailyTempData = await forecastArr[i].main.temp;
    let dailyIconData = await forecastArr[i].weather[0].icon;
    let dailyPOPData = await forecastArr[i].pop;
    let dailyDateData = await forecastArr[i].dt_txt;
    console.log(dailyDateData.substr(5, 2));
    dailyDateData = format(
      new Date(
        dailyDateData.substr(0, 4),
        dailyDateData.substr(5, 2) - 1,
        dailyDateData.substr(8, 2)
      ),
      'MMMM dd'
    );
    let dailyMain = document.createElement('h3');
    dailyMain.textContent = dailyMainData;
    let dailyTemp = document.createElement('h4');
    dailyTemp.textContent = `${dailyTempData} °C`;
    let dailyIcon = new Image();
    dailyIcon.src = `http://openweathermap.org/img/wn/${dailyIconData}@4x.png`;
    let dailyPOP = document.createElement('h4');
    dailyPOP.textContent = `${dailyPOPData * 100}% Chance to Rain`;
    let dailyDate = document.createElement('h3');
    dailyDate.textContent = `${dailyDateData}`;

    const mainAndDate = document.createElement('div');
    mainAndDate.classList.add('mainAndDate');
    dailyWeatherDiv.appendChild(dailyMain);
    mainAndDate.appendChild(dailyTemp);
    mainAndDate.appendChild(dailyDate);
    dailyWeatherDiv.appendChild(mainAndDate);
    dailyWeatherDiv.appendChild(dailyIcon);
    dailyWeatherDiv.appendChild(dailyPOP);
    forecastSection.appendChild(dailyWeatherDiv);
  }
};

main();
