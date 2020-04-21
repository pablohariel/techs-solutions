const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(userRoutes);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3333');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.listen(3333, (req, res) => {
  console.log('Server is listening on Port 3333');
});