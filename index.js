require('dotenv').config()
const express = require('express');
const cors = require('cors')
const Routes = require('./routes/allroutes');
const { dbConnect } = require('./utils/db');

const app = express();


app.use(express.json());

app.use(cors());


app.use('/', Routes)

app.get('/', (req, res) => {
    res.send('Hello, from to-do server');
});

dbConnect();

const port = process.env.PORT

app.listen(port, () => {
    console.log("Server is running at 9000");
})