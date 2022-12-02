const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const fetchUserData = require('../middleWare/fetchUserData');

// ROUTE 1: Create a user using: POST "/api/auth/adduser". No login required 
router.post('/adduser',
    body('email', 'Enter a valid email').isEmail(), // Email validator
    body('password', 'Your password must be minimum 8 characters long, should contain at-least 1 Uppercase letter, 1 Lowercase, 1 Numeric and 1 special character')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), // Password validator
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation failed");
            return res.status(400).json({ errors: errors.array() });
        } else {
            // Check whether the user with this email exists already
            try {
                const user = await User.findOne({
                    email: req.body.email
                })
                if (user) {
                    res.status(400).json({ error: "User already exists" })
                }
                else {
                    // Create a new user 
                    const salt = await bcrypt.genSaltSync(10);
                    const securePassword = await bcrypt.hashSync(req.body.password, salt);
                    const newUser = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: securePassword
                    });
                    await newUser.save()
                    const payload = {
                        user: {
                            id: newUser.id
                        }
                    }
                    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({ token, success: true })
                    })
                }
            } catch (error) {
                // Server error
                console.log(error.message);
                res.status(500).json({ msg: "Internal Server Error", "success": false });
            }
        }
    })
// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login',   
    body('email', 'Enter a valid email').isEmail(), // Email validator
    body('password', "It can't be empty").exists(), // Password validator   
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation failed");
            return res.status(400).json({ errors: errors.array() , success: false});
        } else {
            // Check whether the user with this email exists already
            try {
                const user = await User.findOne({
                    email: req.body.email
                })
                if (!user) {
                    res.status(400).json({ msg: "Please enter correct credentials", "success": false })
                }
                else {
                    // Authenticate the user
                    const passwordCompare = await bcrypt.compare(req.body.password, user.password);
                    if (!passwordCompare) {
                        res.status(400).json({ msg: "Please enter correct credentials", "success": false })
                    }
                    else {
                        const payload = {
                            user: {
                                id: user.id
                            }
                        }
                        jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.json({ token, "success": true })
                        })
                    }
                }
            } catch (error) {
                // Server error
                console.log(error.message);
                res.status(500).json({msg: "Internal Server Error", "success": false});
            }
        }
    })
// ROUTE 3: Get logged in user details using: POST "/api/auth/getuser". Login required
router.get('/getuser',fetchUserData, async (req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.status(200).json({user, "success": true});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error", "success": false });
    }
})
module.exports = router
