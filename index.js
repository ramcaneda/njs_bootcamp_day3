const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 1337;

app.use(bodyParser.text());

app.use('/myfile', require('./myfile_apis'));

app.listen(port, ()=>{
    console.log(`App listening on port http://localhost:${port}`);
});