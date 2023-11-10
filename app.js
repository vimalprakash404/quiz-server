const express = require('express')
const app = express()
const port = 3001
const admin = require("./admin/admin")
const user = require("./public/user")
const mongoose = require("mongoose")
var cors = require('cors')

app.use(cors()) 
app.use(express.json());
mongoose.connect("mongodb+srv://vimalprakash3322:1mC3spEsxBssMQJi@cluster0.wrmec9a.mongodb.net/")
app.use("/admin", admin);
app.use("/",user);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))