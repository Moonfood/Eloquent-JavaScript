"use strict";

/* 
    Chapter 4, Task 4 - Deep Comparison

    Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, 
    where the values of the properties are equal when compared with a recursive call to deepEqual.

    To find out whether values should be compared directly (use the === operator for that) or have their properties compared, 
    you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison.
    But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".

    The Object.keys function will be useful when you need to go over the properties of objects to compare them.
*/

/*
    I required a fair amount of help by the end of this one. The recursion part tripped me up.
    I had this answer 50% complete, and fairly messy before looking for help online. This is the answer, however the code is mostly not mine. 
    My goal was to fully understand this code, and where I went wrong. Hence the heavy commenting.  
    Will reattempt!

    - I wasted a lot of time by forgetting object properties can be accessed with object["property"]
    - Overthinking.. I made this problem more complicated than it had to be.
    - Recursive thinking is a mindset I have to get used to.
    - I need to improve my ability to see when short circuiting is necessary! It is a very useful tool.

*/

//Check if two object are the same, do they share the same properties and property values values
function deepEqual(obj1, obj2) {

    //Are the objects the same?
    if (obj1 === obj2) { 
        return true;
    }

    //Are we dealing with two objects that aren't null?
    //null has the type "object" when typeof is used, which is why it is in this if statement
    if (obj1 == null || typeof obj1 != "object" || //Short circuiting, if any of these conditions are true from left to right, false is returned. 
        obj2 == null || typeof obj2 != "object") { //If obj1 and obj2 are not null, and are of type object, then we are dealing with real objects and are free to continue.
            return false;
    }

    //Get array of object properties
    let keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);

    //Same number of properties?
    if (keys1.length != keys2.length) { 
        return false;
    }

    /*
        (Notes for the following iteration)
        If this key in keys1 is not included in the keys2 array return false.
        OR (if it is) then we are dealing with two objects of the same name that could be the same and need to be evaluated.
        Which is why deepEqual is being recursively called. To see if these two objects are the same, this is what deepEqual does.
        If they're not the same return false.
    */

    //Iterate through properties, if a property in key1 is included in key2, recursively call deepEqual on those two objects
    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        } 
    }

    return true; //No problems found, objects are the same. 
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true