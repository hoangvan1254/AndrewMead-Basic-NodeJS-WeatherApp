const request = require('request');
var getWeather = (latDigit, lntDigit, callback) => {
    request({
        url: `https://api.darksky.net/forecast/bfa709f99b38d262efb38fc164c65360/${latDigit},${lntDigit}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the server');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather')
        }
    });
};

module.exports.getWeather = getWeather;