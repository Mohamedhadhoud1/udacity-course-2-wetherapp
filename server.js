/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO-Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
/* Initializing the main project folder */
app.use(express.static('website'));

const port = 8000;
//const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});
const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// Get rout

app.get('/get', function(req, res) {
    res.send(projectData);
});


// Post rout
app.post('/post', function(req, res) {
    console.log(req.body);
    projectData = {
        date: req.body.date,
        temperature: req.body.temperature,
        feeling: req.body.feeling,
        city: req.body.city,
        country: req.body.country
    }
});