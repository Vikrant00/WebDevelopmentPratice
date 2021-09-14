const days =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let a =0;
const apiKey ='9b9f2d3d569b5ddbebbd7f9a180b7801';
const time = document.querySelector('#time_i');
const date= document.querySelector('#date_i');
const today_stats = document.querySelector(".today_stats");
const country = document.querySelector("#country_2");
const long_lat = document.querySelector("#long_lat_2");
const future = document.querySelector(".upcoming-weather");
const currentTemp = document.querySelector("#today_weather_i");



setInterval(() =>
{
    const time_u = new Date();
    const date_u = time_u.getDate();
    const month_u =time_u.getMonth();
    const day_u = time_u.getDay();
    const hour_un = time_u.getHours();
    const hour_u = hour_un >= 13 ? hour_un%12 :hour_un;
    const min_u = time_u.getMinutes();
    const am_pm = hour_un >=12 ? 'PM' : 'AM'

    time.innerHTML = hour_u + ':' + (min_u < 10 ? '0' + min_u : min_u) + ' ' + `<span id="am_pm">${am_pm}</span>`
    date.innerHTML = days[day_u] + ', ' + date_u+ ' ' + months[month_u];
},1000)


function getGeoData()
{
    navigator.geolocation.getCurrentPosition((success)=>{
        let{latitude, longitude} = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,
        minutely&units=metric&appid=${apiKey}`).then(res=> res.json()).then(data=>{
            updateDisplay(data);
        })
    })
}

getGeoData();
function updateDisplay(data_o)
{
    let {humidity,pressure, sunrise, sunset,wind_speed}=data_o.current;
    country.innerHTML = data_o.timezone;
    long_lat.innerHTML= data_o.lat + 'N ' + data_o.lon+'E';
    let set = new Date(sunset * 1000);
    var formattedTime_set = set.toLocaleTimeString('en-US');
    let rise = new Date(sunrise * 1000);
    var formattedTime_rise = rise.toLocaleTimeString('en-US');
    today_stats.innerHTML=
    `<div class="listy">
        <div>Humidity</div>
        <div>${humidity}%</div>
     </div>
     <div class="listy">
        <div>Pressure</div>
        <div>${pressure}</div>
     </div>
     <div class="listy">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
     </div>
     <div class="listy">
        <div>Sunrise</div>
        <div>${formattedTime_rise}</div>
     </div>
     <div class="listy">
        <div>Sunset</div>
        <div>${formattedTime_set}</div>
     </div>`;

    let future_day= '';
    data_o.daily.forEach((day,i) =>{
        if(i == 0){
            const dateObje = new Date (day.dt*1000)
            currentTemp.innerHTML = `
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="image">
                <div class="setting">
                <div class="day">${(dateObje.toLocaleString("en-US", {weekday: "long"}))}</div>
                <div class="temperature">Night - ${day.temp.night}&#176; C</div>
                <div class="temperature">Day - ${day.temp.day}&#176; C</div>
            `
        }else{
            const dateObj = new Date (day.dt*1000)
            future_day+=`
                <div class="day">
                    <div class="day_y">${(dateObj.toLocaleString("en-US", {weekday: "long"}))}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="image">
                    <div class="temperature">Night - ${day.temp.night}&#176; C</div>
                    <div class="temperature">Day - ${day.temp.day}&#176; C</div>
                </div>
            `
        }
    })
    future.innerHTML = future_day;
}


