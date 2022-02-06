const fs = require('fs');

let fileBuffer = fs.readFileSync('myfile.txt');
let fileString = fileBuffer.toString();

console.log(fileString);