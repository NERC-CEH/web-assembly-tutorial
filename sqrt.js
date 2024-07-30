// since the .wasm file is saved locally, we require the file system to load it 
// path is used to expand (or resolve) the current directory to generate a full file path to the wasm file
const fs = require('fs');
const path = require('path');

const wasmFilePath = path.resolve(__dirname, 'sqrt.wasm');
const wasmFile = fs.readFileSync(wasmFilePath);

// use the date library for timing
const d = new Date();

let jsStart = performance.now()
console.log('Javascript:')
console.log(Math.sqrt(4))
console.log(Math.sqrt(16))
console.log(Math.sqrt(1024))
let jsFinish = performance.now()
console.log(`Javascript Math.sqrt time = ${jsFinish - jsStart}`)

WebAssembly.instantiate(new Uint8Array(wasmFile))
  .then((obj) => {
    const instance = obj.instance;
    const getSqrt = instance.exports.get_sqrt;
    let waStart = performance.now()
    console.log('Web assembly:')
    console.log(getSqrt(4)) // Logs 2
    console.log(getSqrt(16)); // Logs 4
    console.log(getSqrt(1024)); // Logs 2000
    let waFinish = performance.now()
    console.log(`Web assembly getSqrt time = ${waFinish - waStart}`)

  })
  .catch((err) => console.error(err));

