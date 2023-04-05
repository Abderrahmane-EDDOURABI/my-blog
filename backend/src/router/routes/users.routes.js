import { Router } from 'express';

import {checkToken, register, login, updateUser, deleteAccount, getAdmins} from '../../controllers/users.js';
import { auth } from '../../middlewares/auth.js';

const router = Router();


router.get("/", getAdmins);
router.get("/checkToken", auth, checkToken);
// router.get("/:id", one);

router.post("/register", register);
router.post("/login", login);

router.put("/", updateUser);
router.delete("/:id", deleteAccount);

export default router;