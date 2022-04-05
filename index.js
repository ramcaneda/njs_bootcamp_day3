const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 1337;

app.use(bodyParser.text());

app.use(bodyParser.json());

app.use('/myfile', require('./myfile_apis'));

app.use('/moviereviews', require('./reviews'));

app.listen(port, ()=>{
    console.log(`App listening on port http://localhost:${port}`);
});