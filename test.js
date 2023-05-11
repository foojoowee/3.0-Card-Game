const suits = [
    "S",
    "C",
    "H",
    "D"
]

const cards = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
]


const cardsValue = [
    {"A":11},
    {"2":2},
    {"3":3},
    {"4":4},
    {"5":5},
    {"6":6},
    {"7":7},
    {"8":8},
    {"9":9},
    {"10":10},
    {"J":10},
    {"Q":10},
    {"K":10},
]

for(obj of cardsValue){
    console.log(Object.keys(obj)[0]);
}

// for(let obj of cardsValue){
//     const key = Object.keys(obj)[0];
//     const value = Object.values(obj)[0];
//     console.log("The key is " + key);
//     console.log("The value is " + value);
// }

// let decklist = []

// for(let suit of suits){
//     for(let number of cards){
//         decklist.push(number + "-" + suit );
//     } 
// }

// // console.log(decklist)

// console.log(cardsValue.pop());
// console.log(cardsValue[0]);
// cardsValue[0] = { A: 10}
// console.log(cardsValue[0]);

// const keyToFind = "A";
// console.log(cardsValue.A);
// for (let i = 0; i < cardsValue.length; i ++){
//     console.log(cardsValue(1));
// }

let gameEnd = false
console.log(gameEnd);
gameEnd = true;
console.log(gameEnd);