const express = require('express');
const axios = require('axios');

var app = express();

const getArticleData = async (query, pageNumber) => {
  console.log(query, pageNumber);

  // make an article request
  try {
    let response = await axios.get('https://core.ac.uk:443/api-v2/articles/search/'+String(query), {
      params: {
        page: pageNumber,
        pageSize: 10, // min is 10 apparently
        apiKey: '20hIsS1F5j4D2C2iXrg4Wxf7VTp4Xt1j',
      }
    });
    //console.log(response.data);
    return response.data;
  } 
  catch (error) {
    console.log(error.message);
  }
}


app.get('/', (request, response) => {

  let pageNumber = Math.floor(Math.random() * Math.floor(100));
  let data;

  (async () => {
    data = await getArticleData('*', pageNumber);
    console.log(data);
    response.send(data);
  })() 
  
});

app.listen(process.env.PORT || 3000);

