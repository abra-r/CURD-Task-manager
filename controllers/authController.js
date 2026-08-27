const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const asyncHandler=require('../utils/asyncHandler');


require('dotenv').config();
const signup= asyncHandler(async (req,res)=>{
    const{email,password}=req.body;
    const existing =await User.findOne({email});

    if(existing){
        return res.status(400).json({error:"the mail is already registered "});

    }
    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({email,password:hashedPassword});
    res.status(201).json({message:"User created",user_id:user._id});

});


const login=asyncHandler(async (req,res)=>
{
    const {email,password}=req.body;
    const user= await User.findOne({email});
    if(!user)
    {
        return res.status(400).json({error:'User not found with this email'});

    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        return res.status(400).json({error:'wrong password'});

    }
    const token=jwt.sign({user_id:user._id,email:user.email},process.env.JWTSECRATE
        ,{expiresIn:'100h'}
    );
    res.json({token});


});

module.exports={signup,login};