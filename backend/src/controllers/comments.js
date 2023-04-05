import { error, success } from "../helpers/index.js";
import Query from "../model/query.js";

export const allComments = async (req, res) => {
    try {
        const query = "SELECT comment.id, comment.text, comment.created_at, comment.updated_at, comment.user_id, comment.post_id, post.title as 'PostTitle', user.username as 'UserName', user.avatar as 'UserAvatar' FROM comment INNER JOIN user ON comment.user_id = user.id INNER JOIN post ON post.id = comment.post_id";
        const [comments] = await Query.find(query);
        if(comments.length){
            const msg = "All comments are recovered ✅";
            res.status(200).json(success(msg, comments));
        } else {
            const msg = "No comments in DB yet 🚫";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const oneComment = async (req, res) => {
    try {
        const queryComment  = "SELECT comment.id, comment.text, comment.created_at, comment.updated_at, comment.user_id, comment.post_id, user.username as 'username', user.avatar as 'userAvatar' FROM comment INNER JOIN user ON user.id = comment.user_id WHERE comment.post_id = ? ORDER BY comment.created_at DESC";
        
        const comment = await Query.findOne(queryComment, req.params.id);
        
        if(!comment){
            const msg = "This comment don't exist in DB";
            res.status(200).json(success(msg));
        } else {
            const msg = "Comment revered --> " + comment.text;
            res.status(200).json(success(msg, comment));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const postComment = async (req, res) => {
    try {
        const queryComment  = "INSERT INTO comment (text, user_id, post_id) VALUES (?, ?, ?)";
        const [comment] = await Query.write(queryComment, req.body);
        
        if(comment.affectedRows !== 0) {
            res.status(201).json(success("COMMENT ADDED SUCCESSFULLY ✅", req.body));
        }
        
        else {
            res.status(401).json(success("COMMENT NOT ADDED 🚫"));
        }
        
    } catch (err) {
        throw Error(err);
    }
}

export const removeComment = async (req,res) => {
    try {
        const query = "DELETE FROM comment WHERE id = ?";
        const result = await Query.remove(query, req.params.id);
        
        if(!result.affectedRows){
            const msg = "Post updated successfully ✅";
            res.status(201).json(success(msg));

        } else throw Error("Post no removed, probably syntax error 🚫");
    } catch (err) {
        throw Error(err);
    }
}
