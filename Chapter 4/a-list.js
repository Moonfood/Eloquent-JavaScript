"use strict";

/* 
    Chapter 4, Task 3 - A List

    let list = {
        value: 1,
        rest: {
            value: 2,
            rest: {
                value: 3,
                rest: null
            }
        }
    };

    - Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument. 
    - Also write a listToArray function that produces an array from a list. 
    - Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list.
    - And nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element), or undefined when there is no such element.

    If you haven’t already, also write a recursive version of nth.
*/

function arrayToList(array) {
    let list = null;
    for (let i = array.length-1; i>=0; i--) { //Iterate backwards through array
        let node = { value: array[i], rest: list }; //Give node a value, assign rest to the current list
        list = node;
    }
    return list;
}

function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) { //let node = list; While this node exists; Go to the next inner node
        array.push(node.value);
    }
    return array;
}

//Create a new list, adding a value at the start and appending the given list
function prepend(element, list) {
    let newList = { value: element, rest: list };
    return newList;
}

//Find the nth element in a given list
function nth(list, n) {
    if (n == 0) {  //If n = 0 we have arrived at our desired element
        return list.value;
    } else if (!list.rest) { //If the next node doesn't exist we're at the end of the list
        return undefined;
    } else {
        return nth(list.rest, n -= 1); //Onwards, go one step deeper into the list and decrease n
    }
}

console.log(arrayToList([10, 20]));
//-> { value: 10, rest: { value: 20, rest: null } }
console.log(listToArray(arrayToList([10, 20, 30])));
//-> [ 10, 20, 30 ]
console.log(prepend(10, prepend(20, null)));
//-> { value: 10, rest: { value: 20, rest: null } }
console.log(nth(arrayToList([10, 20, 30]), 2));
//-> 30