import express from "express"
import multer from "multer";
import { Router } from 'express'
import { storage } from "../multerConfig";

const router = Router();

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
    return res.json(req.file?.filename);
})

export default router