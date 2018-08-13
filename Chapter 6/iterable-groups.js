"use strict";

/* 
    Chapter 6, Task 3 - Iterable Groups

    Make the Group class from the previous exercise iterable. 

    If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. 
    That would work, but it defeats the purpose of this exercise.

    It is okay if your iterator behaves strangely when the group is modified during iteration.
*/

class Group {
    constructor(value) {
        this.group = [];
    }

    get(index) { //Get a group value at index
        return this.group[index];
    }

    length() { //Return the group array size
        return this.group.length;
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

    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}

class GroupIterator {
    constructor(group) {
        this.count = 0;
        this.group = group;
    }

    next() {
        if (this.count >= this.group.length()) { //If we're at the end of the array return done
            return {done: true};
        }
        let value = this.group.get(this.count);
        this.count++;
        return {value, done: false};
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
//-> a
//-> b
//-> c

/* Notes

- Instead of having to implement a get and length method in the Group class, I could have just referenced them directly.
- To reference the array in the group I could have written: this.group.group[this.count], this.group.group.length 

*/