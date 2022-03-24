const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

// db
require('./database/mongoose');

// pasery 
// Content-type: application/json
app.use(bodyParser.json());

// fix cors
app.use(cors());
/*
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mailfor0spam0@gmail.com',
    pass: 'Emilian00'
  }
});

var mailOptions = {
  from: 'mailfor0spam0@gmail.com',
  to: 'adamowski137@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/
// routes
app.use('/api/', apiRouter);

app.use((req, res, next)=>{
  res.status(404).send("pagenotfound")
})

// server
console.log(port)
app.listen(port, function() {
  console.log('serwer słucha... http://localhost:' + port);
});