//Declare Global variables
let APIKey = '316807faf2d5a948ee03a9360023e434';
let lat = 0;
let lon = 0;
let date = moment().format('MMMM Do YYYY, h:mm:ss a');
let city = '';
let count = 0;
let weatherData = [];

//Event listener on Search button
document.querySelector('.searchButton').addEventListener('click',function(){

    //Get city name
    city = document.querySelector('.input').value;
    
    //Call API and get lat/lon
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
        lat = data.coord.lat;
        lon = data.coord.lon;
        city = data.name;
        getUV(); //call second api to get weather data
    })
    .catch(function(){  ///catch garbage city values
        alert('City not found!');
    })

    // get all weather data and print on screen
    function getUV(){
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {

            //Display weather section
            document.querySelector('.weatherSection').style.visibility = 'visible';

            //add search history 
            liEl = document.createElement('li');
            liEl.textContent = city;
            liEl.setAttribute('key',count);
            // check if city has been already searched for
            if(weatherData.filter(c => c.city === city).length===0){
                count += 1;
                document.querySelector('.searchhistorylis').appendChild(liEl);
            }
            //show delete button now that at least one city has been added
            document.querySelector('.delButton').style.visibility = 'visible';

            //set the current weather section
            document.querySelector('#cityName').textContent = city + ' - ' + date;
            document.querySelector('.weatherImg').setAttribute('src',`https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`);
            document.querySelector('#cityTemp').textContent = 'Temp: ' + data.current.temp + ' °F';
            document.querySelector('#cityWind').textContent = 'Wind: ' + data.current.wind_speed + ' m/s';
            document.querySelector('#cityHumidity').textContent = 'Humidity: ' + data.current.humidity + ' %';
            document.querySelector('#cityUVIndex').textContent = 'UV Index: ' + data.current.uvi;
            
            //set the forecast weather section
            //T+1 day
            document.querySelector('#day1date').textContent = moment().add(1,'days').format('MMM Do YYYY');
            document.querySelector('#day1img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png`);
            document.querySelector('#day1temp').textContent = 'Temp: ' + data.daily[1].temp.day + ' °F';
            document.querySelector('#day1wind').textContent = 'Wind: ' + data.daily[1].wind_speed + ' m/s';
            document.querySelector('#day1humidity').textContent = 'Humidity: ' + data.daily[1].humidity + ' %';
            //T+2 day
            document.querySelector('#day2date').textContent = moment().add(2,'days').format('MMM Do YYYY');
            document.querySelector('#day2img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`);
            document.querySelector('#day2temp').textContent = 'Temp: ' + data.daily[2].temp.day + ' °F';
            document.querySelector('#day2wind').textContent = 'Wind: ' + data.daily[2].wind_speed + ' m/s';
            document.querySelector('#day2humidity').textContent = 'Humidity: ' + data.daily[2].humidity + ' %';
            //T+3 day
            document.querySelector('#day3date').textContent = moment().add(3,'days').format('MMM Do YYYY');
            document.querySelector('#day3img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}.png`);
            document.querySelector('#day3temp').textContent = 'Temp: ' + data.daily[3].temp.day + ' °F';
            document.querySelector('#day3wind').textContent = 'Wind: ' + data.daily[3].wind_speed + ' m/s';
            document.querySelector('#day3humidity').textContent = 'Humidity: ' + data.daily[3].humidity + ' %';
            //T+4 day
            document.querySelector('#day4date').textContent = moment().add(4,'days').format('MMM Do YYYY');
            document.querySelector('#day4img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}.png`);
            document.querySelector('#day4temp').textContent = 'Temp: ' + data.daily[4].temp.day + ' °F';
            document.querySelector('#day4wind').textContent = 'Wind: ' + data.daily[4].wind_speed + ' m/s';
            document.querySelector('#day4humidity').textContent = 'Humidity: ' + data.daily[4].humidity + ' %';
            //T+5 day
            document.querySelector('#day5date').textContent = moment().add(5,'days').format('MMM Do YYYY');
            document.querySelector('#day5img').setAttribute('src',`https://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}.png`);
            document.querySelector('#day5temp').textContent = 'Temp: ' + data.daily[5].temp.day + ' °F';
            document.querySelector('#day5wind').textContent = 'Wind: ' + data.daily[5].wind_speed + ' m/s';
            document.querySelector('#day5humidity').textContent = 'Humidity: ' + data.daily[5].humidity + ' %';
            
            //set color for UV Index
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

            if(count===10)
            {
                document.querySelector('.searchButton').style.visibility = 'hidden';
                alert('Please clear history');
            }
            
            //save api data to local dict
            let dataObj = {
                city : city,
                weather : data
            };

            //filter if city exists then do not push again
            if(weatherData.filter(c => c.city === city).length===0){
                weatherData.push(dataObj);
                localStorage.setItem('weatherData',JSON.stringify(weatherData));
            }

        })
    }
})

//Event Listener on Delete button
document.querySelector('.delButton').addEventListener('click', function(){
    //reset count and refresh page
    count = 0;
    document.querySelector('.delButton').style.visibility = 'hidden';
    document.querySelector('.searchButton').style.visibility = 'visible';
    document.querySelector('.weatherSection').style.visibility = 'hidden';
    document.querySelector('.input').value = '';
    localStorage.clear();
    document.querySelector('.searchhistorylis').innerHTML = '';
})

document.querySelector('ul').addEventListener('click',function(Event){
    //get required data and trigger search button click event
    let liKey = Event.target.getAttribute('key')        
    city = Event.target.textContent;
    document.querySelector('.input').value = city;
    document.querySelector('.searchButton').click();

})