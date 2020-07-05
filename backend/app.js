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
    return null;
  }
}

// enable cors for localhost testing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // match domain 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/articleRequest', (request, response) => {

  // supposedly, max is 100 pages
  let pageNumber = Math.floor(Math.random() * Math.floor(100));

  (async () => {
    try {
      let payload = await getArticleData('*', pageNumber);

      if (payload == null || payload.data == null)
      {
        throw payload.status;
      }

      // idea, use total hits field to affect UI (move flag, change color)
      let itemsReturned = Object.keys(payload.data).length;
      
      let itemNumber = Math.floor(Math.random() * itemsReturned);

      let oneArticle = payload.data[itemNumber]; 
      console.log(oneArticle.title);
      response.send(oneArticle);
    }
    catch (error){
      console.log("Error: ", error);
      response.send( {title:"oops"} ); 
    }
  })() 
  
});

app.listen(process.env.PORT || 9000);

