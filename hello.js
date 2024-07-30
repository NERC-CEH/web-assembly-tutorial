// since the .wasm file is saved locally, we require the file system to load it 
// path is used to expand (or resolve) the current directory to generate a full file path to the wasm file
const fs = require('fs');
const path = require('path');

const wasmFilePath = path.resolve(__dirname, 'hello.wasm');
const wasmFile = fs.readFileSync(wasmFilePath);

// Notice we didn't need to import WebAssembly, the web assembly API is default in all modern browsers, and node (since v 8)
// WebAssembly.instantiate requires an array of bytes which are read from the web assembly hello.wasm binary file
WebAssembly.instantiate(new Uint8Array(wasmFile))
  .then((obj) => {
    const instance = obj.instance;
    // we access the function getHello()
    const getHello = instance.exports.get_hello;
    // we call the function getHello() which returns a pointer to the memory location of hello[]
    const helloPtr = getHello();
    // we access the memory associated with our function 
    const memory = new Uint8Array(instance.exports.memory.buffer);
    // we read from the correct memory address by using the pointer, and incrementing its value by one each time, until there is no more data to read. 
    let str = "";
    for (let i = helloPtr; memory[i] !== 0; i++) {
      // the data is returned as bytes, so we convert it to characters (UTF-16 character encoding)
      str += String.fromCharCode(memory[i]);
    }
    console.log(str); // Logs "Hello world"
  })
  .catch((err) => console.error(err));