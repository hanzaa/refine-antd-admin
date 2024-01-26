const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
const cors = require('cors'); 
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Router
const router = require('./routes/router');
app.use(router);

// Set up the server
port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






