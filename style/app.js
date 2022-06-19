//get all elemets from the DOM
const app = document.querySelector(".weather-app");
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
btn.addEventListener("click", (e) => {
  e.preventDefault();
  //if the input field (search bar) is empty, throw an alert
  if (form.value == "") {
    alert("Please type in a city name");
  } else {
    cityInput = form.value;
    console.log(cityInput);
    //fetch data from API
    fetchWeatherData();
    form.value = "";
    app.style.opacity = "0";
  }
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

      //change to night if its night time in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code == 1000) {
        //Set the background image to clear if the weather is clear
        app.style.backgroundImage = `url(./assets/imgs/${timeOfDay}/clear.jpg)`;
        //change the button bg color depending on its day or night
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#e181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1279 ||
        code == 1282
      ) {
        console.log(code);
        app.style.backgroundImage = `url(./assets/imgs/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#efa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252 ||
        code == 1276 ||
        code == 1273
      ) {
        app.style.backgroundImage = `url(./assets/imgs/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = `url(./assets/imgs/${timeOfDay}/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }
      //face in the page once all is done
      app.style.opacity = "1";
    })

    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
}

//Call the function on page load
fetchWeatherData();

//fade in the page
app.style.opacity = "1";
