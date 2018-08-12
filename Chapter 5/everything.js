"use strict";

/* 
    Chapter 5, Task 3 - Everything

    Implement every as a function that takes an array and a predicate function as parameters. 
    Write two versions, one using a loop and one using the some method.
*/

function every(array, test) {
    for (let element of array) {
        if (!test(element)) {
            return false;
        }
    }
    return true;
}

function every2(array, test) {
    return !array.some(element => !test(element));
}

console.log(every2([1, 3, 5], n => n < 10));
// → true
console.log(every2([2, 4, 16], n => n < 10));
// → false
console.log(every2([], n => n < 10)); //Some converts returns false for any condition put on an empty array
// → true

/*
    Notes on every2:
    
    - Some returns true when one element passes the test
    - Some returns false when none of the elements pass the test, or an empty array is given

    - For every element in some, apply the test. 
      
    - If this test returns true (passes), convert to false and continue to the next element. 
      We're converting to false because some immediately returns after one element passes the test, and we want to test every element.
    - If this test returns false (fails), convert to true to break the some method.
 
    - Flip the Boolean returned by some, and return it.

    De Morgan's laws: a && b equals !(!a || !b).
*/