let all_info_wrapper = document.querySelector("#all-info-wrapper");
export default function loading(isLoaded) {
  if (isLoaded) return;
  all_info_wrapper.innerHTML = `<div
      class="flex flex-col xl:flex-row mt-5 xl:mt-12 items-stretch h-full gap-x-7"
      id="all-info-container"
    >
      <div class="w-full xl:w-[70%] h-full">
        <div class="h-full" id="weather-forecast-section">
          <div
            id="weather-layout-container"
            class="flex flex-col items-center justify-center mt-7 xl:mt-0 relative rounded-2xl py-10 overflow-hidden w-full bg-[url('../assets/images/bg-today-small.svg')] 600:bg-[url('../assets/images/bg-today-large.svg')] bg-cover bg-[0_90%] 600:bg-[0%_60%] bg-no-repeat h-full"
          >
            <div id="loading-state">
              <div class="absolute inset-0 z-[2000] pointer-events-none w-full h-full bg-Neutral800">
                <img
                  class="object-cover h-full w-full"
                  src="assets/images/bg-small-effect.svg"
                  alt=""
                />
              </div>
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] flex flex-col items-center">
                <h1 class="text-white text-2xl">Loading...</h1>
                <img
                  style="animation-duration: 1.3s"
                  class="animate-spin mt-2 w-[30px]"
                  src="assets/images/icon-loading.svg"
                  alt=""
                />
              </div>
            </div>
            <img
              class="absolute hidden 600:block h-full w-full top-0 left-0 object-cover -z-[200]"
              src="assets/images/bg-today-large.svg"
              alt=""
            />
            <div class="flex flex-col md:flex-row md:px-7 justify-between md:py-10 items-center mt-4 font-DMSans w-full">
              <div
                id="primary-card"
                class="flex flex-col gap-y-1 md:gap-y-2 items-center md:items-start"
              >
                <h1 class="font-[600] text-3xl md:text-4xl">Berlin, Germany</h1>
                <p class="md:text-lg">Tuesday, Aug 5, 2025</p>
              </div>
              <div class="flex mt-2 md:mt-0 items-center justify-between px-5 md:px-0 md:pr-2 md:gap-x-5">
                <img
                  class="w-[120px]"
                  src="assets/images/icon-sunny.webp"
                  alt=""
                />
                <h1 class="text-8xl font-[700] italic">20°</h1>
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
              <h1 class="text-3xl text-white">-</h1>
            </div>
            <div
              id="card"
              class="flex flex-col gap-y-4 text-Neutral200 bg-Neutral800 px-4 py-3 rounded-lg border border-Neutral300/20"
            >
              <h3 class="text-lg">Humidity</h3>
              <h1 class="text-3xl text-white">-</h1>
            </div>
            <div
              id="card"
              class="flex flex-col gap-y-4 text-Neutral200 bg-Neutral800 px-4 py-3 rounded-lg border border-Neutral300/20"
            >
              <h3 class="text-lg">Wind</h3>
              <h1 class="text-3xl text-white">-</h1>
            </div>
            <div
              id="card"
              class="flex flex-col gap-y-4 text-Neutral200 bg-Neutral800 px-4 py-3 rounded-lg border border-Neutral300/20"
            >
              <h3 class="text-lg">Precipitation</h3>
              <h1 class="text-3xl text-white">-</h1>
            </div>
          </div>
          <div id="forecast-info-container" class="font-DMSans mt-7">
            <p class="font-[500] text-lg">Daily Forecast</p>
            <div
              id="forecast-container"
              class="mt-3 grid grid-cols-[repeat(3,minmax(50px,1fr))] 425:grid-cols-[repeat(3,minmax(50px,1fr))] 500:grid-cols-[repeat(4,minmax(50px,1fr))] 
                  600:grid-cols-[repeat(5,minmax(50px,1fr))] md:grid-cols-[repeat(7,minmax(50px,1fr))] gap-4"
            >
              <div class="flex flex-col items-center bg-Neutral800 border-Neutral300/20 border rounded-lg p-3">
                <p class="text-lg invisible">Tue</p>
                <img
                  class="w-[60px] py-4 invisible"
                  src="assets/images/icon-rain.webp"
                  alt=""
                />
                <div class="flex items-center justify-between w-full invisible">
                  <p>20°</p>
                  <p class="text-Neutral200">14°</p>
                </div>
              </div>
              <div class="flex flex-col items-center bg-Neutral800 border-Neutral300/20 border rounded-lg p-3">
                <p class="text-lg invisible">Wed</p>
                <img
                  class="w-[60px] py-4 invisible"
                  src="assets/images/icon-drizzle.webp"
                  alt=""
                />
                <div class="flex items-center justify-between w-full invisible">
                  <p>21°</p>
                  <p class="text-Neutral200">15°</p>
                </div>
              </div>
              <div class="flex flex-col items-center bg-Neutral800 border-Neutral300/20 border rounded-lg p-3">
                <p class="text-lg invisible">Thu</p>
                <img
                  class="w-[60px] py-4 invisible"
                  src="assets/images/icon-sunny.webp"
                  alt=""
                />
                <div class="flex items-center justify-between w-full invisible">
                  <p>24°</p>
                  <p class="text-Neutral200">14°</p>
                </div>
              </div>
              <div class="flex flex-col items-center bg-Neutral800 border-Neutral300/20 border rounded-lg p-3">
                <p class="text-lg invisible">Fri</p>
                <img
                  class="w-[60px] py-4 invisible"
                  src="assets/images/icon-partly-cloudy.webp"
                  alt=""
                />
                <div class="flex items-center justify-between w-full invisible">
                  <p>25°</p>
                  <p class="text-Neutral200">13°</p>
                </div>
              </div>
              <div class="flex flex-col items-center bg-Neutral800 border-Neutral300/20 border rounded-lg p-3">
                <p class="text-lg invisible">Sat</p>
                <img
                  class="w-[60px] py-4 invisible"
                  src="assets/images/icon-storm.webp"
                  alt=""
                />
                <div class="flex items-center justify-between w-full invisible">
                  <p>21°</p>
                  <p class="text-Neutral200">15°</p>
                </div>
              </div>
              <div class="flex flex-col items-center bg-Neutral800 border-Neutral300/20 border rounded-lg p-3">
                <p class="text-lg invisible">Sun</p>
                <img
                  class="w-[60px] py-4 invisible"
                  src="assets/images/icon-snow.webp"
                  alt=""
                />
                <div class="flex items-center justify-between w-full invisible">
                  <p>25°</p>
                  <p class="text-Neutral200">16°</p>
                </div>
              </div>
              <div class="flex flex-col items-center bg-Neutral800 border-Neutral300/20 border rounded-lg p-3">
                <p class="text-lg invisible">Mon</p>
                <img
                  class="w-[60px] py-4 invisible"
                  src="assets/images/icon-fog.webp"
                  alt=""
                />
                <div class="flex items-center justify-between w-full invisible">
                  <p>24°</p>
                  <p class="text-Neutral200">15°</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="forecast-info-container"
        class="font-DMSans rounded-lg px-4 py-3 mt-5 xl:mt-0 flex flex-col gap-y-3 min-h-full w-full xl:w-[30%] bg-Neutral800 lg:rounded-2xl"
      >
        <div class="flex items-center justify-between">
          <p class="font-[500] text-lg">Hourly Forecast</p>
          <div class="flex items-center px-3 py-[6px] gap-x-2 bg-Neutral600 rounded-md">
            <p>-</p>
            <img src="assets/images/icon-dropdown.svg" alt="" />
          </div>
        </div>
        <div class="flex flex-col gap-y-4 mt-2">
          <div
            id="card"
            class="flex items-center justify-between bg-Neutral700 rounded-lg px-3 border border-Neutral200/10"
          >
            <div class="flex items-center gap-x-2 py-2 invisible">
              <img
                class="w-[40px]"
                src="assets/images/icon-overcast.webp"
                alt=""
              />
              <p class="uppercase text-lg">3 pm</p>
            </div>
            <p class="mr-1 invisible">68°</p>
          </div>
          <div
            id="card"
            class="flex items-center justify-between bg-Neutral700 rounded-lg px-3 border border-Neutral200/10"
          >
            <div class="flex items-center gap-x-2 py-2 invisible">
              <img
                class="w-[40px]"
                src="assets/images/icon-partly-cloudy.webp"
                alt=""
              />
              <p class="uppercase text-lg">4 pm</p>
            </div>
            <p class="mr-1 invisible">68°</p>
          </div>
          <div
            id="card"
            class="flex items-center justify-between bg-Neutral700 rounded-lg px-3 border border-Neutral200/10"
          >
            <div class="flex items-center gap-x-2 py-2 invisible">
              <img
                class="w-[40px]"
                src="assets/images/icon-sunny.webp"
                alt=""
              />
              <p class="uppercase text-lg">5 pm</p>
            </div>
            <p class="mr-1 invisible">68°</p>
          </div>
          <div
            id="card"
            class="flex items-center justify-between bg-Neutral700 rounded-lg px-3 border border-Neutral200/10"
          >
            <div class="flex items-center gap-x-2 py-2 invisible">
              <img
                class="w-[40px]"
                src="assets/images/icon-overcast.webp"
                alt=""
              />
              <p class="uppercase text-lg">6 pm</p>
            </div>
            <p class="mr-1 invisible">66°</p>
          </div>
          <div
            id="card"
            class="flex items-center justify-between bg-Neutral700 rounded-lg px-3 border border-Neutral200/10"
          >
            <div class="flex items-center gap-x-2 py-2 invisible">
              <img class="w-[40px]" src="assets/images/icon-snow.webp" alt="" />
              <p class="uppercase text-lg">7 pm</p>
            </div>
            <p class="mr-1 invisible">66°</p>
          </div>
          <div
            id="card"
            class="flex items-center justify-between bg-Neutral700 rounded-lg px-3 border border-Neutral200/10"
          >
            <div class="flex items-center gap-x-2 py-2 invisible">
              <img class="w-[40px]" src="assets/images/icon-fog.webp" alt="" />
              <p class="uppercase text-lg">8 pm</p>
            </div>
            <p class="mr-1 invisible">64°</p>
          </div>
          <div
            id="card"
            class="flex items-center justify-between bg-Neutral700 rounded-lg px-3 border border-Neutral200/10"
          >
            <div class="flex items-center gap-x-2 py-2 invisible">
              <img class="w-[40px]" src="assets/images/icon-snow.webp" alt="" />
              <p class="uppercase text-lg">9 pm</p>
            </div>
            <p class="mr-1 invisible">63°</p>
          </div>
          <div
            id="card"
            class="flex items-center justify-between bg-Neutral700 rounded-lg px-3 border border-Neutral200/10"
          >
            <div class="flex items-center gap-x-2 py-2 invisible">
              <img
                class="w-[40px]"
                src="assets/images/icon-overcast.webp"
                alt=""
              />
              <p class="uppercase text-lg">10 pm</p>
            </div>
            <p class="mr-1 invisible">63°</p>
          </div>
        </div>
      </div>
    </div>;`;
}
