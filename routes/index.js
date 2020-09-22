'use strict'
const express = require('express'),
    router = express.Router();
const theRestaurants = require('../models/restaurants');
const db = require('../models/conn')
const UsersModel = require("../models/usersModel")

router.get('/', async(req, res)=>{
    const restaurants = await theRestaurants.getRestaurants();

    console.log(restaurants)
    res.render('template',{
        locals: {
            title: 'Restaurants',
            data: restaurants
        },
        partials: {
            partial:'partial'
        }
    })
})

router.get ('/logout',(req, res)=>{
    req.session.destroy();
    res.redirect('/')
})

// router.post("/", async (req, res)=>{
//     console.log(req.body)
//     res.redirect('/')
// })
module.exports = router;