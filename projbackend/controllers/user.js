const User = require("../models/user"); //importing model from user
const Order = require("../models/order")

exports.getUserById = (req, res, next, id) =>
{
    User.findById(id).exec((err, user) => {
        if(err || !user){
                return res.status(400).json({
                    error : "No user was found in DB"
                })
        }

        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    //THE BELOW TWO FIELDS ARE SET TO UNDEFINED BECAUSE WHEN THE USER REQUEST A PROFILE
    //IT MUST NOT SHOW OR POPULATE THE SALT VALUE AND ENCRYP PASSWORD AS PER THE SECURITY ISSUE
    //WE CAN SET THE FIELDS WHICH ARE NECESSARY ACCORDING TO OUR SECURITY REQUIREMENT.
    //HERE WE ARE JUST MAKING THEM AS UNDEFINED IN USERS PROFILE
    //NOT IN THE DATABSE
    req.profile.salt = undefined;
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile);
};



exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err, user) => {
            if(err) //here we can even use just err because in the above line if the id is not found then there it will return the error message so no need to check here.
            {
                return res.status(400).json({
                    error: "You are not authorized to update"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user)
        }
    )
}


exports.userPurchaseList = (req, res) =>
{
        Order.find({user : req.profile._id})
        .populate("user", "_id name")
        .exec((err, order) => {
            if(err){
                return res.status(400).json({
                    error: "No oder in this account"
                })
            }
            return res.json(order)
        } )
}


exports.pushOrderInPurchaseList = (req, res, next) =>
{
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id : product._id,
            name : product.name,
            description : product.description,
            category : product.category,
            quantity : product.quantity,
            amount: req.body.order.amount,
            transaction_id : req.body.order.transaction_id
        })
    });

    //store in DB
    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$push: {purchases : purchases}},
        {new : true},
        (err, purchases) => {
            if(err)
            {
                return res.status(400).json({
                    error: "Unable tosave purchase list"
                })
            }
            next()
        }
    )

}