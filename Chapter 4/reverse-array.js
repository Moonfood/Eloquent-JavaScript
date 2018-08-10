"use strict";

/* 
    Chapter 4, Task 2 - Reversing an Array

    For this exercise, write two functions, reverseArray and reverseArrayInPlace.

    The first, reverseArray, takes an array as argument and produces a NEW array that has the same elements in the inverse order.
    The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. 

    Neither may use the standard reverse method.

    Which variant do you expect to be useful in more situations? Which one runs faster?
*/

//Reverse array by creating a new array
function reverseArray(array) {
    let newArray = [];
    for(let i=array.length - 1; i >= 0; i--) {
        newArray.push(array[i]);
    }
    return newArray;
}

//Reverse array by modifying existing array
function reverseArrayInPlace(array) {
    //Iterate over first half of array, as we replace the end
    for(let i=0; i < Math.floor(array.length / 2); i++) { 
        let reverseIndex = (array.length - 1) - i; //End item of array that we'll reverse with
        let temp = array[i];
        array[i] = array[reverseIndex];
        array[reverseIndex] = temp;
    }
    return array;
}

console.log(reverseArray(["A", "B", "C"]));
//-> [ 'C', 'B', 'A' ]

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
//-> [ 5, 4, 3, 2, 1 ]

/*
    1. Which variant do you expect to be useful in more situations?

    reverseArrayInPlace is not a pure function because it modifies the array it's given. 
    reverseArray is more useful in more situations due to the fact that it's a pure function,
    and pure functions are generally much more flexible, and reusable in new ways than non-pure functions.
    
    2. Which one runs faster?

    I believe reverseArrayInPlace is generally faster than reverseArray. 
    reverseArray needs to iterate through the entirety of a given array and push it's values to a new array. 
    Whereas reverseArrayInPlace only needs to iterate through half of an array without pushing anything.
    I think reverseArrayInPlace becomes faster than reverseArray as array sizes get larger.
*/