require('dotenv').config();
const app = require('./app.js')
const connectDB = require('./config/database');

connectDB();

app.listen(3000, ()=>{
  console.log('Server is running on port 3000');
});