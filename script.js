const apiKey = "https://api.open-meteo.com/v1/forecast?latitude=";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const icon = document.getElementById("icon");

// Free geocoding + weather API (no key needed)
async function getWeather(city) {
  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      cityName.textContent = "City not found!";
      temperature.textContent = "";
      description.textContent = "";
      icon.src = "";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    const temp = weatherData.current_weather.temperature;
    const desc = weatherData.current_weather.weathercode;

    cityName.textContent = `${name}, ${country}`;
    temperature.textContent = `${temp}°C`;
    description.textContent = `Condition code: ${desc}`;
    icon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
  } catch (error) {
    cityName.textContent = "Error fetching data.";
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});