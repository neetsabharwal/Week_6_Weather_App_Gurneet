//Declare Global variables
let city = '';
let APIKey = '316807faf2d5a948ee03a9360023e434';
//Event listener on Search button
document.querySelector('.searchButton').addEventListener('click',function(){
    
    //Display weather section
    document.querySelector('.weatherSection').style.visibility = 'visible';

    //Get city name
    city = document.querySelector('.input').value;
    
    //Call API and get weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => console.log(data))
})