require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Routes = require('./routes/allroutes');
const { dbConnect } = require('./utils/db');

const app = express();

dbConnect();

const corsOptions = {
    origin: 'https://todolist-theta-silk.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); 

app.use(express.json());

app.use('/', Routes);

app.get('/', (req, res) => {
    res.send('Hello, from to-do server');
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});