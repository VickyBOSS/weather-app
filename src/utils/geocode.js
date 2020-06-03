const request = require("request");

const geocode = (address, callback) => {
  // address = address.replace(/ /g, "%20");
  const mapBoxUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoicm9vdDY0MzIiLCJhIjoiY2thdnZtbmc0MWg5ODMwbXMyY3p3a3FjNiJ9.FhoOdYfkas4m6pVjyE029w&cachebuster=1590979164949&autocomplete=true";

  request(
    {
      url: mapBoxUrl,
      json: true,
    },
    (error, response) => {
      if (error) {
        callback(error, undefined);
      } else {
        callback(
          undefined,
          ({
            longitude: response.body.features[0].center[0],
            latitude: response.body.features[0].center[1],
          } = {})
        );
      }
    }
  );
};

module.exports = geocode;
