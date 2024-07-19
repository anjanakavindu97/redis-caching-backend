const express = require('express');
const mongoose = require('mongoose')
const AuthRoute = require('./routes/AuthRoute')

// Connect mongoose
mongoose.connect('mongodb://localhost:27017/redis_caching', {family: 4})
    .then(()=>console.log('DB is connected'))
    .catch((e)=>console.log(e))


const app = express();

// middleware
app.use(express.json());

// route
app.use('/api', AuthRoute)
// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})