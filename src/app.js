import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import __dirname from './utils.js'
import newSocket from './services/socket.js'
import getRouter from './routes/products.js'
import login from './routes/login.js'
import logout from './routes/logout.js'


const app = express()

app.use(express.json())

const connect = mongoose.connect('mongodb+srv://santiagofalco:123asd@clustercursocoder.guulqh2.mongodb.net/usersdb?retryWrites=true&w=majority')

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://santiagofalco:123asd@clustercursocoder.guulqh2.mongodb.net/usersdb?retryWrites=true&w=majority',
        ttl: 600,
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))




const server = app.listen(8080, () => {
    console.log('Listening on 8080')
})

const io = newSocket(server)
const ProductsView = getRouter(io)

app.set('views', __dirname+'/views')
app.set('view engine', 'pug')


app.use("/public", express.static(__dirname+'/public'));
app.use('/', ProductsView)
app.use('/login', login)
app.use('/logout', logout)

