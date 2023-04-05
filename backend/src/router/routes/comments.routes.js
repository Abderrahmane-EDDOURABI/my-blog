import { Router } from 'express';
import { allComments, oneComment, postComment, removeComment } from '../../controllers/comments.js';

const router = Router();

router.get("/", allComments);
router.get("/:id", oneComment);
router.post("/add", postComment);
router.delete("/", removeComment);

export default router;