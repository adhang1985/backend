const express = require('express');
const { Connection } = require('./config/db');
const cors = require('cors');
const authRouter = require('./routes/auth');
const listRouter = require('./routes/lists');
require('dotenv').config();
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// app.get('/', (req,res) => {
//     res.send('Welcome to server');
// })

app.use('/api/auth',authRouter);
app.use('/api/list',listRouter);

Connection(USERNAME,PASSWORD);

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

app.listen(process.env.PORT,() => {
    console.log('Server started');
})