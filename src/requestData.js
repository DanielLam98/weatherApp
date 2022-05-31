export const fetchWeather = async (userInput) => {
  try {
    const requestWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&APPID=62675df5924cd2fa2db831ee50a327c6`
    );
    const weather = await requestWeather.json();
    console.log(weather);
    return weather;
  } catch (error) {
    console.log(error);
    try {
      const requestWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&APPID=62675df5924cd2fa2db831ee50a327c6`
      );
      const weather = await requestWeather.json();
      console.log(weather);
      return weather;
    } catch (error) {
      console.log(error);
    }
  }
};
