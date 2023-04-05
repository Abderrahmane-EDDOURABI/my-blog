import { Router } from 'express';

import {addCategory, allCategories, oneCategory, removeCategory, updateCategory} from '../../controllers/categories.js'

const router = Router();

router.get("/", allCategories);
router.get("/:id", oneCategory);

router.post("/", addCategory);
router.put("/", updateCategory);
router.delete("/", removeCategory);

export default router;