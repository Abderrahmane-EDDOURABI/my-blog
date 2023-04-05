import { Router } from "express";
import posts_routes from "./routes/posts.routes.js";
import categories_routes from "./routes/categories.routes.js";
import users_routes from "./routes/users.routes.js";
import comments_routes from "./routes/comments.routes.js";
import contacts_routes from "./routes/contacts.routes.js";
import uploads_routes from "./routes/uploads.routes.js";

const router = Router();

router.use("/post", posts_routes);
router.use("/category", categories_routes);
router.use("/user", users_routes);
router.use("/comment", comments_routes);
router.use("/contact", contacts_routes);
router.use("/upload", uploads_routes);

export default router;
