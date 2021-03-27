
function question2() {
    const statement = '2. Given a function which produces a random integer in the range of 1 to 5, write another function that, using the given funtionn that gives 1 to 5 random number, produces a random integer in the range of 1 to 7.\n';
    console.log(statement);

    const random = function () {
            const random1to5 = function () {
                return Math.floor(Math.random() * 5 + 1)
            };
            const random1to7 = function (random1to5) {
                let res = Math.floor(Math.random() * 7 + 1) + random1to5;
                if (res > 7) {
                    res -= 7;
                }
                return res;
            };
            return random1to7(random1to5());
        }
    ;
    console.log(random());
}

question2();
