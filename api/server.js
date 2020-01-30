const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB');
const personsRoute = require('./router');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err) }
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/persons', personsRoute);

app.listen(4444, () => console.log('Server is running on Port: 4444'));