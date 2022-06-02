const fetchWeather = async (userInput) => {
  try {
    const requestWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&hourly.pop&APPID=62675df5924cd2fa2db831ee50a327c6`
    );
    const weather = await requestWeather.json();
    return weather;
  } catch (error) {
    console.log(error);
    try {
      const requestWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&units=metric&APPID=62675df5924cd2fa2db831ee50a327c6`
      );
      const weather = await requestWeather.json();
      console.log(weather);
      return weather;
    } catch (error) {
      console.log(error);
    }
  }
};

const fetchForecast = async (userInput) => {
  try {
    const requestWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=metric&appid=62675df5924cd2fa2db831ee50a327c6`
    );
    const weather = await requestWeather.json();
    return weather.list;
  } catch (error) {
    console.log(error);
  }
};

export { fetchWeather, fetchForecast };
