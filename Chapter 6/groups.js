"use strict";

/* 
    Chapter 6, Task 2 - Groups

    The standard JavaScript environment provides another data structure called Set. Like an instance of Map, 
    a set holds a collection of values. Unlike Map, it does not associate other values with those—it just tracks which values are part of the set.
    A value can be part of a set only once—adding it again doesn’t have any effect.

    Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods. 
    Its constructor creates an empty group, and adds a value to the group (but only if it isn’t already a member), 
    delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group.

    Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.

    Give the class a static from method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it.
*/

class Group {
    constructor(value) {
        this.group = [];
    }

    add(value) { //Adds a new value to this group, if the value is not in the group already
        if (!this.has(value)) {
            this.group.push(value);
        }
    }

    delete(value) { //Filters the group to deletes a value
        this.group = this.group.filter(item => item !== value);
    }

    has(value) { //Returns true if value can be found in this group, else false
        return this.group.includes(value);
    }

    static from(values) { //Create a new group with a specified collection of values
        let group = new Group();
        for (let item of values) {
            group.add(item);
        }
        return group;
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
//-> true
console.log(group.has(30));
//-> false
group.add(10);
group.delete(10);
console.log(group.has(10));
//-> false
