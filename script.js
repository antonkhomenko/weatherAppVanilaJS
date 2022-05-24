const apiLink = 
"http://api.weatherapi.com/v1/current.json?key=1ad11aef81a54819ade14351222305";

const app = document.getElementById('app');
const root = document.getElementById('root');
let searchInput, searchBtn;

let store = {
    city: "Tokyo",
    country: "",
    localtime: "2022-05-23 2:50",
    feels: 0,
    humidity: 0,
    isDay: 0,
    temp: 0,
    windSpeed: 0,
    cloud: 0,
}

const fetchData = async () => {
   
    const result = await fetch(`${apiLink}&q=${store.city}&aqi=no`);
    const data = await result.json();
    let {
        current: {
            cloud,
            feelslike_c: feels,
            humidity,
            is_day: isDay,
            temp_c: temp,
            wind_kph: windSpeed,
        },
        location: {
            country,
            name: city,
            localtime,
        }
    } = data;

    console.log(data);

     store = {
        cloud,
        feels,
        humidity,
        isDay,
        temp,
        windSpeed,
        country,
        city,
        localtime,  
    }
    renderSearchWindow();
    searchInput = document.getElementById("searchInput");
    searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", () => {
        store.city = searchInput.value;
        fetchData();
    })
};


const renderSearchWindow = () => {
    app.innerHTML = `
    <div class="markup">
        <div class="searchBlock">
            <img src="./img/searchIcon.png" alt="searchIcon" id="searchBtn">
            <input type="search" name="searchInput" id="searchInput" 
            placeholder="Search city">
        </div>

        <div class="locationBlock">
            <img src="./img/location.png" alt="locationIcon">
            <p>${store.city}, ${store.country}</p>
        </div>

        <div class="weatherContetn1">
            <div class="temperatureBlock"><b>${store.temp}°C</b></div>
            <div class="isDayBlock">
                <img src="./img/${isDayNow()}" alt="isDayIcon">
                <p class="localTimeBlock">
                    <img src="./img/localtime.png" alt="localtimeIcon">
                    ${getLocationTime()}
                </p>
            </div>
        </div>

        <div class="weatherContent2">
            <div class="humidityBlock">
                <img src="./img/humidity.png" alt="humidityIcon">
                <p>${store.humidity}%</p>
            </div>
            <div class="windSpeedBlock">
                <img src="./img/windIcon.png" alt="windIcon">
                <p>${store.windSpeed}Km/h</p>
            </div>
            <div class="cloudBlock">
                <img src="./img/cloudIcon.png" alt="cloudIcon">
                <p>${store.cloud}%</p>
            </div>
        </div>
    </div>`
};

function isDayNow() {
    let period = store.isDay;
    if(period) {
        return 'dayIcon.png';
    } else {
        return 'nightIcon.png';
    }
};

function getLocationTime() {
    let time = store.localtime;
    return time.slice( time.indexOf(" ") + 1 );
}

fetchData();    



