import { Router } from 'express';
import {allPosts, onePost, addPost, updatePost, removePost, postByCategory, postByDate, fourPosts, postByUser} from '../../controllers/posts.js'

const router = Router();

router.get("/", allPosts);
router.get("/fp", fourPosts);

router.get("/:id", onePost);
router.get("/category/:category", postByCategory);
router.get("/user/:user_id", postByUser);

router.post("/add", addPost);
router.post("/postDate", postByDate);

router.put("/", updatePost);
router.delete("/:id", removePost);

export default router;