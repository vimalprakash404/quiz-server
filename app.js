const express = require('express')
const app = express()
const port = 3001
const admin = require("./admin/admin")
const user = require("./public/user")
const mongoose = require("mongoose")
var cors = require('cors')
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(cors()) 
app.use(express.json());
mongoose.connect("mongodb+srv://vimalprakash3322:1mC3spEsxBssMQJi@cluster0.wrmec9a.mongodb.net/")
app.use("/admin", admin);
app.use("/",user);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port,'0.0.0.0' ,() => console.log(`Example app listening on port ${port}!`))