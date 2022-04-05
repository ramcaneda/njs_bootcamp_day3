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
    res.send(req.reviews);
});

router.get('/:movietitle', (req, res) => {
    res.send(req.reviews.filter(r=>r.movie == req.params.movietitle));
});

router.post('/', (req, res) => {
    req.reviews.push(req.body);
    fs.writeFileSync(myfile, JSON.stringify(req.reviews));
    res.send(req.body);
});

module.exports = router;