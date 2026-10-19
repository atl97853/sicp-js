# SICP §1.1.8 — Functions as Black-Box Abstractions

> **Note**
>
> **Applicative order and normal order** describe how the interpreter evaluates compound functions.

```text
Compound-function evaluation
        │
        ├── Applicative order
        │
        └── Normal order
```

In mathematics, we are usually concerned with **declarative** (*what is*) descriptions, whereas in computer science, we are usually concerned with **imperative** (*how to*) descriptions.

---

## 1.1.8 Functions as Black-Box Abstractions

> "The function is recursive"; that is, the function is defined in terms of itself.

A program can be constructed as a **cluster of functions**.

The importance of this decomposition strategy is that **it is crucial that each function accomplishes an identifiable task that can be used as a module in defining other functions**.

### Functional decomposition

```text
A cluster of functions
        ↓
mirrors the decomposition of the problem into subproblems
        ↓
the importance of the decomposition strategy
        ↓
it is crucial that each function accomplishes
an identifiable task
        ↓
that can be used as a module in defining other functions
        ↓
we are not, at that moment, concerned with HOW
the function computes its result
        ↓
only with the fact that it computes [square]
        ↓
some intended behavior
```

`[]` is not a function; it is an abstraction of a function—a so-called **functional abstraction**.

At this level of abstraction:

```text
Functional abstraction
        ↓
any function that computes [square]
        ↓
or some intended behavior
        ↓
is equally good
```

**So a function should be able to suppress detail.**

A function as a **black box** means that a user should not need to know how the function is implemented in order to use it.

```text
Function
   ↓
black-box abstraction
   ↓
implementation details are suppressed
   ↓
the user only needs to know
the intended behavior of the function
```

---

## Local Names

**One detail of a function's implementation that should not matter to the user of the function is the implementer's choice of names for the function's parameters.**

The "consequences are profound":

* The parameter names of a function must be local to the body of the function.

A parameter of a function has a very special role in the function declaration:

* It does not matter what name the parameter has.

Such a name is called **bound**, and we say that:

> **The function declaration—a means (of abstraction) for using names to refer to computational objects—binds its parameters.**

### Bound names, free names, and scope

```text
Function declaration
        ↓
binds its parameters
        ↓
parameter names are BOUND
```

If a name is not bound, we say that **it is free**.

```text
Name used in a function
        ↓
Is it bound by that function declaration?
        │
        ├── Yes → bound name
        │
        └── No  → free name
```

The set of statements for which a binding declares a name is called the **scope** of that name.

In a function declaration, the bound names declared as the parameters of the function have the **body of the function as their scope**.

```text
Function parameter
        ↓
bound name
        ↓
scope
        ↓
body of the function
```

### Pages 23–24

```javascript
// A function declaration binds its parameters.
// A name that appears in the body but is not bound
// by that function declaration is a free name.

let x = 10;

function f1(y) {
    // Correct:
    // y is bound by f1.
    // x is free because f1 does not bind x.
    return x + y;
}

function f2(y) {
    // y is bound by f2.
    // x is still a free name.
    // This assignment does NOT bind x.
    // Assignment is not binding.
    x = 1;
    return x + y;
}
```

The important distinction is:

```text
Declaration / parameter
        ↓
creates a binding

Assignment
        ↓
does NOT create that binding
```

---

## Internal Declarations and Block Structure

One kind of name isolation available to us so far is:

> The parameters of a function are local to the body of the function.

Consider the following program:

```javascript
// SICP JS 1.1.8

function abs(x) {
    return x >= 0 ? x : - x;
}

function square(x) {
    return x * x;
}

function average(x, y) {
    return (x + y) / 2;
}

function sqrt(x) {
    return sqrt_iter(1, x);
}

function sqrt_iter(guess, x) {
    return is_good_enough(guess, x)
           ? guess
           : sqrt_iter(improve(guess, x), x);
}

function is_good_enough(guess, x) {
    return abs(square(guess) - x) < 0.001;
}

function improve(guess, x) {
    return average(guess, x / guess);
}

sqrt(5);
```

