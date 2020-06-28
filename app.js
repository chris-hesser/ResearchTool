const https = require('https');
const express = require('express');

var app = express();


app.get('/', (request, response) => {

  let pageNumber = Math.floor(Math.random() * Math.floor(5));
console.log(pageNumber);
  let data = '';

//alternative to http is Request, npm install request
/*
const request = require('request');

request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});
*/

  https.get('https://core.ac.uk:443/api-v2/search/Economics?page='+String(pageNumber)+'&pageSize=10&apiKey=20hIsS1F5j4D2C2iXrg4Wxf7VTp4Xt1j', (resp) => {

    resp.on('data', (chunk) => {
      data += chunk;
      console.log('got a chunk', chunk);
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(data);//JSON.parse(data).explanation);
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

  response.send(data);
});

app.listen(process.env.PORT || 3000);

// default http node server
/*
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello World ');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
