const express =require('express');
const app =express();
const bodyParser =require('body-parser');
const connection = require('./dbConnection/connection.js');
const indexRoutes = require('./routes/index.js');

app.use(bodyParser.json());

app.use('/', indexRoutes);

connection.connect((err, dbConnectedResult)=> {
    if (err) {
      console.log(err);
    } else {
      console.log(dbConnectedResult);
      app.listen(3010);
    }
  });