The problem with this program is that **the only function that is important to users is `sqrt`**.

The other functions only clutter up their minds.

**The problem is especially severe in the construction of large systems by many separate programmers.**

### Auxiliary functions

```text
Auxiliary functions
        ↓
we would like to localize the subfunctions
        ↓
HIDING them inside sqrt
        ↓
so that sqrt could coexist with other
successive approximations
        ↓
to make this possible
        ↓
we allow a function to have INTERNAL DECLARATIONS
that are local to that function
```

The auxiliary functions can therefore be moved inside `sqrt`:

```javascript
// SICP JS 1.1.8

function abs(x) {
    return x >= 0 ? x : - x;
}

function square(x) {
    return x * x;
}

function average(x, y) {
    return (x + y) / 2;
}

function sqrt(x) {
    function is_good_enough(guess, x) {
        return abs(square(guess) - x) < 0.001;
    }

    function improve(guess, x) {
        return average(guess, x / guess);
    }

    function sqrt_iter(guess, x) {
        return is_good_enough(guess, x)
               ? guess
               : sqrt_iter(improve(guess, x), x);
    }

    return sqrt_iter(1, x);
}

sqrt(5);
```

This introduces **block structure**:

```text
sqrt
 │
 ├── is_good_enough
 ├── improve
 └── sqrt_iter
```

These auxiliary functions are local to `sqrt` rather than being exposed in the outer environment.

To make this possible, we allow a function to have **internal declarations** that are local to that function. Any matching pair of braces designates a *block*, and declarations inside the block are local to the block. Such nesting declarations, called **block structure**, is basically the right solution to the simplest **name-packaging** problem. 

But there is a better idea lurking here. In addition to internalizing the declarations of the auxiliary functions, we can simplify them. Since `x` is **bound in the declarations of the functions**, we can simplify them, the inner functions are in the scope of the outer function, and they are in the scope of `x`. Thus, it is not necessary to pass `x` explicitly to each of these functions. Instead, we allow x to be a **free name** in the internal declarations. Then x gets its value from the argument with which the enclosing function [] is called. ***This discipline is called lexican scoping**.

```javascript
// SICP JS 1.1.8

function abs(x) {
    return x >= 0 ? x : - x;
}

function square(x) {
    return x * x;
}

function average(x, y) {
    return (x + y) / 2;
}

function sqrt(x) {
    function is_good_enough(guess) {
        return abs(square(guess) - x) < 0.001;
    }
    function improve(guess) {
        return average(guess, x / guess);
    }
    function sqrt_iter(guess) {
        return is_good_enough(guess)
               ? guess
               : sqrt_iter(improve(guess));
    }
    return sqrt_iter(1);
}

sqrt(5);
```

---

## Lexical Scoping

> **[3]** Lexical scoping dictates that free names in a function are taken to refer to bindings made by enclosing function declarations; that is, they are looked up in the environment in which the function was declared. We will see how this works in detail in Chapter 3 when we study environments and the detailed behavior of the interpreter.

The relationship can be represented as:

```text
Inner function
        ↓
contains a free name
        ↓
look at the environment in which
the function was declared
        ↓
search enclosing function declarations
        ↓
find the corresponding binding
```

### Example

```javascript
function make_adder(x) {
    // x is a BOUND name in make_adder
    // because x is a parameter of this function.

    function add(y) {
        // y is BOUND in add
        // because y is a parameter of add.

        // x is FREE in add
        // because add does not bind x itself.
        //
        // Because of lexical scoping, this free name x
        // refers to the x bound by the enclosing
        // function make_adder.
        return x + y;
    }

    return add;
}
```

The structure is:

```text
make_adder(x)
│
├── x → BOUND in make_adder
│
└── add(y)
    │
    ├── y → BOUND in add
    │
    └── x → FREE in add
            │
            └── refers to the x bound
                by make_adder
```

Therefore:

```text
x is bound in make_adder
        ↓
x is free in add
        ↓
lexical scoping
        ↓
the free x in add refers to
the enclosing binding of x
```

A name can therefore be **free relative to one function declaration** while referring to a binding created by an enclosing function declaration.

