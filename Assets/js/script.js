//Declare Global variables
let APIKey = '316807faf2d5a948ee03a9360023e434';
let lat = 0;
let lon = 0;
let date = moment().format('MMMM Do YYYY, h:mm:ss a');
let city = '';
let count = 0;

//Event listener on Search button
document.querySelector('.searchButton').addEventListener('click',function(){
    
    //Display weather section
    document.querySelector('.weatherSection').style.visibility = 'visible';

    //Get city name
    city = document.querySelector('.input').value;
    
    //Call API and get weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
        lat = data.coord.lat;
        lon = data.coord.lon;
        city = data.name;
        console.log(data);
        getUV();
    })

    function getUV(){
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            liEl = document.createElement('li');
            liEl.textContent = city;
            liEl.setAttribute('key',count);
            count += 1;
            if(count===10)
            {
                document.querySelector('.searchButton').style.display = 'none';
            }
            document.querySelector('.searchhistorylis').appendChild(liEl);

            document.querySelector('#cityName').textContent = city + ' - ' + date;
            document.querySelector('.weatherImg').setAttribute('src',`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`);
            document.querySelector('#cityTemp').textContent = 'Temp: ' + data.current.temp + ' °F';
            document.querySelector('#cityWind').textContent = 'Wind: ' + data.current.wind_speed + ' m/s';
            document.querySelector('#cityHumidity').textContent = 'Humidity: ' + data.current.humidity + ' %';
            document.querySelector('#cityUVIndex').textContent = 'UV Index: ' + data.current.uvi;
            
            document.querySelector('#day1date').textContent = data.daily[1].dt;
            document.querySelector('#day1img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png`);
            document.querySelector('#day1temp').textContent = 'Temp: ' + data.daily[1].temp.day + ' °F';
            document.querySelector('#day1wind').textContent = 'Wind: ' + data.daily[1].wind_speed + ' m/s';
            document.querySelector('#day1humidity').textContent = 'Humidity: ' + data.daily[1].humidity + ' %';
            
            document.querySelector('#day2date').textContent = data.daily[2].dt;
            document.querySelector('#day2img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`);
            document.querySelector('#day2temp').textContent = 'Temp: ' + data.daily[2].temp.day + ' °F';
            document.querySelector('#day2wind').textContent = 'Wind: ' + data.daily[2].wind_speed + ' m/s';
            document.querySelector('#day2humidity').textContent = 'Humidity: ' + data.daily[2].humidity + ' %';
            
            document.querySelector('#day3date').textContent = data.daily[3].dt;
            document.querySelector('#day3img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}.png`);
            document.querySelector('#day3temp').textContent = 'Temp: ' + data.daily[3].temp.day + ' °F';
            document.querySelector('#day3wind').textContent = 'Wind: ' + data.daily[3].wind_speed + ' m/s';
            document.querySelector('#day3humidity').textContent = 'Humidity: ' + data.daily[3].humidity + ' %';
            
            document.querySelector('#day4date').textContent = data.daily[4].dt;
            document.querySelector('#day4img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}.png`);
            document.querySelector('#day4temp').textContent = 'Temp: ' + data.daily[4].temp.day + ' °F';
            document.querySelector('#day4wind').textContent = 'Wind: ' + data.daily[4].wind_speed + ' m/s';
            document.querySelector('#day4humidity').textContent = 'Humidity: ' + data.daily[4].humidity + ' %';
            
            document.querySelector('#day5date').textContent = data.daily[5].dt;
            document.querySelector('#day5img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}.png`);
            document.querySelector('#day5temp').textContent = 'Temp: ' + data.daily[5].temp.day + ' °F';
            document.querySelector('#day5wind').textContent = 'Wind: ' + data.daily[5].wind_speed + ' m/s';
            document.querySelector('#day5humidity').textContent = 'Humidity: ' + data.daily[5].humidity + ' %';
            

            let uvi =data.current.uvi;
            if(uvi>=8){
                document.querySelector('#cityUVIndex').style.backgroundColor = 'red';
            }
            else if(uvi<8&&uvi>=5){
                document.querySelector('#cityUVIndex').style.backgroundColor = 'yellow';
                document.querySelector('#cityUVIndex').style.color = 'black';
            }
            else if (uvi<5){
                document.querySelector('#cityUVIndex').style.backgroundColor = 'green';
            }
        })
    }
})