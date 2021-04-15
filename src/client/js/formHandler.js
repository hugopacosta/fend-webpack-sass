/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
const apiKey = '&appid=fcf84eb90579590bb33703f689c0636c';

document.getElementById('generate').addEventListener('click', retrieveWeather);

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

function retrieveWeather(e){
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    getWeather(baseURL, zipCode, apiKey)
    .then(function(data){
            if(data.cod == '404'){
                document.getElementById('warning-label').innerHTML = 'City not found!'
                throw new Error("City not found!");
            }
            else{
                console.log(data.main.temp);
                document.getElementById('results').innerHTML = `The name of the place is ${data.name}, with the temperature of ${data.main.temp}.`;
            } 
    }).catch(function(error){
        console.log(error);
    });
}

const getWeather = async (baseURL, zipCode, apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey)
    try{
        const data = await res.json();
        return data;
    } catch(error){
        console.log('error',error);
    }
}

const updateUI = async (data) => {
    try{
        console.log(data.temperature);
        // document.getElementById('warning-label').innerHTML = '';
        // document.getElementById('date').innerHTML = `Date: ${allEntries.entry.date}`;
        // document.getElementById('temp').innerHTML = `Temperature: ${allEntries.entry.temperature} C`;
        // document.getElementById('content').innerHTML = `Content: ${allEntries.entry.content}`;        
    } catch(error) {
        console.log('error', error);
    }
}

export { retrieveWeather }
