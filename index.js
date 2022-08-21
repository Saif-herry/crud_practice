const express = require("express")
const cors = require("cors")
const app = express()
const connection = require("./config/db")
// const UserModel = require("./models/User.model")
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 6000

require('dotenv').config()
const userController = require("./routes/user.routes")
const notesController = require("./routes/notes.routes")
const authentication = require("./middleware/authentication")
app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/user",userController)

app.use(authentication)

app.use("/notes",notesController)

app.listen(PORT,async()=>{
try{
    await connection
    console.log("connected to db")
}
catch(err){
    console.log("unable to connect db")
    console.log(err)
}

    console.log("Listening on port localhost 6000")
})