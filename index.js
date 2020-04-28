// Describing dependencies
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
var cors = require("cors");
var router = express.Router();
app.use('/', router);
require('dotenv').config()

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`Server has started on ${PORT}!`));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


//Function to request businessess from Yelp's API
router.get('/returnBusinesses', function (req, res) {
    var cuisine = req.query.cuisine,
        location = req.query.location;
    axios.get('https://api.yelp.com/v3/businesses/search', {
        params: {
            term: cuisine,
            location: location,
        },
        headers: {
            'Authorization': 'Bearer ' + process.env.TOKEN,
            'X-Requested-With': 'XMLHttpRequest',
            'content-type': 'jsonp',
        }
    }).then(function (response) {
        res.send(response["data"]);
    }).catch(function (error) {
        console.log(error);
    })
});
