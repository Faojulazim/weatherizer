import { imageAlgorithm } from "./imageAlgorithm.js";
import loading from "./loading.js";
import errorCheck from "./error.js";

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const all_info_wrapper = document.querySelector("#all-info-wrapper");
const search_container = document.querySelector("#search-container");
const unit_button = document.querySelector("#unit-button");
const units_dropdown = document.querySelector("#units-dropdown");
const switchUnits = document.querySelector("#switchUnits");
const dropdownIcon = document.querySelectorAll("[data-dropdownIcon]");
const tempBtns = document.querySelectorAll("[data-tempBtns]");
const speedBtns = document.querySelectorAll("[data-speedBtns]");
const precipitationBtns = document.querySelectorAll("[data-precipitationBtns]");
const searchDiv = document.querySelector("#searchDiv");
const errorDiv = document.querySelector("#errorDiv");

let startingIndex = 15;
let endingIndex = 23;
let todayNow = "";
let today = "";
let daysData = [];
let daysWeatherCode = [];
let isAlreadyRendered = false;
let metric_imperial = "metric";
let unitsGlobal = "celsius";
let speedUnit = "kmh";
let precipitation = "mm";
let searchCityPrev = "";
let searchCity = "";
let selectedCity = "";
let latlong;

await errorCheck();

function btnForeach(btns, btnCategory) {
  btns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      if (btnCategory == "temperature") {
        unitsGlobal = btn.id;
        helperFuncForBtns();
      } else if (btnCategory == "speed") {
        speedUnit = btn.id;
        helperFuncForBtns();
      } else if (btnCategory == "precipitation") {
        precipitation = btn.id;
        helperFuncForBtns();
      }
      updateButtonGroup(btns, btn.id);
    });
  });
}

async function helperFuncForBtns(err) {
  if (err) return;
  if (searchCity) {
    const searchedData = await getSearch(searchCity, true, 1);
    getWeather(
      searchedData.results[0].latitude,
      searchedData.results[0].longitude,
      unitsGlobal,
      speedUnit,
      precipitation
    );
  }
}

btnForeach(tempBtns, "temperature");
btnForeach(speedBtns, "speed");
btnForeach(precipitationBtns, "precipitation");

function helperParameterFunc(unit) {
  metric_imperial = unit;
  unitsGlobal = unit == "imperial" ? "fahrenheit" : "celsius";
  speedUnit = unit == "imperial" ? "mph" : "kmh";
  precipitation = unit == "imperial" ? "inch" : "mm";
  updateButtonGroup(tempBtns, unitsGlobal);
  updateButtonGroup(speedBtns, speedUnit);
  updateButtonGroup(precipitationBtns, precipitation);
}
switchUnits.addEventListener("click", async (e) => {
  helperParameterFunc(metric_imperial === "metric" ? "imperial" : "metric");
  switchUnits.innerText = `Switch to ${
    metric_imperial === "metric" ? "Imperial" : "Metric"
  }`;
  helperFuncForBtns();
});

function updateButtonGroup(btns, activeId) {
  btns.forEach((btn) => {
    const checkmark = btn.querySelector("#checkmark");
    if (btn.id === activeId) {
      btn.classList.add("bg-Neutral700");
      checkmark.classList.remove("hidden");
    } else {
      btn.classList.remove("bg-Neutral700");
      checkmark.classList.add("hidden");
    }
  });
}

unit_button.addEventListener("click", (e) => {
  units_dropdown.classList.toggle("hidden");
  document
    .querySelector("#firstButtonDropdownIcon")
    .classList.toggle("rotate-180");
});

function dropdownFunc(dropdownDiv, secondIcon) {
  document.body.addEventListener("click", (e) => {
    if (
      e.target.closest("#units-dropdown") ||
      e.target.closest("#unit-button") ||
      e.target.closest("#daydropdownBtn") ||
      e.target.closest("#days-dropdown")
    ) {
      return;
    } else {
      dropdownDiv.classList.add("hidden");
      document
        .querySelector("#firstButtonDropdownIcon")
        .classList.remove("rotate-180");
      if (!secondIcon) return;
      secondIcon.classList.remove("rotate-180");
    }
  });
}
dropdownFunc(units_dropdown);

