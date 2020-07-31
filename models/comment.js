const mongoose  = require('mongoose');
var schema = mongoose.Schema;
const commentSchema = new schema({
    startDate:{type:Date, required:true},
    startData:{type:Number, required:true},
    endDate:{type:Date, required:true},
    endData:{type:Number, required:true},
    comment:{type:String, required:true}
})

module.exports =  mongoose.model('Comment', commentSchema);