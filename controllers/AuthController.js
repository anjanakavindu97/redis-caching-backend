const mongoose = require('mongoose')

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
            res.json(user);
        } catch (error) {
            res.send(error);
        }
    },

    list: async (req, res)=>{
        try {
            const users = await  User.find({})
            res.json(users)
        } catch (error) {
            res.send(error)
        }
    },
}