const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();
console.log('Attempting to connect to redis......');

const client = redis.createClient({
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

// connect
client.on('connect', ()=>{
    console.log('Connected to Redis');
});
client.on("error", (e)=>{
    console.log("Redis Error", e)
});

client.connect();

module.exports = client