const apiKey = "27a92f20a2eaad2c347ca3eae88a0d31";

const allCities = [
  "Tokyo","Delhi","Shanghai","Sao Paulo","Mexico City","Cairo","Mumbai","Beijing","Dhaka","Osaka",
  "New York","Karachi","Buenos Aires","Chongqing","Istanbul","Kolkata","Manila","Lagos","Rio de Janeiro","Tianjin",
  "Kinshasa","Guangzhou","Los Angeles","Moscow","Shenzhen","Lahore","Bangalore","Paris","Bogota","Jakarta",
  "Chennai","Lima","Bangkok","Seoul","Nagoya","Hyderabad","London","Tehran","Chicago","Chengdu",
  "Nanjing","Wuhan","Ho Chi Minh City","Luanda","Ahmedabad","Kuala Lumpur","Xi’an","Hong Kong","Dongguan","Hangzhou",
  "Foshan","Shenyang","Riyadh","Baghdad","Santiago","Surat","Madrid","Suzhou","Pune","Harbin",
  "Houston","Dallas","Toronto","Dar es Salaam","Miami","Belo Horizonte","Singapore","Philadelphia","Atlanta","Fukuoka",
  "Khartoum","Barcelona","Johannesburg","Saint Petersburg","Qingdao","Dalian","Washington","Yangon","Alexandria","Jinan",
  "Guadalajara","Boston","Zhengzhou","Melbourne","Sydney","Kunming","Shantou","Hangzhou","Monterrey","San Francisco",
  "Phoenix","Rabat","Casablanca","Nairobi","Cape Town","Accra","Kampala","Addis Ababa","Abuja","Kano",
  "Port Harcourt","Yaounde","Douala","Lusaka","Harare","Kigali","Antananarivo","Darwin","Brisbane","Perth",
  "Adelaide","Canberra","Wellington","Auckland","Christchurch","Hamilton","Tokyo Metropolis","Osaka City","Yokohama","Nagoya City",
  "Fukuoka City","Kobe","Kyoto","Sapporo","Sendai","Hiroshima","Kitakyushu","Chiba","Saitama","Okayama",
  "Niigata","Hamamatsu","Sakai","Shizuoka","Kawasaki","Kitchener","Winnipeg","Montreal","Vancouver","Ottawa",
  "Quebec City","Edmonton","Calgary","Halifax","Hamilton Canada","Regina","Saskatoon","St. Louis","Detroit","Minneapolis",
  "Seattle","Portland","San Diego","San Jose","Austin","Fort Worth","Columbus","Charlotte","Indianapolis","San Antonio",
  "Jacksonville","Memphis","El Paso","Louisville","Baltimore","Milwaukee","Albuquerque","Tucson","Fresno","Sacramento",
  "Kansas City","Mesa","Omaha","Colorado Springs","Raleigh","Miami Beach","Tampa","Orlando","St. Petersburg","Havana",
  "Kingston","Montevideo","Asuncion","La Paz","Sucre","Quito","Guayaquil","Lima City","Bogota City","Medellin",
  "Cali","Barranquilla","Caracas","Maracaibo","Santo Domingo","San Juan","Guatemala City","Tegucigalpa","San Salvador","Managua",
  "Belmopan","Port-au-Prince","Santiago de Cuba","Quito City","Cusco","Arequipa","La Serena","Valparaiso","Santiago Chile","Buenos Aires City",
  "Cordoba Argentina","Rosario","Mar del Plata","Montevideo City","Salvador Brazil","Fortaleza","Recife","Brasilia","Curitiba","Porto Alegre",
  "Campinas","Goiania","Belem Brazil","Manaus","Belo Horizonte City","Uberlandia","Sorocaba Brazil","Londrina","Joao Pessoa","Maceio",
  "Natal Brazil","Teresina","Aracaju","Ceara Brazil","Campo Grande","Cuiaba","Vitoria Brazil","Florianopolis","Blumenau","Joinville",
  "Sao Luis","Petropolis","Petrópolis Brazil","Rennes","Lille","Toulouse","Nice France","Bordeaux","Marseille","Lyon",
  "Paris France","Rome Italy","Milan","Naples Italy","Turin","Palermo","Bucharest","Vienna Austria","Prague Czech Republic","Warsaw",
  "Budapest","Munich","Hamburg","Frankfurt","Cologne","Berlin Germany","Dusseldorf","Stuttgart","Dortmund","Essen",
  "Leipzig","Dresden","Hanover","Nurnberg","Bremen","Hannover","Amsterdam Netherlands","Rotterdam","The Hague","Utrecht",
  "Antwerp","Brussels","Ghent","Charleroi","Liège","Bruges","Zurich Switzerland","Geneva","Basel","Lausanne",
  "Bern","Lucerne","Stuttgart Urban","Oslo Norway","Stockholm Sweden","Gothenburg","Malmo","Helsinki Finland","Copenhagen Denmark",
  "Reykjavik","Tallinn","Riga","Vilnius","Minsk","Moscow City","St. Petersburg Russia","Kazan","Yekaterinburg","Novosibirsk",
  "Samara Russia","Ufa","Omsk","Chelyabinsk","Perm Russia","Krasnoyarsk","Voronezh","Volgograd","Rostov-on-Don","Sochi",
  "Ankara Turkey","Istanbul Turkey","Izmir Turkey","Bursa","Adana","Gaziantep","Konya","Antalya","Kayseri","Mersin",
  "Athens Greece","Thessaloniki","Patras","Heraklion","Larissa","Nicosia Cyprus","Limassol","Larnaca","Belgrade Serbia","Zagreb Croatia",
  "Ljubljana Slovenia","Sarajevo Bosnia","Skopje North Macedonia","Podgorica Montenegro","Tirana Albania","Pristina Kosovo","Sofia Bulgaria","Bucharest Romania","Cluj-Napoca","Iasi",
  "Timisoara","Constanta","Brasov","Craiova","Turda","Suceava","Galati","Ploiesti","Oradea","Baia Mare",
  "Chisinau Moldova","Trollhattan Sweden","Uppsala Sweden","Linkoping Sweden","Orebro Sweden","Eskilstuna Sweden","Norrkoping Sweden","Huddinge Sweden","Sollentuna Sweden","Sundbyberg Sweden"
];


