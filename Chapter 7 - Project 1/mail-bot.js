"use strict";

/*
    Chapter 7 - Project 1: A Robot

    Our project in this chapter is to build an automaton, a little program that performs a task in a virtual world. 
    Our automaton will be a mail-delivery robot picking up and dropping off parcels.
*/

/*This code was provided for the tasks that proceed below*/
var roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];
  
  function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
      if (graph[from] == null) {
        graph[from] = [to];
      } else {
        graph[from].push(to);
      }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
    }
    return graph;
  }
  
  var roadGraph = buildGraph(roads);
  
  var VillageState = class VillageState {
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }
  
    move(destination) {
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } else {
        let parcels = this.parcels.map(p => {
          if (p.place != this.place) return p;
          return {place: destination, address: p.address};
        }).filter(p => p.place != p.address);
        return new VillageState(destination, parcels);
      }
    }
  }
  
  function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Moved to ${action.direction}`);
    }
  }
  
  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
  }
  
  function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
  }
  
  VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  };
  
  var mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];
  
  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }
  
  function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
      let {at, route} = work[i];
      for (let place of graph[at]) {
        if (place == to) return route.concat(place);
        if (!work.some(w => w.at == place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
  }
  
  function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return {direction: route[0], memory: route.slice(1)};
  }
/*End of given code*/

/*
    Chapter 7, Task 1 - Measuring a robot
    
    Write a function compareRobots that takes two robots (and their starting memory). 
    It should generate 100 tasks and let each of the robots solve each of these tasks. When done, 
    it should output the average number of steps each robot took per task.

    For the sake of fairness, make sure you give each task to both robots, rather than generating different tasks per robot.
*/

//Slightly altered "runRobot" function, returns the length of a route array, 
//to retrieve how many turns it will take to get there
function turnsToComplete(state, robot, memory) { 
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        return turn;
      }    
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory
    }
  }
  
  //Compares two robots and returns the average number of turns it took to complete a given map
  function compareRobots(robot1, memory1, robot2, memory2) {
    let robot1Turns = 0, robot2Turns = 0, numOfTests = 100;
    for (let i=0; i < numOfTests; i++) {
      let village = VillageState.random(); //Give both robots the same map for a fair test
      robot1Turns += turnsToComplete(village, robot1, memory1); //Total turns
      robot2Turns += turnsToComplete(village, robot2, memory2);
    }
    console.log(`Robot1 average: ${robot1Turns / numOfTests}`); //Return average
    console.log(`Robot2 average: ${robot2Turns / numOfTests}\n`);
  }

compareRobots(routeRobot, [], goalOrientedRobot, []);

/*
    Chapter 7, Task 2 - Robot Efficiency

    Can you write a robot that finishes the delivery task faster than goalOrientedRobot? 
    If you observe that robot’s behavior, what obviously stupid things does it do? How could those be improved?

    If you solved the previous exercise, you might want to use your compareRobots function to verify whether you improved the robot.
*/

//Initial solution:
//This is the goalOrientedBot, however it focusses on the nearest parcel 
function efficientBot({place, parcels}, route) {
    let nearestParcel = parcels[0];
    if (route.length == 0) {
        nearestParcel = parcels.reduce((a,b) => //Find the shortest route to a parcel
        findRoute(roadGraph, place, a.place).length <
        findRoute(roadGraph, place, b.place).length ? a : b
      );

      if (nearestParcel.place != place) { //The parcel has not been picked up
        route = findRoute(roadGraph, place, nearestParcel.place);
      } else {
        route = findRoute(roadGraph, place, nearestParcel.address); //The parcel has not been delivered
      }
    }
    return {direction: route[0], memory: route.slice(1)};
  }
  
compareRobots(goalOrientedRobot, [], efficientBot, []);

//Revised Solution:
//This is strongly inspired by the given solutions, as I found it difficult to find a better one that I could implement.
//I had a similar solution but it was too complex and too difficult for me to implement.  
//I should have read the given code more thoroughly, I think the reason I struggled so much was a lack of understanding.
//I will heavily comment this solution to prove my understanding.
function efficientBotV2({place, parcels}, route) {
  if (route.length == 0) { //Find a new route after we have completed our current one.
    let routes = parcels.map(parcel => { //Find a route for all parcels, creating a new array of objects {route, pickUp}
      if (parcel.place != place) {
        return {route: findRoute(roadGraph, place, parcel.place), pickUp: true}; //Parcel needs to be picked up
      } else { 
        return {route: findRoute(roadGraph, place, parcel.address), pickUp: false}; //Parcel has been delivered
      }
    });
    
    //Computes a score to prioritise parcels that need to be picked up.
    //0.5 is added to the score when pickUp is true
    function routeScore({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    
    route = routes.reduce((a, b) => routeScore(a) > routeScore(b) ? a : b).route; //Choose the route with the highest score
  }
  return {direction: route[0], memory: route.slice(1)};
}

compareRobots(goalOrientedRobot, [], efficientBotV2, []);
//Robot1 average: 15.28
//Robot2 average: 11.87

/*
    Chapter 7, Task 3 - Persistent Group

    Write a new class PGroup, similar to the Group class from Chapter 6, which stores a set of values. 
    Like Group, it has add, delete, and has methods.

    Its add method should return a new PGroup instance with the given member added and leave the old one unchanged. 
    Similarly, delete creates a new instance without a given member.

    The class should work for values of any type, not just strings. 
    It does not have to be efficient when used with large amounts of values.

    The constructor shouldn’t be part of the class’s interface.
    Instead, there is an empty instance, PGroup.empty, that can be used as a starting value.

    Why do you need only one PGroup.empty value, rather than having a function that creates a new, empty map every time?
*/

class PGroup {
    constructor(items) {
        this.items = items;
    }
    
    add(item) {
        if (this.has(item)) { //Already in array? Do nothing
            return this;
        }
        return new PGroup(this.items.concat(item));
    }

    delete(item){
        if (!this.has(item)) { //Already in array? Do nothing
            return this;
        }
        return new PGroup(this.items.filter((a) => a !== item));
    }

    has(item) {
        return this.items.includes(item);
    }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
//-> true
console.log(a.has("b"));
//-> false
console.log(b.has("a"));
//-> false