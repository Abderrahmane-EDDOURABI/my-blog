import { error, success } from "../helpers/index.js";
import Query from "../model/query.js";

export const allPosts = async (req, res) => {
    try {
        const query = "SELECT post.id, post.title, post.content, post.image, post.created_at, category.name AS 'CategoryName', user.username AS 'Redactor' FROM post JOIN category ON category.id = post.category_id JOIN user ON user.id = post.user_id ORDER BY post.created_at";
        const [posts] = await Query.find(query);
        if(posts.length){
            const msg = "All posts are recovered ✅";
            res.status(200).json(success(msg, posts));
        } else {
            const msg = "No posts in DB yet 🚫";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const fourPosts = async (req, res) => {
    try {
        const query = "SELECT * FROM post ORDER BY created_at LIMIT 4";
        const [posts] = await Query.find(query);
        if(posts.length){
            const msg = "All posts are recovered ✅";
            res.status(200).json(success(msg, posts));
        } else {
            const msg = "No posts in DB yet 🚫";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const onePost = async (req, res) => {
    try {
        const queryPost  = "SELECT post.id, post.title, post.content, post.image, post.created_at, category.name AS 'CategoryName', user.username AS 'Redactor' FROM post JOIN category ON category.id = post.category_id JOIN user ON user.id = post.user_id WHERE post.id = ?";
        const queryComment  = "SELECT comment.text, comment.created_at, comment.updated_at, comment.user_id, comment.post_id, user.username as 'CommentRedactor', user.avatar as 'UserAvatar' FROM comment INNER JOIN user ON user.id = comment.user_id INNER JOIN post ON post.id = comment.post_id  WHERE comment.post_id = ? ORDER BY comment.created_at DESC";
        
        const post = await Query.findOne(queryPost, req.params.id);
        const comment = await Query.findOne(queryComment, req.params.id);
        const postAndComment = {...post[0], comment}

        if(!postAndComment){
            const msg = "This post don't exist in DB";
            res.status(200).json(success(msg));
        } else {
            const msg = "Post revered --> " + postAndComment.title;
            res.status(200).json(success(msg, postAndComment));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const postByDate = async (req, res) => {

    try {

        const query = `SELECT post.id, post.title, post.content, post.image, post.created_at, category.name AS 'CategoryName', user.username AS 'Redactor' FROM post JOIN category ON category.id = post.category_id JOIN user ON user.id = post.user_id WHERE YEAR(post.updated_at) = ? `;
        const post = await Query.findOne(query, req.params.date);
        console.log(post);

        if(!post){
            const msg = "This post don't exist in DB 🚫";
            res.status(400).json(success(msg));
        } else {
            const msg = "Post revered ✅ --> " + post.title;
            res.status(201).json(success(msg, post));
        }
    } catch (err) {
        throw Error(err);
    }

}

export const postByCategory = async (req, res) => {
    try {
        const query = "SELECT post.id, post.title, post.content, post.image, post.created_at, category.name AS 'CategoryName', user.username AS 'Redactor' FROM post JOIN category ON category.id = post.category_id JOIN user ON user.id = post.user_id WHERE category.name = ?";
        const post = await Query.findOne(query, req.params.category);

        if(!post){
            const msg = "This post don't exist in DB 🚫";
            res.status(200).json(success(msg));
        } else {
            const msg = "Post revered ✅--> " + post.title;
            res.status(200).json(success(msg, post));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const postByUser = async (req, res) => {
    try {
        const query = "SELECT post.id, post.title, post.content, post.image, post.created_at, category.name AS 'CategoryName', user.username AS 'Redactor' FROM post JOIN category ON category.id = post.category_id JOIN user ON user.id = post.user_id WHERE post.user_id = ?";
        const post = await Query.findOne(query, req.params.user_id);

        if(!post){
            const msg = "No post for this User 🚫";
            res.status(200).json(success(msg));
        } else {
            const msg = "All Post are recovered" + post.title;
            res.status(201).json(success(msg, post));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const addPost = async (req,res) => {
    try {
        const query = "SELECT * FROM post WHERE title = ?";
        const [isTitleExist] = await Query.findOne(query, req.body.title);

        if(!isTitleExist){ 
            const query = "INSERT INTO post (title, content, image, created_at, updated_at, category_id, user_id) VALUES (?, ?, ?, NOW(), NOW(), ?, ?)";
            const [result] = await Query.write(query, req.body);

            if(result.affectedRows !== 0){
                const msg = "Post added Successfully ✅";
                res.status(201).json(success(msg));
            } 
            else {
                const msg = "POST not added 🚫";
                res.status(401).json(success(msg, isTitleExist));
            }
        }
        else {
            const msg = "Post Title Already Taken 🚫";
            res.status(401).json(success(msg, isTitleExist));
        }
    } catch (err) {
        throw Error(err);
    }
}


export const updatePost = async (req,res) => {
    try {

        const query = "UPDATE post SET title = ?, content = ?, updated_at = NOW() WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Post updated successfully ✅";
            res.status(201).json(success(msg, {...req.body}));

        } else throw Error("Post not updated, probably error syntax 🚫");
        
    } catch (err) {
        throw Error(err);
    }
}

export const removePost = async (req,res) => {
    try {
        const query = "DELETE FROM post WHERE id = ?";
        const result = await Query.remove(query, req.params.id);
        
        if(!result.affectedRows){
            const msg = "Post updated successfully ✅";
            res.status(201).json(success(msg));

        } else throw Error("Post no removed, probably syntax error 🚫");
    } catch (err) {
        throw Error(err);
    }
}
