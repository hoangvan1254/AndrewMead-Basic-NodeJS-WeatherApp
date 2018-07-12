const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const addressobj = {
    demand: true,
    alias: 'address',
    describe: 'Input address.',
    string: true
};

const argv = yargs
    .options({
        a: addressobj
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longtitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently: ${weatherResults.temperature}. And feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});


