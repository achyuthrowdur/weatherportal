const form = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const clearButton = document.getElementById('clear-button');



form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cityName = cityInput.value.trim();

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d43bfa403f9cff59ea6c732eff455f81&units=metric`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
});

clearButton.addEventListener('click', () => {
    cityInput.value = '';
    weatherInfo.innerHTML = '';
    errorMessage.textContent = '';
  });

function displayWeather(data) {
  errorMessage.textContent = '';
  const { name, main, weather } = data;
  const temperature = main.temp;
  const condition = weather[0].description;


  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Condition: ${condition}</p>
  `;
}

function showError(message) {
  weatherInfo.innerHTML = '';
  errorMessage.textContent = message;
}

