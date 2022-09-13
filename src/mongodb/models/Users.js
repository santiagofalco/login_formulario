import mongoose from 'mongoose'

const collection = 'users'


const usersSchema = new mongoose.Schema({
    name: String,
})

const userService = mongoose.model(collection, usersSchema)

export default userService