async function getWeather(lat, lon, tempUnit, speedUnit, precipitation) {
  const urlOneDay = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,apparent_temperature,precipitation,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,wind_speed_10m_max&temperature_unit=${tempUnit}&wind_speed_unit=${speedUnit}&precipitation_unit=${precipitation}&forecast_days=1&timezone=auto
`;
  const urlSevenDays = `https://api.open-meteo.com/v1/forecast?
latitude=${lat}&longitude=${lon}&
current_weather=true&
hourly=temperature_2m,apparent_temperature,precipitation,relativehumidity_2m,weathercode&
daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,wind_speed_10m_max,weathercode&
temperature_unit=${tempUnit}&
wind_speed_unit=${speedUnit}&
precipitation_unit=${precipitation}&
forecast_days=7&
timezone=auto`;
  const [responseOneDay, responseSevenDays] = await Promise.all([
    fetch(urlOneDay),
    fetch(urlSevenDays),
  ]);
  const dataJsonOneDay = await responseOneDay.json();
  const dataJsonSevenDays = await responseSevenDays.json();
  renderHTML(dataJsonOneDay, dataJsonSevenDays);
}

async function getSearch(query, isRunnable = true, count = 5) {
  const city = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=${Number(
    count
  )}`;
  const cityData = await fetch(city);
  const cityJson = await cityData.json();
  if (isRunnable) return cityJson;
  searchFunc(cityJson, query);
}

async function searchFunc(cityJson, query) {
  search_container.innerHTML = "";
  let searchHTML = "";
  if (cityJson.results) {
    search_container.classList.add("p-2");
    searchHTML += cityJson.results
      .map(
        (item) => `
    <div id="${item.name}"
      data-searchcard
      class="px-5 py-2 cursor-pointer rounded-lg hover:bg-Neutral700 border border-Neutral800 hover:border-Neutral600 transition-all"
    >
      <h2>${item.name}, ${item.country}</h2>
    </div>`
      )
      .join("");
    search_container.innerHTML = searchHTML;

    searchClick();
  } else {
    search_container.classList.remove("p-2");
  }
}

searchInput.addEventListener("input", (e) => {
  if (!e.target.value) {
    search_container.classList.remove("p-2");
    search_container.innerHTML = "";
    return;
  }
  getSearch(e.target.value, false);
});

async function searchClick(err) {
  setTimeout(() => {
    const searchCard = document.querySelectorAll("[data-searchcard");
    searchCard.forEach((cards) => {
      cards.addEventListener("click", (e) => {
        searchInput.value = cards.querySelector("h2").innerText;
        selectedCity = cards.querySelector("h2").innerText;
        searchCity = cards.id;
        search_container.innerHTML = "";
        search_container.classList.remove("p-2");
      });
    }, 200);
  });
}

searchBtn.addEventListener("click", async (e) => {
  if (!searchCity) return;
  if (searchCityPrev) {
    if (
      searchCity.trim().replaceAll(" ", "").toLowerCase() ==
      searchCityPrev.trim().replaceAll(" ", "").toLowerCase()
    ) {
      loading(true);
    } else {
      loading(false);
    }
  } else {
    loading(false);
  }
  searchCityPrev = searchCity;

  let searchTag = await getSearch(searchCity, true, 1);
  latlong = {
    latitude: searchTag.results[0].latitude,
    longitude: searchTag.results[0].longitude,
  };
  setTimeout(() => {
    getWeather(
      latlong.latitude,
      latlong.longitude,
      unitsGlobal,
      speedUnit,
      precipitation
    );
  }, 500);
});

function getHours(currentDate, weatherFind) {
  let currentVal;
  for (let i = 0; i <= weatherFind.length; i++) {
    if (currentDate == i) {
      currentVal = weatherFind[i];
    }
  }
  return currentVal;
}

function findDayName(date) {
  const dayName = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  return dayName;
}

function getHourlyForecast(dataJsonSevenDays, startingIndex, endingIndex) {
  let hoursTemp = dataJsonSevenDays.hourly.temperature_2m.slice(
    startingIndex,
    endingIndex
  );
  let hoursWeatherCode = dataJsonSevenDays.hourly.weathercode.slice(
    startingIndex,
    endingIndex
  );
  let hourArr = [];
  for (let i = startingIndex; i < endingIndex; i++) {
    hourArr.push(i);
  }
  return {
    hoursData: hoursTemp,
    weathercodes: hoursWeatherCode,
    hours: hourArr,
  };
}

function getJsDate(dayName, dailyDates) {
  return dailyDates.find((date) => {
    const weekday = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return weekday === dayName;
  });
}

