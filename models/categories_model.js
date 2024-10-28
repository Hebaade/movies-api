const mongoose = require('mongoose');
const categorySchema= new mongoose.Schema(
    {
    name:
    {
        type:String,
    minlength:3,
    required:true,
    unique:true
    },
    description: {
        type:String,
    minlength:3,
    required:true
    }
}
)
module.exports.categorySchema=new mongoose.model('category',categorySchema)