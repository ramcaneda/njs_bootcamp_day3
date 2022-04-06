const router = require('express').Router();
const fs = require('fs');

const myfile = 'movie_reviews.json';

router.use((req, res, next)=>{
    if(!fs.existsSync(myfile)){
        fs.writeFileSync(myfile, '[]');
    }
    let rawfile = fs.readFileSync(myfile);
    req.reviews = JSON.parse(rawfile);
    next();
});

router.get('/', (req, res)=>{
    /**
     * TODO:
     * return average per movie instead of list of all reviews, 
     * follow this format:
     * {
     *    "movie": "Life of Brian",
     *    "rating": 4.9
     * }
     */
    res.send(req.reviews);
});

router.get('/:movietitle', (req, res) => {
    /**
     * TODO:
     * return average instead list of reviews, 
     * follow this format:
     * {
     *    "movie": "Life of Brian",
     *    "rating": 4.9
     * }
     */
    res.send(req.reviews.filter(r=>r.movie == req.params.movietitle));
});

router.post('/', (req, res) => {
    /**
     * TODO: 
     * set an "id" field before saving data
     */
    req.reviews.push(req.body);
    fs.writeFileSync(myfile, JSON.stringify(req.reviews));
    res.send(req.body);
});

router.delete('/:id', (req, res) => {
    /**
     * TODO:
     * implement a way to delete reviews identified by id
     */
    throw new Error('not implemented');
});

module.exports = router;