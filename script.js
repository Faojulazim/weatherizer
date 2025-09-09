// Imperial (°F (Fahrenheit))
// Metric (°C (Celsius)))
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const search_container = document.querySelector("#search-container");

let searchCity;
let latlong;

async function getWeather(lat, lon, unit = "celsius") {
  const tempUnit = unit === "fahrenheit" ? "fahrenheit" : "celsius";
  const windUnit = unit === "fahrenheit" ? "mph" : "kmh";
  const precipUnit = unit === "fahrenheit" ? "inch" : "mm";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,precipitation&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&precipitation_unit=${precipUnit}&forecast_days=1&timezone=auto`;

  const response = await fetch(url);
  const dataJson = await response.json();
  console.log(dataJson);
  //   getSearch();
}
// getWeather(52.52, 13.41, "fahrenheit");
async function getSearch(query, isRunnable = true, count = 5) {
  const city = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=${Number(
    count
  )}`;
  const cityData = await fetch(city);
  const cityJson = await cityData.json();
  if (isRunnable) {
    return cityJson;
  }
  searchFunc(cityJson, query);
}
async function searchFunc(cityJson, query) {
  search_container.innerHTML = "";
  let searchHTML = "";
  if (cityJson.results) {
    search_container.classList.add("p-2");
    cityJson.results.forEach((items) => {
      searchHTML += `
      <div id="${items.name}"
        data-searchcard
          class="px-5 py-2 cursor-pointer rounded-lg hover:bg-Neutral700 border border-Neutral800 hover:border-Neutral600 transition-all"
        >
        <h2>${items.name}, ${items.country}</h2>
      </div>`;

      search_container.innerHTML = searchHTML;
      searchClick();
    });
  } else {
    search_container.classList.remove("p-2");
  }
}

searchInput.addEventListener("input", (e) => {
  if (!e.target.value) {
    search_container.classList.remove("p-2");
    return;
  }
  getSearch(e.target.value, false);
});

async function searchClick() {
  const searchCard = document.querySelectorAll("[data-searchcard");
  searchCard.forEach((cards) => {
    cards.addEventListener("click", (e) => {
      searchInput.value = cards.querySelector("h2").innerText;
      searchCity = cards.id;
      search_container.innerHTML = "";
      search_container.classList.remove("p-2");
      const searchBtn = document.querySelector("#searchBtn");
      searchBtn.addEventListener(
        "click",
        async (e) => {
          let searchTag = await getSearch(cards.id, 1, true);
          latlong = {
            latitude: searchTag.results[0].latitude,
            longitude: searchTag.results[0].longitude,
          };
          getWeather(latlong.latitude, latlong.longitude, (unit = "celcius"));
        },
        { once: true }
      );
    });
  });
}
