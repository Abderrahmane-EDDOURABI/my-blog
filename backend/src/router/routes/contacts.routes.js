import { Router } from 'express';
import { sendMessage } from '../../controllers/contacts.js';
const router = Router();

router.post("/", sendMessage);

export default router;