---

## Block Structure as a Program-Organization Tool

We will use **block structure** extensively to help us break up large programs into tractable pieces.

```text
Large program
        ↓
decompose into identifiable tasks
        ↓
functions
        ↓
auxiliary functions
        ↓
internal declarations
        ↓
block structure
        ↓
tractable pieces
```

The idea of **block structure** is an important tool for helping to organize the construction of large programs.

---

## Conceptual Summary

```text
Functional decomposition
        ↓
cluster of functions
        ↓
each function performs an identifiable task
        ↓
functions can be treated as modules
        ↓
black-box abstraction
        ↓
implementation details can be suppressed
```

```text
Function declaration
        ↓
binds parameters
        ↓
bound names
        ↓
scope
```

```text
Name not bound by a function
        ↓
free name
        ↓
lexical scoping
        ↓
look for a binding in enclosing environments
```

```text
Auxiliary functions
        ↓
internal declarations
        ↓
block structure
        ↓
name isolation
        ↓
organization of large programs
```

The main progression of §1.1.8 is therefore:

```text
Decompose a problem
        ↓
create functions for identifiable subproblems
        ↓
treat those functions as black-box abstractions
        ↓
suppress implementation details
        ↓
make parameter names local
        ↓
distinguish bound and free names
        ↓
understand scope
        ↓
hide auxiliary functions with internal declarations
        ↓
use block structure
        ↓
resolve free names using lexical scoping
```
## Summarized example:

```javascript
// A constant declaration associates the name TOLERANCE
// with a value in the program environment.
// Naming is one of the simplest means of abstraction.
const TOLERANCE = 0.001;


// A function declaration creates a compound function
// and associates it with the name square.
//
// x is a bound name: square binds its parameter x.
//
// The expression x * x is an operator combination.
function square(x) {
    return x * x;
}


// hypotenuse is another compound-function abstraction.
//
// a and b are bound names whose scope is the body
// of hypotenuse.
function hypotenuse(a, b) {

    // Internal declarations demonstrate block structure.
    // abs is local to hypotenuse and is hidden from
    // the outer program environment.
    function abs(x) {
        // >= is a primitive predicate.
        //
        // The conditional expression evaluates its predicate
        // first and then evaluates only the appropriate branch.
        return x >= 0
            ? x
            : -x;
    }


    // sqrt is also local to hypotenuse.
    //
    // x is bound by sqrt.
    function sqrt(x) {

        function average(a, b) {
            return (a + b) / 2;
        }


        function is_good_enough(guess) {
            // guess is bound by is_good_enough.
            //
            // x is FREE in is_good_enough because this
            // function does not bind x.
            //
            // Lexical scoping makes x refer to the x
            // bound by the enclosing sqrt function.
            //
            // TOLERANCE is also free here and refers to
            // the binding in the program environment.
            //
            // abs and square are free names here as well.
            return abs(square(guess) - x) < TOLERANCE;
        }


        function improve(guess) {
            // x is again free in this function and refers
            // to sqrt's parameter x.
            return average(guess, x / guess);
        }


        function iter(guess) {
            // This conditional expression provides
            // the end test for the recursive process.
            return is_good_enough(guess)
                ? guess
                : iter(improve(guess));
        }


        // Computing a square root is described as an
        // effective process: start with a guess and
        // repeatedly improve it.
        return iter(1);
    }


    // square is a free name in hypotenuse.
    //
    // We use square as a black-box abstraction:
    // we only need to know what it computes,
    // not how it computes it.
    const sum_of_squares =
        square(a) + square(b);

    // sqrt is also used as a black box here.
    return sqrt(sum_of_squares);
}


// This is a function application.
//
// Function expression:
//     hypotenuse
//
// Argument expressions:
//     1 + 2
//     2 * 2
//
// JavaScript uses applicative-order evaluation,
// so the argument expressions are evaluated first:
//
//     1 + 2  -> 3
//     2 * 2  -> 4
//
// Then hypotenuse is applied to the values 3 and 4.
hypotenuse(1 + 2, 2 * 2);
```