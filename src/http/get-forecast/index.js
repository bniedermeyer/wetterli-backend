// Enable secure sessions, express-style middleware, and more:
// https://docs.begin.com/en/functions/http/
//
let begin = require('@architect/functions');

// HTTP function
exports.handler = async function http(req) {
  if (
    req.queryStringParameters &&
    req.queryStringParameters.lat &&
    req.queryStringParameters.lng
  ) {
    const lat = req.queryStringParameters.lat;
    const lng = req.queryStringParameters.lng;
    const forecast = await fetch(
      `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lng}`
    );
    console.log(forecast);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json; charset=utf8' },
      body: forecast
    };
  } else {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json; charset=utf8' }
    };
  }
};
