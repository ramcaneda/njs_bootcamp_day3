const router = require('express').Router();
const fs = require('fs');

const myfile = 'myfile.txt';

router.use((req, res, next)=>{
    if(!fs.existsSync(myfile)){
        fs.writeFileSync(myfile, '');
    }
    next();
});

router.get('/', (req, res) => {
    let content = fs.readFileSync(myfile);
    res.send(content);
});

router.post('/', (req, res) => {
    fs.appendFileSync(myfile, req.body + '\n');
    let newContent = fs.readFileSync(myfile);
    res.send(newContent);
});


router.delete('/', (req, res) => {
    fs.writeFileSync(myfile, '');
    let newContent = fs.readFileSync(myfile);
    res.send(newContent);
});

module.exports = router;