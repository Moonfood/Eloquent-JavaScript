"use strict";

/* 
    TASK 1 - Looping a Triangle
    Write a loop that makes seven calls to console.log to output the following triangle:

    #
    ##
    ###
    ####
    #####
    ######
    #######
*/

for (let tri = '#'; tri.length <= 7; tri += '#') {
    console.log(tri);
}