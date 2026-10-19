const print = (m, t) => console.log(m, t);

/** 
 * This function is the linear iterative version of the sum function that is linear recursive
 */
function iter_sum(term, a, next, b) {
    function iter(a, result) {
        return a > b
            ? result
            : iter(
                next(a), result + term(a)
            );
    }

    return iter(a, 0);
}

// ------------------------------

function inc(n) {
    return n + 1;
}

function identity(x) {
    return x;
}

function sum_integers_iter(a, b) {
    return iter_sum(identity, a, inc, b);
}

// Output
console.log(
    sum_integers_iter(1, 10)
);

// -------------------------------------

function pi_sum(a, b) {
    function pi_term(x) {
        return 1 / (x * (x + 2));
    }

    function pi_next(x) {
        return x + 4;
    }

    return iter_sum(pi_term, a, pi_next, b);
}

console.log(
    8 * pi_sum(1, 1000)
);

