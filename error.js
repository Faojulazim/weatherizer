let isResolved = false;

export default async function errorCheck() {
  try {
    isResolved = true;
    //https://api.open-meteo.com/v1/forecast
    const res = await fetch("https://api.open-meteo.com/v1/forecast");
  } catch (err) {
    isResolved = false;
  }

  if (!isResolved) {
    searchDiv.classList.add("hidden");
    errorDiv.classList.remove("hidden");
    const retryBtn = document.querySelector("#retryBtn");
    retryBtn.addEventListener("click", async (e) => {
      try {
        isResolved = true;
        const res = await fetch("https://api.open-meteo.com/v1/forecast");
      } catch (err) {
        isResolved = false;
      }
      if (isResolved) {
        searchDiv.classList.remove("hidden");
        errorDiv.classList.add("hidden");
        console.clear();
      } else {
        searchDiv.classList.add("hidden");
        errorDiv.classList.remove("hidden");
      }
    });
  } else {
    searchDiv.classList.remove("hidden");
    errorDiv.classList.add("hidden");
  }
  return isResolved;
}
