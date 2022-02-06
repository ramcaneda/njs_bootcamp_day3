const fs = require('fs');

let fileName = 'myfile.txt';

if(fs.existsSync(fileName)){
    let fileBuffer = fs.readFileSync(fileName);
    let fileString = fileBuffer.toString();

    console.log(fileString);
}
else{
    console.log(fileName + " not found");
}