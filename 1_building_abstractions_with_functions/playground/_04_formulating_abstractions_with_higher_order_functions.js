/**
 * 1.3 Formulating Abstractions with Higher-Order Functions
 */

// Functions are abstractions that describe compound 
// operations on numbers independent of t he particular numbers. (page 48)

function print(m) {
    console.log(m);
}

function cube(x) {
    return x * x * x;
}

// 1.3.1 Functions as Arguments (page 49)
/**
 * A)
 * Computes the sum of integers from a through b.
 * This functions has a linear recursive process
 * because it builds up a chain of deferred operations.
 */
function sumIntegers(a, b) {
    return a > b
    ? 0
    : a + sumIntegers(a + 1, b);
}

/**
 * B)
 * Computes the sum of the cubes of the integers in 
 * the given range.
 */
function sumCubes(a, b) {
    return a > b
    ? 0
    : cube(a) + sumCubes(a + 1, b); 
    // this is an addition of function applications
    // substitution model comes to my mind

}

/**
 * C)
 * Computes the sum of a sequence of terms in a serie.
 */
function pi_sum(a, b) {
    return a > b
    ? 0
    : 1 / (a * (a + 2)) + pi_sum(a + 4, b);
}

// Often the same programming pattern will be used with a number of different function... let that sink... 
// Shared underlying pattern
/**
 * Expresses the concept of summation.
 */
function underlyingPattern(term, a, next, b) { // takes two callbacks as arguments
    return a > b
    ? 0
    : term(a) + underlyingPattern(term, next(a), next, b); // linear recursive process so... is this function linear? 
}

/**
 * Function that increments its argument by 1
 */
function inc(n) {
    return n + 1;
}

/** 
 * Computes the sum of cubes using a general pattern of summation and
 * and two helper functions.
*/
function sumCubesAfter(a, b) {
    return underlyingPattern(cube, a, inc, b); // returns two functions as values
}

console.log(
    sumCubes(1, 5),
    sumCubesAfter(1, 5)
)

/**
 * Computes the sum of a sequence of terms in a serie, using the a general
 * pattern of summation, and block structure. 
 */
function pi_sum_after(a, b) {
    function pi_term(x) {
        return 1 / (x * (x + 2));
    }

    function pi_next(x) {
        return x + 4;
    }

    return underlyingPattern(pi_term, a, pi_next, b);
}

print(
    pi_sum_after(1, 1000)
);