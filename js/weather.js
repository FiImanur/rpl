class Weather {
  constructor(data) {
    this.location = data.name;
    this.temp = data.main.temp;
    this.description = data.weather[0].description;
    this.windSpeed = data.wind.speed;
    this.humidity = data.main.humidity;
    this.feelsLike = data.main.feels_like;
    this.sunrise = data.sys.sunrise;
    this.sunset = data.sys.sunset;
    this.lon = data.coord.lon;
    this.lat = data.coord.lat;
    this.iconCode = data.weather[0].icon;
  }

  getFormattedTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
  }

  updateUI() {
    document.getElementById('location').textContent = this.location;
    document.getElementById('temperature').textContent = `${this.temp}°C`;
    document.getElementById('description').textContent = this.description;
    document.getElementById('wind').textContent = `${this.windSpeed} km/h`;
    document.getElementById('humidity').textContent = `${this.humidity}%`;

    // document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${this.iconCode}.png`;
    // document.getElementById('weather-icon').src = `https://www.weatherbit.io/static/img/icons/t04n.png`;
    document.getElementById('weather-icon').src = `https://img.icons8.com/ios/452/partly-cloudy-night.png`;
    // document.getElementById('weather-icon').src = `https://cdn.iconfinder.com/data/icons/weather-429/64/weather_icons_color-12-512.png`;
    


    document.getElementById('lon').textContent = this.lon;
    document.getElementById('lat').textContent = this.lat;
    document.getElementById('feels-like').textContent = `${this.feelsLike}°C`;
    document.getElementById('sunrise').textContent = this.getFormattedTime(this.sunrise);
    document.getElementById('sunset').textContent = this.getFormattedTime(this.sunset);
  }
}

let weather;

document.addEventListener("DOMContentLoaded", function() {
  fetch('json/weather.json')
    .then(response => response.json())
    .then(data => {
      weather = new Weather(data);
      weather.updateUI();
      populateDetails();
    })
    .catch(error => console.error('Error fetching weather data:', error));
});
