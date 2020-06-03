const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const weatherAppUrl = `http://api.weatherapi.com/v1/current.json?key=8d6dc84ba449446f9a515555200106&q=${latitude},${longitude}`;

  request(
    {
      url: weatherAppUrl,
      json: true,
    },
    (error, response) => {
      const locationName = response.body.location.name;
      const locationRegion = response.body.location.region;
      const locationCountry = response.body.location.country;
      const location = `${locationName}, ${locationRegion}, ${locationCountry}`;
      const temperature = response.body.current.temp_c;
      callback(error, {
        location,
        temperature,
      });
    }
  );
};

module.exports = forecast;
