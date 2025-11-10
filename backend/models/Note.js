//import
//create scheme
//call scheme

import mongoose from "mongoose";
const nschemea =new mongoose.Schema({
title:{
  type:String,
  required:true
},
content:{
  type:String,
  required:true,
}
},{timestamps:true});


export const Note =mongoose.model("Note",nschemea);