const mongoose = require('mongoose');
const movieSchema= new mongoose.Schema(
    {
    poster:    {
        type:String,
    required:true,
    unique:true
    },
    name:    {
        type:String,
    minlength:3,
    required:true,
    unique:true
    },
    description:    {
        type:String,
    minlength:3,
    required:true,
    },
    rate:Number,
    releaseDate:String,
    categoryId:mongoose.Schema.Types.ObjectId
}
)
module.exports.movieSchema=new mongoose.model('movie',movieSchema)