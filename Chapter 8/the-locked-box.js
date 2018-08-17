"use strict";

/* 
    Chapter 8, Task 2 - The Locked Box

    Consider the following (rather contrived) box object below.

    It is a box with a lock. There is an array in the box, but you can get at it only when the box is unlocked. 
    Directly accessing the private _content property is forbidden.

    Write a function called withBoxUnlocked that takes a function value as argument, 
    unlocks the box, runs the function, and then ensures that the box is locked again before returning, 
    regardless of whether the argument function returned normally or threw an exception.

    For extra points, make sure that if you call withBoxUnlocked when the box is already unlocked, the box stays unlocked.
*/

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};
  

function withBoxUnlocked(body) {
  if (!box.locked) { //This way the box stays unlocked if it's already unlocked
    return body();
  }
  
  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
}

console.log(box.locked);
//Error Raised: "Pirates on the horizon! Abort!"
//-> true
  