function renderHTML(data, dataSevenDays) {
  daysData = [];
  daysWeatherCode = [];
  let cards = "";
  let cardsHourly = "";

  let weatherArr = {
    current_weather: data.current_weather,
    daily: data.daily,
    daily_units: data.daily_units,
    hourly: data.hourly,
    timezone: data.timezone,
    current_units: data.current_weather_units,
    hourly_units: data.hourly_units,
  };

  let currentDate = new Date(weatherArr.current_weather.time).getHours();

  let currentHourlyForecastArr = getHourlyForecast(
    dataSevenDays,
    startingIndex,
    endingIndex
  );

  dataSevenDays.daily.time.map((items, index) => {
    cards += `<div
                  class="flex flex-col items-center bg-Neutral800 border-Neutral300/20 border rounded-lg p-3"
                  >
                    <p class="text-lg">${findDayName(items).slice(0, 3)}</p>
                    <img
                      class="w-[60px] py-4"
                      src="${imageAlgorithm(
                        Number(dataSevenDays.daily.weathercode[index])
                      )}"
                      alt=""
                    />
                    <div class="flex items-center justify-between w-full">
                      <p>${dataSevenDays.daily.temperature_2m_max[index]}°</p>
                      <p class="text-Neutral200">${
                        dataSevenDays.daily.temperature_2m_min[index]
                      }°</p>
                    </div>
                  </div>`;
  });

  currentHourlyForecastArr.hoursData.map((items, index) => {
    cardsHourly += `
                  <div
                id="card"
                class="flex items-center justify-between bg-Neutral700 rounded-lg px-3 border border-Neutral200/10"
              >
                <div class="flex items-center gap-x-2 py-2">
                  <img
                    class="w-[40px]"
                    src="${imageAlgorithm(
                      currentHourlyForecastArr.weathercodes[index]
                    )}"
                    alt=""
                  />
                  <p class="uppercase text-lg">${
                    currentHourlyForecastArr.hours[index] % 12
                  } PM</p>
                </div>
                <p class="mr-1">${items}°</p>
              </div>`;
  });

  all_info_wrapper.innerHTML = "";
  all_info_wrapper.innerHTML = `<div
          class="flex flex-col xl:flex-row mt-5 xl:mt-12 items-stretch h-full gap-x-7"
          id="all-info-container"
        >
          <div class="w-full xl:w-[70%] h-full">
            <div class="h-full w-full" id="weather-forecast-section">
              <div
                id="weather-layout-container"
                class="flex flex-col items-center justify-center mt-7 xl:mt-0 relative rounded-2xl py-10 overflow-hidden w-full bg-[url('../assets/images/bg-today-small.svg')] 600:bg-[url('../assets/images/bg-today-large.svg')] bg-cover bg-[0_90%] 600:bg-[0%_60%] bg-no-repeat h-full"
              >
                <div
                  class="flex flex-col md:flex-row md:px-7 justify-between md:py-10 items-center mt-4 font-DMSans w-full"
                >
                  <div
                    id="primary-card"
                    class="flex flex-col gap-y-1 md:gap-y-2 items-center md:items-start"
                  >
                    <h1 class="font-[600] text-center text-3xl md:text-4xl">
                      ${selectedCity}
                    </h1>

                    <p class="md:text-lg">${new Date(
                      weatherArr.current_weather.time
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}</p>
                  </div>
                  <div
                    class="flex mt-2 md:mt-0 items-center justify-between px-5 md:px-0 md:pr-2 md:gap-x-5"
                  >
                    <img
                      class="w-[120px]"
                      src="${imageAlgorithm(
                        Number(weatherArr.current_weather.weathercode)
                      )}"
                      alt=""
                    />
                    <h1 class="text-6xl 375:text-7xl 500:text-8xl font-[700] italic">
                    ${weatherArr.current_weather.temperature}°</h1>
                  </div>
                </div>
              </div>
              <div
                id="additional-info-container"
                class="font-DMSans grid grid-cols-[repeat(1,minmax(50px,1fr))] 425:grid-cols-[repeat(2,minmax(50px,1fr))] 600:grid-cols-[repeat(3,minmax(50px,1fr))] md:grid-cols-[repeat(4,minmax(50px,1fr))] gap-4 lg:gap-5 mt-5"
              >
                <div
                  id="card"
                  class="flex flex-col gap-y-4 text-Neutral200 bg-Neutral800 px-4 py-3 rounded-lg border border-Neutral300/20"
                >
                  <h3 class="text-lg">Feels Like</h3>
                  <h1 class="text-3xl text-white">${getHours(
                    currentDate,
                    weatherArr.hourly.apparent_temperature
                  )}°</h1>
                </div>
                <div
                  id="card"
                  class="flex flex-col gap-y-4 text-Neutral200 bg-Neutral800 px-4 py-3 rounded-lg border border-Neutral300/20"
                >
                  <h3 class="text-lg">Humidity</h3>
                  <h1 class="text-3xl text-white">${getHours(
                    currentDate,
                    weatherArr.hourly.relativehumidity_2m
                  )}%</h1>
                </div>
                <div
                  id="card"
                  class="flex flex-col gap-y-4 text-Neutral200 bg-Neutral800 px-4 py-3 rounded-lg border border-Neutral300/20"
                >
                  <h3 class="text-lg">Wind</h3>
                  <h1 class="text-3xl text-white">
                  ${weatherArr.current_weather.windspeed}
                  ${weatherArr.current_units.windspeed}</h1>
                </div>
                <div
                  id="card"
                  class="flex flex-col gap-y-4 text-Neutral200 bg-Neutral800 px-4 py-3 rounded-lg border border-Neutral300/20"
                >
                  <h3 class="text-lg">Precipitation</h3>
                  <h1 class="text-3xl text-white">${
                    weatherArr.daily.precipitation_sum
                  }
                  ${weatherArr.daily_units.precipitation_sum}</h1>
                </div>
              </div>
              <div id="forecast-info-container" class="font-DMSans mt-7">
                <p class="font-[500] text-lg">Daily Forecast</p>
                <div
                  id="forecast-container"
                  class="mt-3 grid grid-cols-[repeat(3,minmax(50px,1fr))] 425:grid-cols-[repeat(3,minmax(50px,1fr))] 500:grid-cols-[repeat(4,minmax(50px,1fr))] 
                  600:grid-cols-[repeat(5,minmax(50px,1fr))] md:grid-cols-[repeat(7,minmax(50px,1fr))] gap-4"
                >     
                ${cards}
                </div>
              </div>
            </div>
          </div>
          <div id="hourlyForecast"
            class="font-DMSans rounded-lg px-4 py-3 mt-5 xl:mt-0 flex flex-col gap-y-3 min-h-full w-full xl:w-[30%] bg-Neutral800 lg:rounded-2xl"
          >
            <div class="flex items-center justify-between cursor-pointer">
            <p class="font-[500] text-lg">Hourly Forecast</p>
            <div class="relative" id="daydropdownBtn">
              <div
                class="flex items-center px-3 py-[6px] gap-x-2 bg-Neutral600 rounded-md"
              >
                <p id="currentDayName">${
                  today
                    ? today
                    : findDayName(dataSevenDays.current_weather.time)
                }</p>
                <img class="" data-dropdownIcon src="assets/images/icon-dropdown.svg" alt="" />
              </div>
              <div
                class="absolute top-[45px] border border-Neutral600 bg-Neutral800 hidden right-0 p-2 rounded-lg w-[200px]" id="days-dropdown"
              >
                <h1 class="px-2 py-2 rounded-lg" data-daySelectionBtn>Monday</h1>
                <h1 class="px-2 py-2 rounded-lg" data-daySelectionBtn>Tuesday</h1>
                <h1 class="px-2 py-2 rounded-lg" data-daySelectionBtn>Wednesday</h1>
                <h1 class="px-2 py-2 rounded-lg" data-daySelectionBtn>Thursday</h1>
                <h1 class="px-2 py-2 rounded-lg" data-daySelectionBtn>Friday</h1>
                <h1 class="px-2 py-2 rounded-lg" data-daySelectionBtn>Saturday</h1>
                <h1 class="px-2 py-2 rounded-lg" data-daySelectionBtn>Sunday</h1>
              </div>
            </div>
          </div>
            <div class="flex flex-col gap-y-4 mt-2">
              ${cardsHourly}
            </div>
          </div>
        </div>`;

  let daydropdownBtn = document.querySelector("#daydropdownBtn");
  let day_dropdown = document.querySelector("#days-dropdown");
  let currentDayName = document.querySelector("#currentDayName");

  let daySelectionBtns = document.querySelectorAll("[data-daySelectionBtn]");
  daydropdownBtn.addEventListener("click", (e) => {
    day_dropdown.classList.toggle("hidden");
    document
      .querySelector("#daydropdownBtn")
      .querySelector("img")
      .classList.toggle("rotate-180");
  });

  dropdownFunc(
    day_dropdown,
    document.querySelector("#daydropdownBtn").querySelector("img")
  );

  let dayBtns = document.querySelectorAll("[data-daySelectionBtn]");

  dayBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btn.classList.add("bg-Neutral700");
      currentDayName.innerText = btn.innerText;
      dayBtns.forEach((items) => {
        if (btn !== items) {
          items.classList.remove("bg-Neutral700");
        }
      });
    });
  });

  daySelectionBtns.forEach((items) => {
    if (today) {
      if (today === items.innerText) {
        items.classList.add("bg-Neutral700");
      }
    } else {
      const dayName = findDayName(dataSevenDays.current_weather.time);
      if (dayName === items.innerText) {
        items.classList.add("bg-Neutral700");
      }
    }

    items.addEventListener("click", (e) => {
      today = items.innerText;
      const clickedDateData = getJsDate(today, dataSevenDays.daily.time);
      const indexOfClickedDate = dataSevenDays.hourly.time.indexOf(
        clickedDateData + "T15:00"
      );
      const indexOfClickedDateEnd = indexOfClickedDate + 8;
      startingIndex = Number(indexOfClickedDate);
      endingIndex = Number(indexOfClickedDateEnd);
      helperFuncForBtns();
    });
  });
}
