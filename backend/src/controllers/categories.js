import { success } from "../helpers/index.js";
import Query from "../model/query.js";

export const allCategories = async (req, res) => {
    try {
        const query = "SELECT * FROM category";
        const [categories] = await Query.find(query);

        if(categories.length){
            const msg = "All categories are recovered ✅";
            res.status(200).json(success(msg, categories));
        } else {
            const msg = "No categories in DB yet 🚫";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const oneCategory = async (req, res) => {
    try {
        const query = "SELECT * FROM category WHERE id = ?";
        const [category]   = await Query.findOne(query, req.params.id);
        
        if(!category){
            const msg = "This category don't exist in DB 🚫";
            res.status(200).json(success(msg));
        } else {
            const msg = "Category recovered --> " + category.name;
            res.status(200).json(success(msg, category));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const addCategory = async (req,res) => {
    try {
        const query = "INSERT INTO category (name, description, image, created_at, updated_at) VALUES (?,?,?,NOW(), NOW())";
        const result = await Query.write(query, req.body);
        
        const msg = "Category added successfully ✅";
        res.json(success(msg, result));
    } catch (err) {
        throw Error(err);
    }
}

export const updateCategory = async (req,res) => {
    try {

        const query = "UPDATE `category` SET `name` = ?, description = ?, image = ?, updated_at = NOW() WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Category updated successfully. ✅";
            res.json(success(msg));

        } else throw Error("Category not updated, probably syntax error 🚫");
        
    } catch (err) {
        throw Error(err);
    }
}

export const removeCategory = async (req,res) => {
    try {
        const query = "DELETE FROM category WHERE id = ?";
        const result = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Category removed ✅";
            res.json(success(msg));

        } else throw Error("Category no removed, probably object error 🚫");

    } catch (err) {
        throw Error(err);
    }
}