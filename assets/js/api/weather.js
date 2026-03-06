const API_KEY = 'a7eeff849cc84732968174325261401';
const baseUrl = 'http://api.weatherapi.com/v1/current.json';

export const getWeather = async (lat, lon) => {
  // Construir URL con parámetros recibidos
  const url = `${baseUrl}?key=${API_KEY}&q=${lat},${lon}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const topbarContainer = document.getElementById('topbar');
    const topBar = `
    <nav class="navbar py-0 bg-body-dark">
      <div class="container-fluid">
        <p class="small m-0 mx-auto"> <img src="${data.current.condition.icon}" width=30 /> Clima actual: ${data.current.temp_c}°C - Humedad ambiental: ${data.current.humidity}%</p>
      </div>
    </nav>`;

    topbarContainer.innerHTML = topBar;
  } catch (error) {
    console.error(error);
  }
};
