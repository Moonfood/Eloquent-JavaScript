"use strict";

/* 
    Chapter 5, Task 1 - Flattening

    Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.
*/

let arrays = [[1, 2, 3], [4, 5], [6]];

console.log(arrays.reduce (
    (accumulator, currentValue) => accumulator.concat(currentValue)
));
//-> [ 1, 2, 3, 4, 5, 6 ]

/* 
    How does this work? (For my understanding)
  
    The reduce method iterates over the contents of arrays, - [1,2,3], [4,5], [6]
    for each element in the array, applies the function within the reducers parameters,
    - The accumulator value is the sum of all the values
    - The currentValue is the element we are currently iterating on

    This line from MDN really helped me to understand the reduce function:
    let reducer = (accumulator, currentValue) => accumulator + currentValue
*/