const express = require('express');
const axios = require('axios');

var app = express();

// axios debug
/*
axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})
*/

const getArticleData = async (query, pageNumber) => {
  console.log(query, pageNumber);

  // make an article request per https://core.ac.uk/documentation/api/#!/articles/searchArticlesBatch
  // this api uses elasticsearch 1.4
  try {
    let response = await axios({
      method: 'post',
      url: 'https://core.ac.uk:443/api-v2/articles/search',
      params:
      {
        apiKey: '20hIsS1F5j4D2C2iXrg4Wxf7VTp4Xt1j',
      },
      data:
        [{
          page: pageNumber,
          pageSize: 10, // min is 10 apparently
          default_operator: 'AND',
          fields: ['description', 'title'],
          query: query, 
        }]
    });

    // get returns data as object, post returns data as array
    //console.log(response.data[0]);
    return response.data[0];
  }
  catch (error) {
    console.log(error.message);
    return null;
  }
}

// enable cors for localhost testing
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // match domain 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/articleRequest', (request, response) => {

  // supposedly, max is 100 pages
  let pageNumber = Math.floor(Math.random() * Math.floor(100));
  let query = (request.query.q.length <= 0) ? '*' : request.query.q;

  let queryFormatted = query.split(' ').map( (word) => "+" + word + ' ' ).reduce((word, current) => word + current);

  (async () => {
    try {

      // todo, page number cannot be too high when results are limited,
      // but how do I know how many results there are?
      let payload = await getArticleData(queryFormatted, pageNumber);

      if (payload == null || payload.data == null) {
        throw new Error(payload.status);
      }

      // idea, use total hits field to affect UI (move flag, change color, show it)
      let itemsReturned = Object.keys(payload.data).length;
      console.log("number of hits", payload.totalHits)

      let itemNumber = Math.floor(Math.random() * itemsReturned);

      let oneArticle = payload.data[itemNumber];
      console.log(oneArticle.title);
      response.send(oneArticle);
    }
    catch (error) {
      console.log(error);
      response.send({ title: "oops" });
    }
  })()

});

app.listen(process.env.PORT || 9000);

