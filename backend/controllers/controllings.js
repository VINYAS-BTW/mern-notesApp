import { json } from "express";
import { Note } from "../models/Note.js"

export async function getallnotes(req,res){
try{
  const note=await Note.find().sort({createdAt:-1});
  res.status(200).json(note)
}
catch(error){
  console.error(error)
res.status(500).json("message:controller error")
}
}

export async function getanote(req,res)
{
  try {
    const singlenote = await Note.findById(req.params.id)
    if(!singlenote) return res.status(404).json({message:"cannot find"})
    res.status(200).json(singlenote)
  } catch (error) {
    console.error(error)
res.status(500).json("message:controller getanote error")
  }
}
export async function postanote(req, res) {
  try {
   
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    

    res.status(201).json({ message: "created", note: savedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "controller-create error" });
  }
}

export async function putanote(req,res) {
  try{
      const { title , content }=req.body;
      const udpatednote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
      if(!udpatednote) return res.status(404).json({message:"didnt find the note"})
      res.status(200).json(udpatednote);
  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({ message: "controller-putanote error" });
  }
  
}


export async function deleteanote(req,res) 
{
  try {
    
    const deletednote = await Note.findByIdAndDelete(req.params.id)
    if(!deletednote) return res.status(404).json({message:"cannot delete"});
    res.status(200).json({message:"deleted"})


  } catch (error) {
    console.error(error);
    res.status(500).json({message:"controller-error"})
  }
    
  
}

