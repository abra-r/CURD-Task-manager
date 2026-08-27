const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    title:{type:String,required:true},
    completed:{type:Boolean,default:false},
    description:{type:String,required:false},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})


const task=mongoose.model('Task',taskSchema);
module.exports=task;


