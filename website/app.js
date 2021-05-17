/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


const postData = async(url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
       console.log("error", error);
    }
}






// get requist
 
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
let apiKey = '&appid=ccbb9a086c745b5c14810bcf6c1f23a4';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const zip =  document.getElementById('zip').value;
const feelings =  document.getElementById('feelings').value;

getwether(baseURL,zip, apiKey)

.then(function(data){
postData('/add', { date:newDate, temperature:data.list[0].main.temp,feeling:feelings,city:data.city.name,country:data.city.country})
updateUI();
})
};

const getwether = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const updateUI = async()=>{
    const req=await fetch('/all');
    try{
        const allData=await req.json();
  document.getElementById("date").innerHTML=`Date : ${allData[0].date}`;     
   document.getElementById('country').innerHTML=`Country : ${allData[0].country}`; 
    document.getElementById('city').innerHTML=`City : ${allData[0].city}`; 
   document.getElementById('temp').innerHTML=`Tempetartue : ${allData[0].temperature}`; 
   document.getElementById('content').innerHTML=`Feeling : ${allData[0].feeling}`; 
    }

 catch(error) {
    console.log("error", error);
    //appropriately handle the error
  }
};
