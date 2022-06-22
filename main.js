// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

/*
console.log('Write how many ml of water the coffee machine has');
let waterExists = input();
console.log('Write how many ml of milk the coffee machine has:');
let milkExists = input();
console.log('Write how many grams of coffee beans the coffee machine has:');
let beansExists = input();

console.log('Write how many cups of coffee you will need:');
let cups = input();
*/

let waterExists, milkExists, beansExists, coupsExists, moneyExists, cupsMinExists;

function coffeeMachineInitial (water, milk, beans, coups, money) {
    waterExists = water;
    milkExists = milk;
    beansExists = beans;
    coupsExists = coups;
    moneyExists = money;
}

function coffeeMachineStatus() {
    console.log('');
    console.log(`The coffee machine has:`);
    console.log(`${waterExists} ml of water`);
    console.log(`${milkExists} ml of milk`);
    console.log(`${beansExists} g of coffee beans`);
    console.log(`${coupsExists} disposable cups`);
    console.log(`$${moneyExists} of money`);
}

function coupsCapacity(water, milk, beans) {
    let cupsExists = [Math.floor(waterExists / water ), Math.floor(milkExists / milk ) , Math.floor(beansExists / beans )];
    let cupsMinExists = -1;

    for (let i = 0; i < cupsExists.length; i++ ) {
        if (cupsMinExists == -1 || cupsMinExists > cupsExists[i] ) {
            cupsMinExists = cupsExists[i];
        }
    }
    return cupsMinExists;
}

function coffeeMachineQuestionMenu() {
    console.log();
    console.log(`Write action (buy, fill, take, remaining, exit):`);
    return input();
}

function coffeeMachineQuestionBuy() {
    console.log();
    console.log(`What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:`);
    return input();
}

function coffeeMachineBuyValidate(water, milk, beans, coups) {

    let coupsAbility = coupsCapacity(coups * water, coups * milk, coups * beans);

    if (coupsAbility >= 1 ) {
        if (coupsExists >= coups) {
            console.log(`I have enough resources, making you a coffee!`);
            return true
        } else {
            console.log(`Sorry, not enough coups!`);
            return false;
        }
   } else {
        if (waterExists < water * coups ) {
            console.log(`Sorry, not enough water!`);
        } else if (milkExists < milk * coups ) {
            console.log(`Sorry, not enough milk!`);
        } else if (beansExists < beans * coups) {
            console.log(`Sorry, not enough beans!`);
        }
        return false;
    }

    return true;
}

function coffeeMachineBuy(option) {
    let water, milk, beans, coups, money;

    if (option == 'back') {
        return
    }

    switch (option) {
        case "1":
            water = 250;
            milk = 0;
            beans = 16;
            money = 4;
            break;
        case "2":
            water = 350;
            milk = 75;
            beans = 20;
            money = 7;
            break;
        case "3":
            water = 200;
            milk = 100;
            beans = 12;
            money = 6;
            break;
    }

    coups = +input('How many coups you need: ');

    if (coffeeMachineBuyValidate(water, milk, beans, coups)) {
        waterExists -= water * coups;
        milkExists -= milk * coups;
        beansExists -= beans * coups;
        coupsExists -= coups;
        moneyExists += money * coups;
    }
}

function coffeeMachineFill() {
    let water, milk, beans, coups;

    console.log();
    console.log(`Write how many ml of water you want to add:`);
    water = input();
    console.log(`Write how many ml of milk you want to add:`);
    milk = input();
    console.log(`Write how many grams of coffee beans you want to add:`);
    beans = input();
    console.log(`Write how many disposable coffee cups you want to add:`);
    coups = input();

    waterExists += +water;
    milkExists += +milk;
    beansExists += +beans;
    coupsExists += +coups;
}

function coffeeMachineTake() {
    console.log(`I gave you $${moneyExists}`);
    console.log();

    moneyExists -= moneyExists;
}

function coffeeMachineMenuOption(option) {
    if (option == "exit") {
        return false;
    }
    switch (option) {
        case "buy":
            coffeeMachineBuy(coffeeMachineQuestionBuy());
            break;
        case "fill":
            coffeeMachineFill();
            break;
        case "take":
            coffeeMachineTake();
            break;
        case "remaining":
            coffeeMachineStatus();
            break;
    }
    return true;
}

coffeeMachineInitial (400, 540, 120, 9, 550);
while (coffeeMachineMenuOption(coffeeMachineQuestionMenu()));

// console.log(cupsExists);
// console.log(cupsMinExists);
/*
if (cupsMinExists == cups) {
    console.log(`Yes, I can make that amount of coffee`);
} else if (cupsMinExists > cups) {
    console.log(`Yes, I can make that amount of coffee (and even ${cupsMinExists - cups} more than that)`);
} else {
    console.log(`No, I can make only ${cupsMinExists} cups of coffee`);
}
*/

/*
if (waterExists >= cups * 200 )
console.log(`For ${cups} cups of coffee you need:`);
let water = cups * 200;
console.log(`${water} ml of water`);
let milk = cups * 50;
console.log(`${milk} ml of milk`);
let beans = cups * 15;
console.log(`${beans} g of coffee beans`);
*/

// console.log('Grinding coffee beans');
// console.log('Boiling water');
// console.log('Mixing boiled water with crushed coffee beans');
// console.log('Pouring coffee into the cup');
// console.log('Pouring some milk into the cup');
// console.log('Coffee is ready!');