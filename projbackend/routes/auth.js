var express = require('express')
var router = express.Router();
const { check } = require('express-validator');
const {signout , signup ,signin,isSignedIn } = require("../controllers/auth")



router.post("/signup",[
    check("name","name should be atleast 5 characters").isLength({ min: 5 }),
    check("email","email is required").isEmail(),
    check("password","password must be atleast 3 char").isLength({min : 3}),
], signup)

router.post(
    "/signin",
    [
    check("email","email is required").isEmail(),
    check("password","password field is required").isLength({min : 3}),
], 
signin
)


router.get("/signout", signout )
router.get("/signin", signin )
router.get("/testroute", isSignedIn, (req,res) => {
    res.send(req.auth)
})

module.exports = router; 