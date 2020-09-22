'use strict'
const express = require('express'),
    router = express.Router();
const theRestaurants = require('../models/restaurants');
const db = require('../models/conn')



router.get('/:name?', async(req, res)=>{
    if (req.params.name === undefined){
        res.redirect('/')
    }
    else {
        const restaurants = await theRestaurants.getRestaurants();
        console.log(restaurants)
        const restaurantDetails = await theRestaurants.getDetails(req.params.name)
        console.log(restaurantDetails)
        const reviewArr = restaurantDetails.map(restaurant => {return {reviewer: restaurant.reviewer, review: restaurant.review, title: restaurant.title }})
        const reviewerArr = await theRestaurants.getReviewers();
        console.log(reviewArr)
        res.render("template",{
            locals: {
                title: 'Details',
                data: restaurantDetails[0],
                reviews: reviewArr,
                reviewers: reviewerArr
            },
            partials: {
                partial:'partial-restaurant'
            }
        })
    }
})
router.post('/:name?',async(req,res)=>{
    console.log(req.body)
    theRestaurants.postReview(req.body)
    res.redirect('back')
})



module.exports = router;