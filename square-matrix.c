// This function returns a pointer to the first row of the 2D array
const int (*create_array())[3]{
    // create an array of numbers
    static const int array[3][3] = {{2,3,4},{5,6,7},{8,9,10}};
    // In C, the name of a 2D array can be used as a pointer to its first row.
    return array;
}

// This function squares each element in the array
const int (*square_array(int array[3][3]))[3]{
    static int newArray[3][3];
    int i;
    int j;
    // set all elements as 0 
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            newArray[i][j] = array[i][j] *  array[i][j];
        }
    }
    return newArray;
}