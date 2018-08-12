"use strict";

/* 
    Chapter 5, Task 4 - Dominant Writing Direction

    Write a function that computes the dominant writing direction in a string of text.
    The dominant direction is the direction of a majority of the characters that have a script associated with them. 
*/

let SCRIPTS = require('./scripts.js');

//Figures out what script a piece of text is using from a character code
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => { //First value to be true for the following function, destructuring
            return code >= from && code < to; 
        })) {
            return script;
        }
    }
    return null; //No script found
}

//Abstract function, computes a group name for a given element
function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item); //True/False depending on whether it passes groupName test
        let known = counts.findIndex(c => c.name == name); //Finds the index of the first value to return true, else -1
        if (known == -1) { //Not already in array
            counts.push({name, count: 1}); //Creating the object
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

//Find the majority of characters in this script, and return the direction property of the script
function dominantDirection(text) {

    let scripts = countBy(text, char => { //Iterating over the characters of a given piece of text
        let script = characterScript(char.codePointAt(0)); //Find the script for this character
        return script ? script.direction : "none"; //If a script can be found for this character return the script direction, otherwise the direction is "none"
    }).filter(({name}) => name != "none"); //Filter out all directions with the name "none", so we're just left with the interesing script directions

    if (scripts.length == 0) { //No characters have a script direction
        return "Could not resolve script direction";
    }

    return scripts.reduce((a, b) => a.count > b.count ? a : b).name; //Return the direction of with the highest count
}

console.log(dominantDirection("Hello!"));
//-> ltr
console.log(dominantDirection("Hey, مساء الخير"));
//-> rtl