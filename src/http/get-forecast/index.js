// Enable secure sessions, express-style middleware, and more:
// https://docs.begin.com/en/functions/http/
//
let begin = require('@architect/functions');
let fetch = require('node-fetch');

// HTTP function
exports.handler = async function http(req) {
  console.log('received request', req);
  if (
    req.queryStringParameters &&
    req.queryStringParameters.lat &&
    req.queryStringParameters.lng
  ) {
    const lat = req.queryStringParameters.lat;
    const lng = req.queryStringParameters.lng;
    const forecast = await fetch(
      `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lng}`
    ).then(res => res.json());
    console.log('-----forecast-----\n', forecast.currently);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json; charset=utf8' },
      body: JSON.stringify(forecast.currently)
    };
  } else {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json; charset=utf8' }
    };
  }
};
