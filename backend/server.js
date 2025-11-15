import express from "express";
import routing from "../backend/routes/routing.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/ratelimiter.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); //middleware

app.use(ratelimiter);

// app.use((req,res,next)=>{
//   console.log("new req");
//   next();
// })

app.use("/api/notes", routing);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log("server started at PORT", PORT);
  });
});

// app.get("/api/login",(req,res)=>{
//   res.status(200).send("its working w nodemon ")
// })

// app.put("/api/login/:id",(req,res)=>{
//   res.status(201).json({message:"udpated smtg"});
// })
