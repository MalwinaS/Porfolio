let lat;
let long;
const apiKey = "63fc4b528e9e73977e9320f14e05bf09";

function startApp() {

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                console.log("Latitude: " + lat + " Longitude: " + long);

                getWeatherData()
            }
        );
    }
}

function getWeatherData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    console.log(url);

    fetch(url).then( function(response){
        response.json().then( function(data){
            console.log(data);
            updateWeatherData(data)
        });
    });
}

function updateWeatherData(data) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const cloudsPerc = data.clouds.all;
    const city = data.name;
    const windSpeed = data.wind.speed;
    const sunRise = new Date(data.sys.sunrise * 1000);
    const sunSet = new Date(data.sys.sunset * 1000);


    document.getElementById("temp").innerHTML = temp;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("pressure").innerHTML = pressure;
    document.getElementById("cloudsPerc").innerHTML = cloudsPerc;
    document.getElementById("windSpeed").innerHTML = windSpeed;
    document.getElementById("sunRise").innerHTML = sunRise.getHours() + ":" + sunRise.getMinutes() + ":" + sunRise.getSeconds();
    document.getElementById("sunSet").innerHTML = sunSet.getHours() + ":" + sunSet.getMinutes() + ":" + sunSet.getSeconds();

    let imgUrl = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";
    document.getElementById("currentWeatherImg").setAttribute("src", imgUrl);

    const locationLink = document.getElementById("locationLink");
    locationLink.innerHTML = city;
    locationLink.href = `https://openstreetmap.org/#map=12/${lat}/${long}`;
}