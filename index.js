const express=require('express');
const app=express();

const mongoose =require('mongoose');
const dns=require('dns');
const authRouter=require('./router/authRouter');
const taskRouter=require('./router/taskRouter');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth',authRouter);
app.use('/tasks',taskRouter);


dns.setServers(['8.8.8.8', '8.8.4.4']);
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('Mongodb Connected'))
.catch(err=>console.log('Something Went Wrong',err));

app.get('/',async (req,res)=>{
    return res.send('Hello I AM SUPER DUPER TASK MANAGER APP')

});

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);

});