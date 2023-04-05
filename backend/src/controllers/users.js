import { success, error } from "../helpers/index.js";
import Query from "../model/query.js";
import {hash, compare} from "bcrypt";
import jwt from 'jsonwebtoken';

const {TOKEN_SECRET} = process.env;
const saltRounds = 10;

const checkToken = async (req, res) => {
    console.log(req.params);
    try {
        const query = "SELECT email, isAdmin FROM user WHERE id = ?";
        const [user] = await Query.findOne(query, req.params.id);
        
        if(user){
            const msg = "User recovered ✅";
            res.status(200).json(success(msg, user));
        } else {
            const msg = "We don't have user with those identifies 🚫";
            res.status(200).json(success(msg));
        }

    } catch (error) {
        throw Error(error);
    }
}

// const one = async (req, res) => {
//     try {
//         const query = "SELECT email, isAdmin FROM user WHERE id = ?";
//         const user = await Query.findOne(query, req.params.id);
        
//         if(user){
//             const msg = "Utilisateur récupéré";
//             res.status(200).json(success(msg, user));
//         } else {
//             const msg = "Pas de compte avec ces identifiants";
//             res.status(200).json(success(msg));
//         }

//     } catch (error) {
//         throw Error(error);
//     }
// }
export const getAdmins = async (req, res) => {
    try {
        const query = "SELECT * FROM user WHERE role = 'admin' ";
        const [users] = await Query.find(query);

        if(users.length){
            const msg = "Admins are recovered ✅";
            res.status(200).json(success(msg, users));
        } else {
            const msg = "No admins yet 🚫";
            res.status(401).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}
const register = async (req, res) => {
    try {    
        const query1 = "SELECT username, email, password FROM user WHERE username = ?";
        const [isUsernameExist] = await Query.findOne(query1, req.body.username);
        const query2 = "SELECT username, email, password FROM user WHERE email = ?";
        const [isEmailExist] = await Query.findOne(query2, req.body.email);

        if((!isUsernameExist) && (!isEmailExist)){
            const hashedPWD = await hash(req.body.password, saltRounds);
            const username = req.body.username;
            const email = req.body.email;
            const query = "INSERT INTO user (username, email, password, avatar, about, created_at, updated_at, role) VALUES (?,?,?, 'no-image-user.png', 'No About Yet', NOW(), NOW(), 'guest')";
            const result = await Query.write(query, {username, email, hashedPWD});

            if(result.affectedRows !== 0) {
                res.status(201).json(success("Register Successfully ✅ !", result));
            }
            else {
                const msg = "There is a problem server 🚫";
                res.status(401).json(success(msg, isUsernameExist));
            }
        }
        else {
            const msg = "Email or username already taken 🚫";
            res.status(401).json(success(msg, isUsernameExist));
        }
        
    } catch (error) {
        throw Error(error);
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const query = "SELECT * FROM user WHERE email = ?";
        const [user] = await Query.findOne(query, email);
        if(!user || (user.email !== req.body.email)){
            res.status(401).json(error("Authentication problem 🚫"));
            return;
        } 
        const isSame = await compare(password, user.password);        
        if(isSame){
            const TOKEN = jwt.sign({id: user.id}, TOKEN_SECRET );
            const { id, username, email, password, avatar, about, created_at, updated_at } = user;
            res.status(201).json(success("Authentication successfully ✅", {TOKEN, ...user}));
        } else {
            res.status(401).json(error("Authentication problem 🚫"));
        }
    } catch (error) {
        throw Error(error);
    }
}

const updateUser = async (req, res) => {
    try {
        if(req.body.password){
           req.body.password = await hash(req.body.password, saltRounds);
        }

        if(req.body.avatar === "") {
            req.body.avatar = "no-image-user.jpg";
        }

        const query = "UPDATE `user` SET password = ?, avatar = ?, about = ?, updated_at = NOW() WHERE id = ?";
        const [result] = await Query.write(query, req.body);
        
        if(result.affectedRows !== 0){
            res.status(201).json(success("User updated successfully ✅", {...req.body} ));
        } else {
            res.status(401).json(error("Server problem 🚫"));
        }
        
    } catch (error) {
        throw Error(error);
    }
}

const deleteAccount = async (req, res) => {
    try {
        const query = "DELETE FROM user WHERE id = ?";
        const result = await Query.remove(query, req.params.id);
        
        if(!result.affectedRows){
            const msg = "User updated successfully ✅";
            res.status(201).json(success(msg));

        } else throw Error("User no removed, probably syntax error 🚫"); 
    } catch (error) {
        throw Error(error);
    }
}

export {checkToken, register, login, updateUser, deleteAccount};