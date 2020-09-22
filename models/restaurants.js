const db = require('./conn')


class restaurantsGetter {
    constructor (name, category){
    this.name = name,
    this.category = category
    }
    static async getRestaurants(){
        try{
            const response = await db.any(`SELECT * FROM restaurants;`)
            return response
        }
        catch (error){
            return error.message
        }
    }

    static async getDetails (slug){
        try {
            const response = await db.any (`SELECT restaurants.id as rest_id, reviewer.name as reviewer, restaurants.name, category, distance, favorite_dish, does_takeout, reviews.title, restaurants.slug as rest_slug, reviewer.slug as user_slug , reviews.review FROM restaurants INNER JOIN reviews ON restaurants.id = reviews.restaurant_id INNER JOIN reviewer ON reviews.reviewer_id = reviewer.id WHERE restaurants.slug = $1;`,[slug])
            return response
        }
        catch(error) {
            return error.message;
        }
    }

    static async getReviewer(slug){
        try {
            const response = await db.any (`SELECT * FROM reviewer WHERE slug = $1`, [slug])
            return response
        }
        catch (error){
            return error.message
        }
    }
    static async getReviews(){
        try {
            const response = await db.any(`SELECT * FROM reviews`)
            return response
        }
        catch {
            return error.message
        }
    }
    static async getReviewers(){
        try {
            const response = await db.any(`SELECT * FROM reviewer`)
            return response;
        }
        catch {
            return error.message
        }
    }
    static async postReview(data){
        await db.any(`INSERT INTO reviews (title, review, stars, reviewer_id, restaurant_id) VALUES ($1, $2, $3, $4, $5)`, [data.title, data.review, data.stars, data.reviewer, data.restaurant])
    }
    static async addUser(data){
        await db.any(`INSERT INTO reviewer (name, email, karma, slug, password) VALUES ('${data.name[0]} ${data.name[1]}', '${data.email}', 0, '${data.name[0]}_${data.name[1]}', '${data.password}')`)
    }
}

module.exports = restaurantsGetter