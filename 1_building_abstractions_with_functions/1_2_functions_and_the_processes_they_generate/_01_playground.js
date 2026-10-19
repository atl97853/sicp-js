// A linear recursive process for computing 6!
// Carrying out this process requires that the interpreter keep track of the operations
// to be performed later on.
// The amount of information needed to keep track of it, grows linearly with n (is proportional to n), just like the number of steps. 
function factorial(n) {
    return n === 1
    ? 1 // base case
    : n * factorial(n - 1); // chain of deferred operations
}

console.log(
    factorial(6)
);

//A linear iterative process for computing 6!
// This process does not grow and shrink. At each step, all we need to keep track of, for any n, are the current values of the names product, counter, and max_count.
// It is a process whose state can be summarized by a fixed number of state variables, together with a fixed rule that describes how the state variables should be updated page 29
function fact(n) {
    return fact_iter(1, 1, n);
}

function fact_iter(product, counter, max_count) {
    return counter > max_count
    ? product // base case
    : fact_iter( // recursive call
        product * counter, 
        counter + 1, 
        max_count);
}

// block structure and lexical scoping version
function fact(n) { 
  function iter(product, counter) {
      return counter > n
      ? product // base case
      : iter( // recursive call
          product * counter, 
          counter + 1);
  }
  return iter(1, 1);
}

console.log(fact(6));

// Three recursion, it has a chain of deferred operations
// in general the envolved process looks like a tree
// the fib function calls itself twice each time it is invoked
function fib(n) {
    return n === 0
    ? 0
    : n === 1
    ? 1
    : fib(n - 1) + fib(n - 2); // you can understand this using the substitution model, it first evaluates the subexpressions of the application, then apply the function that is denoted by the operator to the arguments
}

console.log(fib(10));

// Fibonacci numbers iteratively -> linear iteration
// To formulate the iterative algorithm, required noticing that the computation could be recast as an iteration with three state variables
function fib(n) {
    return fib_iter(1, 0, n);
}
function fib_iter(a, b, count) {
    return count === 0
           ? b
           : fib_iter(a + b, a, count - 1);
}

fib(6);

