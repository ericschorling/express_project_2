'use strict'
const express = require('express'),
    router = express.Router();
const db = require('../models/conn')
//const UsersModel = require("../models/usersModel");
const UserModel = require('../models/usersModel');
const bcrypt = require('bcryptjs')

router.get("/", async (req, res)=>{
    
    res.render("template", {
        locals: {
            title: "Sign Up",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-signup'
        }
    })
})

router.post('/', async (req, res) => {
    //console.log(req.body)
    const { name, email, password } = req.body;
    //SALTing the HASH
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const userInstance = new UserModel(null, `${name[0]} ${name[1]}`, email, hash)
    userInstance.save().then(response =>{
        if (response.id !== undefined){
            res.redirect('/login')
        }else {
            res.redirect('back')
        }
    })
    //res.redirect('back')
})

module.exports = router