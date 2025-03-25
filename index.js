require('dotenv').config()
const express = require('express');
const cors = require('cors')
const Routes = require('./routes/allroutes');
const { dbConnect } = require('./utils/db');

const app = express();


app.use(express.json());

const corsOptions = {
    origin: ['https://todolist-theta-silk.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.options('*', cors(corsOptions));


app.use('/', Routes)

app.get('/', (req, res) => {
    res.send('Hello, from to-do server');
});

dbConnect();

const port = process.env.PORT

app.listen(port, () => {
    console.log("Server is running at 9000");
})