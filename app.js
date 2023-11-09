const express = require('express')
const app = express()
const port = 3001
const admin = require("./admin/admin")
const mongoose = require("mongoose")

app.use(express.json());
mongoose.connect("mongodb+srv://vimalprakash3322:1mC3spEsxBssMQJi@cluster0.wrmec9a.mongodb.net/")
app.use("/admin", admin)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))