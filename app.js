const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const AuthRoute = require('./routes/AuthRoute')

// Connect mongoose
mongoose.connect('mongodb://localhost:27017/redis_caching', {family: 4})
    .then(()=>console.log('DB is connected'))
    .catch((e)=>console.log(e))

// cors config
const coresOption = {
    origin: ['http://localhost:5173']
}

const app = express();

// middleware
app.use(express.json());
app.use(cors(coresOption));

// route
app.use('/api', AuthRoute)
// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})