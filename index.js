function add(arr) {
    return arr.reduce((total, num) => total + num);
}

console.log(add([2,3,4,5]));

function subtract(arr) {
    return arr.reduce((diff, num) => diff - num);
}

console.log(subtract([10,4,2]));

function multiply(arr) {
    return arr.reduce((prod, num) => prod * num);
}

console.log(multiply([10,4,2]));

function divide(arr) {
    return arr.reduce((dvsn, num) => dvsn / num);
}

console.log(divide([10,2]));
