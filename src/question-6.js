const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

let dishes = 3;
let dishesInQueue = dishes;
let dishesPreparing = 0;
let dishesPrepared = 0;
let dishesDelivering = 0;
let dishesDelivered = 0;
let availableChefs = 3;
let availableWaiters = 1;

function question6() {
    const statement = '6. There are N chefs and M waiters, they should prepare and deliver exactly K dishes. ' +
        'Given that chefs prepare the dishes with a method dish=prepareDish() and the waiters deliver the dish with deliverDish(dish), create an algorithm which simulate the behaviour.' +
        'Both waiter and chef takes 1 second to complete.\n';
    console.log(statement);

    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("What is the amount of dishes to serve ? ", function(inputDishes) {
        rl.question("How many chefs are available ? ", function(inputChefs) {
            rl.question("How many waiters are available ? ", function(inputWaiters) {

                console.log("");

                dishes = parseInt(inputDishes);
                availableChefs = parseInt(inputChefs);
                availableWaiters = parseInt(inputWaiters);

                if( isNaN(dishes) || isNaN(availableChefs) || isNaN(availableWaiters)) {
                    console.error("Invalid parameters.");
                } else if ( availableChefs === 0 ) {
                    console.error("No chefs available.");
                } else if ( availableWaiters === 0 ) {
                    console.error("No waiters available.");
                } else if ( dishes === 0 ) {
                    console.error("No dishes to serve.");
                }

                rl.close();

                dishesInQueue = dishes;
                console.log(`Dishes: ${dishes}`);
                console.log(`Chefs: ${availableChefs}`);
                console.log(`Waiters: ${availableWaiters} \n`);

                startPreparing();
            });
        });
    });
}

function startPreparing() {

    let currentDishPreparing = 0;
    let currentDishDelivering = 0;
    let seconds = 0;

    console.log(`Dish in queue: ${dishesInQueue} - Preparing: ${dishesPreparing} - Prepared: ${dishesPrepared} - Delivering: ${dishesDelivering} - Delivered: ${dishesDelivered} - Available Chefs: ${availableChefs} - Available Waiters: ${availableWaiters}`);
    function checkDishesChefsWaiters() {
        if (dishesDelivered < dishes) {

            seconds++;
            console.log(`Time (sec): ${seconds}`);

            while (availableChefs > 0 && dishesInQueue > 0) {
                console.log(`   Prepare dish #${++currentDishPreparing}`);
                dishesInQueue--;
                dishesPreparing++;
                availableChefs--;
                const worker = new Worker(__filename, {workerData: 'chef'});
                worker.on('message', () => {
                    dishesPreparing--;
                    dishesPrepared++;
                    availableChefs++;
                });
            }
            while (availableWaiters > 0 && dishesPrepared > 0) {
                console.log(`   Deliver dish #${++currentDishDelivering}`);
                dishesPrepared--;
                availableWaiters--;
                dishesDelivering++;
                const worker = new Worker(__filename, {workerData: 'waiter'});
                worker.on('message', () => {
                    dishesDelivering--;
                    dishesDelivered++;
                    availableWaiters++;
                });
            }
            console.log(`Dish in queue: ${dishesInQueue} - Preparing: ${dishesPreparing} - Prepared: ${dishesPrepared} - Delivering: ${dishesDelivering} - Delivered: ${dishesDelivered} - Available Chefs: ${availableChefs} - Available Waiters: ${availableWaiters}`);
            setTimeout(checkDishesChefsWaiters, 1000);
        }
    }
    checkDishesChefsWaiters();
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function prepareDish() {
    const preparingDish = dishes - dishesInQueue + 1;
    console.log(`   Preparing dish: #${preparingDish}`);
    dishesInQueue--;
    dishesPreparing++;
    availableChefs--;
    await sleep(1000);
    console.log(`   Prepared dish: #${preparingDish}`);
    dishesPreparing--;
    dishesPrepared++;
    availableChefs++;
}

async function deliverDish() {
    const preparingDish = dishes - dishesInQueue + 1;
    console.log(`   Delivering dish: #${preparingDish}`);
    dishesPrepared--;
    availableWaiters--;
    dishesDelivering++;
    await sleep(1000);
    console.log(`   Delivered dish: #${preparingDish}`);
    dishesDelivering--;
    dishesDelivered++;
    availableWaiters++;
}


if (isMainThread) {
    question6();
    //startPreparing();

} else {
    sleep(500).then(r => {
        parentPort.postMessage(workerData);
    });
}
