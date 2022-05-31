import './css/style.css';
import './css/normalize.css';
import { fetchWeather } from './requestData';

const main = async () => {
  const data = await fetchWeather('Vancouver');
  weatherSearch();
  setTodayWeather(data.name, data.weather, data.main.temp);
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
    });
  });
};

const setTodayWeather = (city, data, temp) => {
  console.log(temp);
  const today = document.querySelector('.today');

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
  todayIcon.src = `http://openweathermap.org/img/wn/${weatherIconData}@2x.png`;
  const todayDescription = document.createElement('p');
  todayDescription.textContent = weatherDescriptionData;
  today.appendChild(cityHeader);
  today.appendChild(todayMain);
  today.appendChild(todayTemp);
  today.appendChild(todayIcon);
  today.appendChild(todayDescription);
};

const setTodayDescription = (wind, feelsLike, humidity, chanceRain) => {
  const todayDescription = document.querySelector('.todayDetailedDescription');
  const windDescription = document.querySelector('');
};

main();
