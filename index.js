const fs = require('fs');

let fileName = 'myfile.txt';

if(fs.existsSync(fileName)){
    let fileBuffer = fs.readFileSync(fileName);
    let fileString = fileBuffer.toString();

    console.log(fileString);
}
else{
    console.log(fileName + " not found");

    fs.writeFileSync(fileName, "We are the knights who say NI!");
    console.log(fileName + " created!");
}

fs.appendFileSync(fileName, "\nNo! not the knights who say NI!");


