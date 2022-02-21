const request = require("request");

const getForcast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=dabebe6d482a31898ff0706b1a2ac754&query=${lat},${long}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect weatherstack server....", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      console.log("data", response.body);
      callback(
        undefined,
        `Its currently ${response.body.current.temperature} temperature but feels like ${response.body.current.feelslike} with wind speed of ${response.body.current.wind_speed}`
      );
    }
  });
};

module.exports = getForcast;
