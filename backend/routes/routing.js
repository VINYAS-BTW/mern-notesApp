import express, { Router } from "express"
import { getallnotes, putanote,postanote, deleteanote, getanote } from "../controllers/controllings.js";
const router =express.Router();

router.get("/",getallnotes)

router.get("/:id",getanote)

router.post("/",postanote)

router.put("/:id",putanote);

router.delete("/:id",deleteanote);

export default router