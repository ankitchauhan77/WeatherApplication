const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e92fd5bb65744dfcd35e8eb63dccc555&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({url, json : true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect with weater serverice', undefined);
        } else if (body.error) {
            callback('Unable to find Location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' Temprature: ' + body.current.temperature + ' Feelslike: ' + body.current.feelslike);
        }
    });
};

module.exports = forecast;
