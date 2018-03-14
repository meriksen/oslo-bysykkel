const request = require('request');

var _bysykkel = {}, _tilgjengelig = {};

var stationOptions = {
    json:true,
    url:'https://oslobysykkel.no/api/v1/stations',
    headers: {
        'Client-Identifier': ''
    }
};

var availabilityOptions = {
    json:true,
    url:'https://oslobysykkel.no/api/v1/stations/availability',
    headers: {
        'Client-Identifier': ''
    }
};

var stationCallback = function(err, res, body) {
    if (err || res.statusCode != 200) { 
        return console.log(err); 
    }

    _bysykkel = body;

    request(availabilityOptions, availabilityCallback);
};

var availabilityCallback = function(err, res, body) {
    if (err || res.statusCode != 200) { 
        return console.log(err); 
    }
    
    _tilgjengelig = body;
   
    console.log('Navn, ledige låser, ledige sykler');

    var ledige;
    _bysykkel.stations.forEach(function(key) {
        ledige = _tilgjengelig.stations.find(x => x.id === key.id).availability
        
        console.log(key.title + ', ' + ledige.locks + ', ' + ledige.bikes);
    });
};

request(stationOptions, stationCallback);
