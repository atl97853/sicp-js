/**
 * Functions and the Processes They Generate
 */


// Linear recursive process
function recursiveFactorial(n) {
    return n === 1
        ? 1
        : n * recursiveFactorial(n - 1);
}

console.log(
    recursiveFactorial(5)
)

// Linear iterative process
function iterativeFactorial(n) {
    return iterativeHelper(1, 1, n);
}

function iterativeHelper(product, counter, max_count) {
    return counter > max_count
    ? product
    : iterativeHelper(
        product * counter,
        counter + 1,
        max_count
    );
}

console.log(
    iterativeFactorial(5)
)

// 1.2.2 Tree recursion 
// Tree recursive process (Fibonacci)
function treeFib(n) {
    return n === 0 // primitive predicate
    ? 0 // consequent_expression
    : n === 1 // primitive predicate
    ? 1
    : treeFib(n - 1) + treeFib(n - 2);
}

console.log(
    treeFib(20)
);

// Exercise 1.11 - page(36)
// Tree recursive process
function recursiveEx1_11(n) {
    return n < 3 
    ? n
    : recursiveEx1_11(n - 1) 
        + (2 * recursiveEx1_11(n - 2)) 
        + (3 * recursiveEx1_11(n - 3));
}

console.log(
    recursiveEx1_11(5)
);

// Iterative process
function iterativeEx1_11(n) {
        return n < 3
        ? n
        : helperIteraTree(2, 1, 0, n - 2);
}

function helperIteraTree(a, b, c, count) {
    return count === 0
        ? a
        : helperIteraTree(a + 2 * b + 3 * c, a, b, count - 1);
}

console.log(
    iterativeEx1_11(5)
);