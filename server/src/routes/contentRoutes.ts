import express from "express";
import ContentController from "../controllers/contentController";

const router = express.Router();

router.get("/", ContentController.getAllContents);
router.get("/:id", ContentController.getSingleContent);
router.post("/create", ContentController.createContent);

export default router;
