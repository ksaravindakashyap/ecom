const { request } = require("express");
const Category = require("../models/category")


exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {  //cate is return instead of category bcz that is long name
        if(err){
            return res.status(400).json({
                error: " Category not found in DB"
            })
        }
        req.category = cate;
    })
    next();
}

exports.createCategory = (req,res) => {
    const category = new Category(req.body)
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: " Not able to save category in DB"
            })
        }
        res.json({ category });
    })

}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: " No category found in db"
            })
        }
        res.json(categories)
    })
}


exports.updateCategory = (req, res) => {
    const category = req.category;  //we are able to grab it because of the middleware present above. we are able to grab from parameter then populating here
    category.name = req.body.name; //responsible for grabbing category name which is sent from the frontend.

    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update category"
            })
        }
        res.json(updatedCategory);
    })
}

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if(err)
        {
            return res.status(400).json({
                error: "failed to delete this category" //update "deleted this category by specific category using `` "
            })
        }
        res.json({
            //message: "Successfully deleted"
            message : `successfully deleted ${category.name}`
        })
    })
}