// Random cities helper
function getRandomCities(list, count) {
  return [...list].sort(() => 0.5 - Math.random()).slice(0, count);
}

let searchHistory = [];

// Get weather for main city
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if(data.cod !== 200){
      document.getElementById("mainWeather").innerHTML = `
        <div class="text-center py-5 text-danger">City not found. Try again!</div>
      `;
      return;
    }

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    // Render main weather card
    document.getElementById("mainWeather").innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-4 text-center border-end">
          <h4 class="fw-semibold">${data.name}, ${data.sys.country}</h4>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">
          <h1 class="display-4 fw-bold">${Math.round(data.main.temp)}°C</h1>
          <p class="text-capitalize text-muted">${data.weather[0].description}</p>
          <small class="text-muted">Feels like ${Math.round(data.main.feels_like)}°C</small>
        </div>
        <div class="col-md-8">
          <div class="row g-3">
            <div class="col-6 col-lg-4"><div class="info-box"><i class="bi bi-droplet-fill"></i><span>Humidity</span><strong>${data.main.humidity}%</strong></div></div>
            <div class="col-6 col-lg-4"><div class="info-box"><i class="bi bi-wind"></i><span>Wind</span><strong>${data.wind.speed} m/s</strong></div></div>
            <div class="col-6 col-lg-4"><div class="info-box"><i class="bi bi-eye-fill"></i><span>Visibility</span><strong>${data.visibility / 1000} km</strong></div></div>
            <div class="col-6 col-lg-4"><div class="info-box"><i class="bi bi-arrow-down-up"></i><span>Min / Max</span><strong>${data.main.temp_min}° / ${data.main.temp_max}°</strong></div></div>
            <div class="col-6 col-lg-4"><div class="info-box"><i class="bi bi-speedometer2"></i><span>Pressure</span><strong>${data.main.pressure} hPa</strong></div></div>
            <div class="col-6 col-lg-4"><div class="info-box"><i class="bi bi-sunrise"></i><span>Sunrise</span><strong>${sunrise}</strong></div></div>
            <div class="col-6 col-lg-4"><div class="info-box"><i class="bi bi-sunset"></i><span>Sunset</span><strong>${sunset}</strong></div></div>
          </div>
        </div>
      </div>
    `;

    // Update background dynamically
    const wrapper = document.getElementById("appWrapper") || document.body;
    wrapper.className = ""; // reset classes
    const weatherMain = data.weather[0].main.toLowerCase();
    if (weatherMain.includes("cloud")) wrapper.classList.add("cloudy");
    else if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) wrapper.classList.add("rainy");
    else if (weatherMain.includes("snow")) wrapper.classList.add("snowy");
    else if (weatherMain.includes("thunder")) wrapper.classList.add("thunderstorm");
    else wrapper.classList.add("sunny");

    // Add to search history
    if (!searchHistory.find(c => c.name === data.name)) {
      searchHistory.unshift({
        name: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity
      });
      if(searchHistory.length > 10) searchHistory.pop();
    }
    renderHistory();

  } catch(err) {
    console.error(err);
    document.getElementById("mainWeather").innerHTML = `
      <div class="text-center py-5 text-danger">Error fetching data.</div>
    `;
  }
}

// Render search history
function renderHistory() {
  const historyDiv = document.getElementById("historySlider");
  historyDiv.innerHTML = "";
  searchHistory.forEach(city => {
    historyDiv.innerHTML += `
      <div class="history-card">
        <h6>${city.name}</h6>
        <p class="mb-1">Temp: ${city.temp}°C</p>
        <p class="mb-0">Humidity: ${city.humidity}%</p>
      </div>
    `;
  });
}

// Load 15 random other cities
async function loadCities() {
  const slider = document.getElementById("slider");
  slider.innerHTML = `<div class="text-muted ps-2">Loading cities...</div>`;

  let citiesToShow = 15;
  let results = [];

  while(results.length < citiesToShow){
    const randomCities = getRandomCities(allCities, citiesToShow - results.length);

    const requests = randomCities.map(city =>
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .catch(()=>({cod:404})) // ignore failed requests
    );

    const responses = await Promise.all(requests);
    responses.forEach(data => {
      if(data.cod === 200 && !results.find(c => c.name === data.name)){
        results.push(data);
      }
    });
  }

  slider.innerHTML = "";
  results.forEach(data => {
    slider.innerHTML += `
      <div class="card shadow-sm city-card text-center">
        <div class="card-body">
          <h6>${data.name}</h6>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
          <p class="fw-bold mb-0">${Math.round(data.main.temp)}°C</p>
          <small class="text-muted">${data.weather[0].main}</small>
        </div>
      </div>
    `;
  });
}

// Enter key support
document.getElementById("cityInput").addEventListener("keypress", e => {
  if(e.key === "Enter") getWeather();
});

// Initial load
loadCities();


// Compare two cities

async function compareTwoCities() {
  const city1 = document.getElementById("compareCity1").value.trim();
  const city2 = document.getElementById("compareCity2").value.trim();

  if (!city1 || !city2) {
    alert("Please enter both city names!");
    return;
  }

  try {
    const [res1, res2] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${apiKey}&units=metric`).then(r => r.json()),
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=${apiKey}&units=metric`).then(r => r.json())
    ]);

    if (res1.cod !== 200 || res2.cod !== 200) {
      alert("One or both cities not found!");
      return;
    }

    const compareDiv = document.getElementById("compareWeather");
    compareDiv.style.display = "block";

    // Decide which city is hotter
    const hotterCity = res1.main.temp > res2.main.temp ? res1.name : res2.name;

    compareDiv.innerHTML = `
      <div class="row text-center">
        <div class="col-md-6">
          <h5>${res1.name} ${res1.name === hotterCity ? "🔥" : ""}</h5>
          <img src="https://openweathermap.org/img/wn/${res1.weather[0].icon}@2x.png">
          <p>Temp: ${Math.round(res1.main.temp)}°C</p>
          <div class="temp-bar" style="width:${Math.min(res1.main.temp,50)/50*100}%"></div>
          <p>Humidity: ${res1.main.humidity}%</p>
          <p>Weather: ${res1.weather[0].main}</p>
        </div>
        <div class="col-md-6">
          <h5>${res2.name} ${res2.name === hotterCity ? "🔥" : ""}</h5>
          <img src="https://openweathermap.org/img/wn/${res2.weather[0].icon}@2x.png">
          <p>Temp: ${Math.round(res2.main.temp)}°C</p>
          <div class="temp-bar" style="width:${Math.min(res2.main.temp,50)/50*100}%"></div>
          <p>Humidity: ${res2.main.humidity}%</p>
          <p>Weather: ${res2.weather[0].main}</p>
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    alert("Error fetching data!");
  }
}


function showWeatherAdvice(temp, weather) {
  let advice = "🌤️ Weather looks pleasant today.";

  if (temp > 35) advice = "🔥 It's very hot. Stay hydrated!";
  else if (temp < 10) advice = "🧥 Cold weather. Wear warm clothes.";
  else if (weather.includes("Rain")) advice = "🌧️ Carry an umbrella.";
  else if (weather.includes("Snow")) advice = "❄️ Snowy conditions. Be careful!";
  else if (weather.includes("Thunder")) advice = "⛈️ Avoid going outside.";

  const adviceBox = document.getElementById("weatherAdvice");
  adviceBox.textContent = advice;
  adviceBox.classList.remove("d-none");
}

showWeatherAdvice(data.main.temp, data.weather[0].main);

setInterval(() => {
  loadCities();
}, 2 * 60 * 1000); // Refresh every 2 minutes



// can we make it snow in the background when it's below 0 degrees Celsius?
function updateSnowEffect(temp) {
  const wrapper = document.getElementById("appWrapper") || document.body; 
  if (temp < 0) {
    wrapper.classList.add("snow-effect");
  }
}

// Call updateSnowEffect after fetching weather data
// Example: updateSnowEffect(data.main.temp);

updateSnowEffect(data.main.temp);