import { Router } from 'express';
import multer from 'multer';

const router = Router();

const storagePost = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "./public/img/posts")
    }, filename : (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const uploadPost = multer({
    storage : storagePost
});

router.post("/", uploadPost.single('file'), (req, res) => {
    res.status(201).json('File has been uploaded');
});

const storageUser = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "./public/img/users")
    }, filename : (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const uploadUser = multer({
    storage : storageUser
});

router.post("/user", uploadUser.single('file'), (req, res) => {
    res.status(201).json('File has been uploaded');
});

export default router;