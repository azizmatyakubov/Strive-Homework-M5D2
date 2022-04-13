import fsp from "fs/promises";
import fs from "fs";

// const data = "Hello World";

// await fs.writeFile("hello.txt", data)

import { pipeline } from "stream";

const start = Date.now();

// const content = await fsp.readFile("hello.txt", "utf8");

// await fsp.writeFile("copied-file.txt", content);

const source = fs.createReadStream("hello.txt", {
  highWaterMark: 64,
});

const destination = fs.createWriteStream("copied-file.txt");

pipeline(source, destination, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("File copied successfully");
  }
});

const end = Date.now();

console.log(`Time taken: ${end - start}`);
