const fs_sync = require("fs");
const fs = require("fs/promises");

let fileName = "myfile.txt";

async function fileExists(fileName) {
    return new Promise((resolve, reject)=>{
        resolve(fs_sync.existsSync(fileName));
    });
}

(async () => {
  if (await fileExists(fileName)) {
    let fileBuffer = await fs.readFile(fileName);
    let fileString = fileBuffer.toString();

    console.log(fileString);
  } else {
    console.log(fileName + " not found");

    await fs.writeFile(fileName, "We are the knights who say NI!");
    console.log(fileName + " created!");
  }

  await fs.appendFile(fileName, "\nNo! not the knights who say NI!");
})();
