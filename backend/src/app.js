import express from 'express';
import "dotenv/config";
import cors from "cors";

// FILES HANDLING
// import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

import {PORT, HOST} from './config/const.js';
import router from './router/index.routes.js';

const __filename = fileURLToPath(import.meta.url);

const app = express();

app
    .use(express.static("public"))
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(cors())
    .use('/img/posts', express.static(path.dirname(__filename + '/img/posts')));


app.use(router);

app.listen(PORT, () => console.log(`Listening at http://${HOST}:${PORT}`))