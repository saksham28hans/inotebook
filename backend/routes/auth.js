//Include express
const express = require('express');
//Include User model
const User = require('../models/User');
//Include express router
const router = express.Router();
//Include express validator
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');
const { reset } = require('nodemon');
const jwt_secret = "This is @ secret stri@@ng";

//Route 1 : Create a user using Post "/api/auth/create". No login required.
router.post('/create',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],async(req,res)=>{
    let success = false;
    const errors = validationResult(req);   
    if (!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array() });
      }
      try {
    //Check whether a user with the emailId already exists.
      let user = await User.findOne({email:req.body.email});
      if(user)
      {
          return res.status(400).json({success,error:"Sorry this emailId already exists"});
      }
     
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        email : req.body.email,
        password: secPass,
      })
      
     const data = {
         user : {
             id : user.id
         }
     }
     console.log(data);
      const authToken = jwt.sign(data,jwt_secret);
      success = true;
      res.send({success,authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({success,error:"Interval server error"});
    }
      
      //.then(user => res.json(user)).catch(err=> res.json({error:"Please enter a unique Email Id",message : err.message}));
   // const user = User(req.body);
    //user.save();
    //res.send(req.body);
    //res.json([]);
})

//Route 2: Login a user using Post "/api/auth/login". No login required.
router.post('/login',[
  body('email').isEmail(),
  body('password').exists()
],async(req,res)=>{
  let success = false;
  const errors = validationResult(req);   
  if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const {email,password} = req.body;
   try {
     let user = await User.findOne({email})
     if(!user)
     {
       return res.status(400).json({success,message:"Please try to login with correct username and password"});
     }
     let pass_corr = await bcrypt.compare(password,user.password);
     if(!pass_corr)
     {
      return res.status(400).json({success,message:"Please try to login with correct username and password"});
     }
     const data = {
      user : {
          id : user.id
      }
  }
   const authToken = jwt.sign(data,jwt_secret);
   success = true;
   res.send({success,authToken});
     
   } catch (error) {
    console.error(error.message);
    res.status(500).json({success,error:"Interval server error"});
   }
  })

//Route 3: Get User using authentication token using Post "/api/auth/getuser". Login Required
router.post('/getuser', fetchUser, async(req,res)=>{
   try {
     userId = req.user.id;
     console.log(userId);
     const user = await User.findById(userId).select("-password");
     res.send(user);
   } catch (error) {
    console.error(error.message);
    res.status(500).json({error:"Interval server error"});
   }
})
module.exports = router;