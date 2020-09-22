'use strict'
const express = require('express'),
    router = express.Router();
// const theRestaurants = require('../models/restaurants');
const db = require('../models/conn');
const UserModel = require('../models/usersModel');

router.get("/", async (req, res)=>{
    
    res.render("template", {
        locals: {
            title: "Login",
        },
        partials: {
            partial: 'partial-login'
        }
    })
})



router.post("/", (req, res)=>{
    const { email , password } = req.body
    const userInstance = new UserModel(null, null, email, password);
    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        console.log(req.session.is_logged_in)
        if (!!response.isValid){
            const {name, user_id}= response;
            req.session.name = name;
            req.session.user_id = user_id;
            console.log("session: ", req.session)
            res.redirect('/')
        }else {
            res.sendStatus(401)
        }
    })
})



module.exports = router