require('dotenv').config();


module.exports = {
  ip: process.env.IP || "127.0.0.1",
  port: process.env.PORT || 4000,
  database: process.env.DATABASE || 'mongodb://127.0.0.1:27017/data'
};