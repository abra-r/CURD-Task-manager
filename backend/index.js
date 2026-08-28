const express=require('express');
const app=express();

const mongoose =require('mongoose');
const dns=require('dns');
const authRouter=require('./router/authRouter');
const taskRouter=require('./router/taskRouter');
const cors=require('cors');
require('dotenv').config();


app.use(cors({
    origin:'http://localhost:5500'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth',authRouter);
app.use('/tasks',taskRouter);


dns.setServers(['8.8.8.8', '8.8.4.4']);
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('Mongodb Connected'))
.catch(err=>console.log('Something Went Wrong',err));

app.get('/',async (req,res)=>{
    return res.json({message:'Hello I AM SUPER DUPER TASK MANAGER APP'})

});
app.use((err,req,res,next)=>{
    console.error(err.stack);
    if(err.name==='ValidationError'){
        return res.status(400).json({error:'Validation Failed!',details:err.message})
    }
    return res.status(500).json({message:"Something went wrong!",details:err.message});


})
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);

});