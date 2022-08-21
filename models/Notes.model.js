const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title:String,
    note:String,
    lebel:String,
    userId:String
})

const NotesModel = mongoose.model("note",notesSchema)

module.exports = NotesModel