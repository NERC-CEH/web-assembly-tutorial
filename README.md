# Web Assembly Tutorial 
The purpose of this repository is to create basic javascript files that can run web assembly code compiled from the C programming language. 

## Requirements 
To follow this tutorial you need:
1. access to a linux environment
2. node.js > v.8

## Setup 
1. [Emscripten](https://emscripten.org/) can be used to compile C code to web assembly binary files (.wasm). 
To install locally, follow this [guide](https://emscripten.org/docs/getting_started/downloads.html). Run ```source ./emsdk_env.sh``` to temporarily add emsdk to your path. 

2. [Web Assembly Binary Toolkit](https://github.com/WebAssembly/wabt) contains useful programs for debugging web assembly files. Clone it on GitHub and build it (I used cmake ```$ mkdir build
$ cd build
$ cmake ..
$ cmake --build .
$ make```). Use ```export PATH="/path/to/wabt/build/:$PATH"``` to temporarily add these programs to your path. 


## hello.js

This script prints "Hello world". The C file ```hello.c``` was compiled to ```hello.wasm``` using the following command: 

```emcc hello.c -o hello.wasm -s STANDALONE_WASM=1 -s EXPORTED_FUNCTIONS='["_get_hello"]' -s EXPORTED_RUNTIME_METHODS='["cwrap"]' --no-entry```

where:

* ```STANDALONE_WASM=1``` tells the program to only output a .wasm file. 

* ```EXPORTED_FUNCTIONS``` tells the program what functions to include in the wasm file (note the underscore added before the function name.)

* ```EXPORTED_RUNTIME_METHODS``` tells the program to wrap the function up in a way so that it can be called by javascript later. In this instance it's not important, but we will see how it is used in ```sqrt.js```.

* ```no-entry``` tells the compiler not to look for a ```main()``` function in the C code. 

To inspect the file we can call ```wasm-objdump hello.wasm -x```. This outputs the contents of the binary file including the functions:
```
Function[10]:
 - func[0] sig=1
 - func[1] sig=0 <get_hello>
 - func[2] sig=1 <_initialize>
 - func[3] sig=1 <emscripten_stack_init>
 - func[4] sig=0 <emscripten_stack_get_free>
 - func[5] sig=0 <emscripten_stack_get_base>
 - func[6] sig=0 <emscripten_stack_get_end>
 - func[7] sig=2 <_emscripten_stack_restore>
 - func[8] sig=3 <_emscripten_stack_alloc>
 - func[9] sig=0 <emscripten_stack_get_current>
 ```
 and data held in memory:  

```
 Data[1]:
 - segment[0] memory=0 size=12 - init i32=65536
  - 0010000: 4865 6c6c 6f20 776f 726c 6473 00         Hello world.
  ```
Finally, we can run the javascript file using 
``` node hello.js``` which outputs ```Hello world```. Have a look at the comments in ```hello.c``` file and ```hello.js``` for more details. 

## sqrt.js

```sqrt.c``` uses the ```<Math.h>``` C library to compute a square root. It was compiled to ```sqrt.wasm``` using:

```emcc sqrt.c -o sqrt.wasm -s STANDALONE_WASM=1 -s EXPORTED_FUNCTIONS='["_get_sqrt"]' -s EXPORTED_RUNTIME_METHODS='["cwrap"]' --no-entry```

```sqrt.wasm``` was compared ```Math.sqrt()``` in javascript in the ```sqrt.js``` file. Running ```node sqrt.js``` returns the following:  

```
Javascript:
2
4
32
Javascript Math.sqrt time = 5.622934999999998
Web assembly:
2
4
32
Web assembly getSqrt time = 0.4627499999999998
```

Computing the square root of three numbers was around 12 times faster using web assembly instead of vanilla javascript.
