const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

let dishes = 3;
let dishesInQueue = dishes;
let dishesPreparing = 0;
let dishesPrepared = 0;
let dishesDelivering = 0;
let dishesDelivered = 0;
let availableChefs = 3;
let availableWaiters = 1;
let seconds = 0;

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

    rl.on("close", function() {
        console.log("\nBYE!!");
        process.exit(0);
    });

    rl.question("What is the amount of dishes to serve ? ", function(inputDishes) {
        rl.question("How many chefs are available ? ", function(inputChefs) {
            rl.question("How many waiters are available ? ", function(inputWaiters) {

                console.log("");

                dishes = parseInt(inputDishes);
                dishesInQueue = dishes;
                availableChefs = parseInt(inputChefs);
                availableWaiters = parseInt(inputWaiters);

                if( isNaN(dishes) || isNaN(availableChefs) || isNaN(availableWaiters)) {
                    console.error("Invalid parameters.");
                    rl.close();
                }

                console.log(`Chefs: ${availableChefs}`);
                console.log(`Waiters: ${availableWaiters}`);
                console.log(`Dishes: ${dishes} \n`);

                startPreparing().then(r => {
                    rl.close();
                });
            });
        });
    });

}

async function startPreparing() {
    // console.log("Start");

    let currentDishPreparing = 0;
    let currentDishDelivering = 0;
    console.log(`Dish in queue: ${dishesInQueue} - Preparing: ${dishesPreparing} - Prepared: ${dishesPrepared} - Delivering: ${dishesDelivering} - Delivered: ${dishesDelivered} - Available Chefs: ${availableChefs} - Available Waiters: ${availableWaiters}`);
    function checkDishesChefsWaiters() {
        if (dishesDelivered < dishes) {
            while (availableChefs > 0 && dishesInQueue > 0) {
                console.log(`Prepare dish #${++currentDishPreparing}`);
                dishesInQueue--;
                dishesPreparing++;
                availableChefs--;
                const worker = new Worker(__filename, {workerData: 'chef'});
                worker.on('message', (msg) => {
                    // console.log(msg);
                    dishesPreparing--;
                    dishesPrepared++;
                    availableChefs++;
                });
            }
            while (availableWaiters > 0 && dishesPrepared > 0) {
                console.log(`Deliver dish #${++currentDishDelivering}`);
                dishesPrepared--;
                availableWaiters--;
                dishesDelivering++;
                const worker = new Worker(__filename, {workerData: 'waiter'});
                worker.on('message', (msg) => {
                    // console.log(msg);
                    dishesDelivering--;
                    dishesDelivered++;
                    availableWaiters++;
                });
            }
            seconds++;
            console.log(`Time (sec): ${seconds}`);
            console.log(`Dish in queue: ${dishesInQueue} - Preparing: ${dishesPreparing} - Prepared: ${dishesPrepared} - Delivering: ${dishesDelivering} - Delivered: ${dishesDelivered} - Available Chefs: ${availableChefs} - Available Waiters: ${availableWaiters}`);
            setTimeout(checkDishesChefsWaiters, 1000);
        }

        //
        // if(availableChefs === 0 || availableWaiters === 0) {
        //     setTimeout(checkAvailableChefs, 1000);
        // } else {
        //     if(dishesInQueue>0 && availableChefs>0){
        //         prepareDish();
        //     }
        //     if(dishesPrepared>0 && availableWaiters>0){
        //         deliverDish();
        //     }
        // }
        //setTimeout(checkAvailableChefs, 1000);
    }
    checkDishesChefsWaiters();

    // await sleep(2000);
    // console.log("End")
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function prepareDish() {
    const preparingDish = dishes - dishesInQueue + 1;
    console.log(`Preparing dish: #${preparingDish}`);
    dishesInQueue--;
    dishesPreparing++;
    availableChefs--;
    await sleep(1000);
    console.log(`Prepared dish: #${preparingDish}`);
    dishesPreparing--;
    dishesPrepared++;
    availableChefs++;
}

async function deliverDish() {
    const preparingDish = dishes - dishesInQueue + 1;
    console.log(`Delivering dish: #${preparingDish}`);
    dishesPrepared--;
    availableWaiters--;
    dishesDelivering++;
    await sleep(1000);
    console.log(`Delivered dish: #${preparingDish}`);
    dishesDelivering--;
    dishesDelivered++;
    availableWaiters++;
}


if (isMainThread) {
    // This code is executed in the main thread and not in the worker.
    // console.log("isMainThread");

    /*
    // Create the worker.
    const worker = new Worker(__filename);
    // Listen for messages from the worker and print them.
    worker.on('message', (msg) => { console.log(msg); });
    */
    // question6();
    // const worker = new Worker(__filename, {workerData: 'chef'});
    // worker.on('message', (msg) => { console.log(`Message from worker: ${msg}`); });
    startPreparing();

} else {
    // console.log("worker");
    // This code is executed in the worker and not in the main thread.
    // Send a message to the main thread.
    sleep(500).then(r => {
        parentPort.postMessage(workerData);
    });
    //
    // if(workerData === "chef") {
    //     prepareDish();
    // } else if(workerData === "waiter") {
    //     deliverDish();
    // }
}
