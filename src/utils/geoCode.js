const request = require("request");

const getGeoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGFyZGlraGFsYW4iLCJhIjoiY2t6bW51NjU4MnFrNDJvb2M1MmtrdnVhYSJ9.GOSukb1ZICPmhf5cbv3HiA&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect mapbox servers....", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to to find location");
    } else {
      console.log("res", response.body);
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = getGeoCode;
