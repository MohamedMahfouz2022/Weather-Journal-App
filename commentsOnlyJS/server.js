// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));
//prot
const port = 4800
// Setup Server
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}}`)
})

// =---------------------------------------------------
//Callback Function Get all
const getAll = (req, res) => res.send(projectData).status(200);
//Get
app.get("/all", getAll)
//----PostData---=>
const postData = (req, res) => {
    projectData = req.body
    res.send(projectData).status(200)
    console.log(projectData)
}
//Post
app.post('/add', postData)
