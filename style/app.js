//get all elemets from the DOM
const app = document.querySelector(".weather.app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

//default city when the page loads

let cityInput = "Manila";

//add click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    //Change from default city to the clicked one
    cityInput = e.target.innerHTML;
    //function that fetches and display all the data from the weather API
    fetchWeatherData();
    app.style.opacity = "0";
  });
});

//add submit event to the form
form.addEventListener("submit", (e) => {
  //if the input field (search bar) is empty, throw an alert
  if (search.value.lenght == 0) {
    alert("Please type in a city name");
  } else {
    cityInput = search.value;
    //fetch data from API
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
  }
  e.preventDefault();
});

//funtion that returns a day of the week
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = ["January"];
  return weekday[new Date(`${month}/${day}/${year}`).getDay()];
}

//Function that fetches and dispplays data from API
function fetchWeatherData() {
  //fetch the data from dynamically add the city name with template literals
  //*Use your own key
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=f340821832924aea94525615221706&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      temp.innerHTML = data.current.temp_c + "&#176";
      conditionOutput.innerHTML = data.current.condition.text;

      //get the date and time from the city and extract
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);
      //reformat the date into something more appealing and add it to the page
      //original format: 2021-10-09 17:53
      //New format: 17:53 - Friday 9, 10,2021
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${m}/${d}/${y}`;
      timeOutput.innerHTML = time;
      //Add the name of the city into the page
      nameOutput.innerHTML = data.location.name;
      //get the corresponding icon url for the weather
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
      //Reformat the icon url to your own local folder path and add it the page
      icon.src = "./assets/icons/" + iconId;
      //add the weather details to the page
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      //set default time of day
      let timeOfDay = "day";
      //Get the unique id for each weather condition
      const code = data.current.condition.code;
    });
}
