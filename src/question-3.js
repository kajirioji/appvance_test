
function question3() {
    const statement = '3. There is an array A[N] of N numbers. You have to compose another array Output[N} such that Output[i] will be equal to multiplication of all the elements of A[N} except A[i].\n';
    console.log(statement);

    const n = 5;

    let arrayResult = [];

    for (let i = 0; i < n; i++){
        let output = [];
        for (let j = 0; j < n; j++){
            if (i !== j) {
                output.push([j]);
            }
        }
        arrayResult.push(output);
    }
    console.log(arrayResult);

}

question3();
