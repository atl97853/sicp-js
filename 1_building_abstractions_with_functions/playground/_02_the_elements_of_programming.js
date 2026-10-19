// conditional expressions and predicates
// page 13 - 14
const myName = "Atl"

function myPredicate(variable) {
    return variable === "Atl"
        ? "hello sudo!!!"
        : "where's sudo!!!?";
}

console.log(
    myPredicate(myName)
);

console.log(
    myPredicate("Kenji")
);

// page 15
function caseAnalysis(val) {
    return val > 0
    ? "true"
    : val < 0
    ? "true"
    : "false"
}

console.log (
    caseAnalysis(10)
)


// page 16
function greaterOrEqual(x, y) {
    return x > y || x === y
        ? "true"
        : "false";
}
/**
 * The only way for an "or" expression to be false
 * is that both expressions are false
 * 
 */
console.log(
    greaterOrEqual(10, 100)
);

/**
 * The compound predicate evaluates true
 * because we have expressions that mirror 
 * P or not P and that is a tautology
 */
function tautology(x, y) {
    return x === y || x !== y
}

console.log(
    tautology(0,10111111111)
)

// functional abstration
const someName = 10;
function someFunction(a, b) {
    function someNestedFunction () {
        console.log(
            a + " " + b + " " + someName
        );
    }
    return someNestedFunction()
}

someFunction("hello", "!!!");

// functional abstraction, internal declarations and block structure
function doubleAddition(a, b) {
    function normalAddition() {
        return a + b;
    }
    return normalAddition() + normalAddition();
}

console.log(
    doubleAddition(10, 5)
)