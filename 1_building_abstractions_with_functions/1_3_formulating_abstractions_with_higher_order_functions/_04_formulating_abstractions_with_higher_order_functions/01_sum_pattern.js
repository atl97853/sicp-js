// Takes two functions as arguments (they are callbacks)
// The function itself has a linear recursive process because 
// it builds up a chain of deferred operations
// page 50
function sum(term, a, next, b) {
    return a > b 
        ? 0
        : term(a) + sum(term, next(a), next, b);
}

function inc(n) { // increments its argument by 1.
    return n + 1;
}

function identity(x) { 
    return x;
}

// ---------------------------------------

function sum_integers(a, b) {
    return sum(identity, a, inc, b);
}

console.log(
    sum_integers(1, 10)
);

// ---------------------------------------

// this function is using block structure to embed the declarations of pi_next and
// pi_term within pi_sum, since these functions are unlikely to be useful for anyu other purporse (page 51)
function pi_sum(a, b) {
    function pi_term(x) {
        return 1 / (x * (x + 2));
    }

    function pi_next(x) {
        return x + 4;
    }

    return sum(pi_term, a, pi_next, b);
}

console.log(
    8 * pi_sum(1, 1000)
);

