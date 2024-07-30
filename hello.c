// This function returns a pointer to the first character in the array "Hello world".
const char* get_hello() {
    // hello[] is an array of characters 
    static const char hello[] = "Hello world";
    // In C, the name of an array can be used as a pointer to its first element.
    return hello;
}