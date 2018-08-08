"use strict";

/* 
    Chapter 3, Task 3 - Bean Counting

    Write a function countBs that takes a string as its only argument 
    and returns a number that indicates how many uppercase “B” characters there are in the string.

    Next, write a function called countChar that behaves like countBs, 
    except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase “B” characters). 
    Rewrite countBs to make use of this new function.
*/

let countBs = str => countChar(str, "B");

function countChar(str, c) {
    let count = 0;
    for (let i=0; i < str.length; i++) {
        if (str[i] == c) {
            count++;
        }
    }
    return count;
}

console.log(countBs("BBC"));
//-> 2
console.log(countChar("kakkerlak", "k"));
//-> 4