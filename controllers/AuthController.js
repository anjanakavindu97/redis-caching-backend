const mongoose = require('mongoose')
const redisClient = require('../utils/redisClient')

// user model
const userSchema = new mongoose.Schema({
    name: String,
    email: String
},{
    timestamps: true
});

// user schema
const User = mongoose.model('User', userSchema)

module.exports = {
    createUser: async (req, res)=> {
        try {
            const { name, email } = req.body;
            const user = await User.create({ name, email });
            // invalid cache after creating a new user
            await redisClient.del('allUsers')
            res.json(user);
        } catch (error) {
            res.send(error);
        }
    },

    list: async (req, res)=>{
        try {
            // check cache
            const cacheKey = 'allUsers';
            const cachedUsers = await redisClient.get(cacheKey);
            if(cachedUsers) {
                console.log('Cached hit - Users fetch from Redis');
                return res.json({users: JSON.parse(cachedUsers)});
            }

            //cached miss, query mongoDB
            const users = await  User.find();
            if(users.length) {
                await redisClient.set(cacheKey, JSON.stringify(users), 'EX', 3600); // cache for one hour
                console.log('Cached miss - Users fetch from MongoDB')
                res.JSON(users);
            }
        } catch (error) {
            res.send(error);
        }
    },
}