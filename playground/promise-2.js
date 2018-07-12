const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var url2 = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${url2}`,
            json: true
        }, (error, response, body) => {
            if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longtitude: body.results[0].geometry.location.lng
                });
            } else if (error) {
                reject('Unable to connect to the Google server');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find location');
            };
        });
    });
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});