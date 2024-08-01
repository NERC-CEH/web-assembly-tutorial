const fs = require('fs');
const path = require('path');

const wasmFilePath = path.resolve(__dirname, 'square-matrix.wasm');
const wasmFile = fs.readFileSync(wasmFilePath);

WebAssembly.instantiate(new Uint8Array(wasmFile))
  .then((obj) => {
    const instance = obj.instance;
    const create_array = instance.exports.create_array;
    const square_array = instance.exports.square_array;
    const memory = new Uint8Array(instance.exports.memory.buffer);
    const memorySize = memory.buffer.byteLength;

    console.log(`Memory size: ${memorySize/1000000} giga bytes`);

    const arrayPtrA = create_array();
    console.log(arrayPtrA)

    // Create a 3x3 matrix to store the values
    let array = [];
    for (let i = 0; i < 3; i++) {
      array[i] = [];
      for (let j = 0; j < 3; j++) {
        array[i][j] = memory[arrayPtrA + (i*12) + (j*4)]; // Adjust the index calculation
      }
    }

    console.log(array); // Logs the 3x3 matrix

    const arrayPtrB = square_array(arrayPtrA);
    console.log(arrayPtrB)

    // Recreate the 3x3 matrix to store the values
    array = [];
    for (let i = 0; i < 3; i++) {
        array[i] = [];
        for (let j = 0; j < 3; j++) {
        array[i][j] = memory[arrayPtrB + (i*12) + (j*4)]; // Adjust the index calculation
        }
    }

    console.log(array); // Logs the squared 3x3 matrix    
  })
  .catch((err) => console.error(err));