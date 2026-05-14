import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createShortUrl, deleteShortUrl, updateShortUrl } from "../controllers/shortUrlController.js";
const shortURLRouter = Router();

shortURLRouter.post("/", protect, createShortUrl)
shortURLRouter.patch("/:id", protect, updateShortUrl)
shortURLRouter.delete("/:id", protect, deleteShortUrl)

export default shortURLRouter;

