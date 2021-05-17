/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


const postData = async(url = '', data = {}) => {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    });

    try {
        const Data = await res.json();
        console.log(Data);
        return Data;
    } catch (error) {
        console.log("error", error);
    }
}






// get requist

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const baseURL = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=`
    const Key = 'ccbb9a086c745b5c14810bcf6c1f23a4&units=metric';
    getwether(baseURL, Key)

    .then(function(data) {
        postData('/post', { date: newDate, temperature: data.list[0].main.temp, feeling: feelings, city: data.city.name, country: data.city.country })
        update();
    })
};

const getwether = async(baseURL, key) => {

    const res = await fetch(baseURL + key)
    try {

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);

    }
}

const update = async() => {
    const req = await fetch('/get');

    try {
        const data = await req.json();
        document.getElementById("date").innerHTML = `<p>Date : ${data.date}</p>`;
        document.getElementById('country').innerHTML = `<p>Country : ${data.country}</p>`;
        document.getElementById('city').innerHTML = `<p>City : ${data.city}</p>`;
        document.getElementById('temp').innerHTML = `<p>Tempetartue : ${data.temperature} Celcius</p>`;
        document.getElementById('content').innerHTML = `<p>Feeling : ${data.feeling}</p>`;
    } catch (error) {
        console.log("error", error);

    }
};