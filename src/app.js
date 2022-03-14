const path = require('path');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express = require('express');
const hbs = require('hbs');


const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Ankit'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Ankit'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message : 'How can I help you!',
        title : 'Help',
        name : 'Ankit'
    });
});

// at app.com -> index.html

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : 'Please provide an address'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            return res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            });
        });
    });
});

app.get('/xyz', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : 'Please provide a search term'
        });
    }

    console.log(req.query);
    res.send({
        products : []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Ankit',
        errorMessage : 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Ankit',
        errorMessage : 'Page not found'
    });
});
// app.com
// app.com/help
// app.com/about
// app.com/weather

app.listen(3000, () => {
    console.log('server is up on port 3000');
});