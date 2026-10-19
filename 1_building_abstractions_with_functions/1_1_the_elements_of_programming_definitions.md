# SICP JavaScript §§1.1.1–1.1.8 — Concept Review

This document summarizes the core concepts introduced in **SICP JavaScript §§1.1.1–1.1.8**, from the three fundamental mechanisms of a programming language through lexical scoping.

---

## 1. Primitive Expressions

The simplest entities a programming language is concerned with.

```js
5
10
true
```

---

## 2. Means of Combination

Mechanisms for building compound elements from simpler ones.

```js
3 + 4 * 5
```

---

## 3. Means of Abstraction

Mechanisms for naming compound elements so they can be treated as units.

```js
const x = 10;

function square(x) {
    return x * x;
}
```

---

## 4. Data

The objects that computations manipulate.

---

## 5. Functions

Descriptions of rules for manipulating data. [page 3]

- A function is a pattern for the local evolution of a computational process. [page 26]

---

## 6. Expression

A piece of program syntax that evaluates to a value.
  
- You type a statement, and the interpreter responds by displaying the result of its *evaluating* that statement. [page 3]

---

## 7. Primitive Expression

An expression whose value does not require evaluating smaller expressions.

---

## 8. Compound Expression / Combination

An expression built from other expressions.

---

## 9. Operator Combination

A combination formed using an operator and operand expressions.

```js
3 + 5
```

---

## 10. Operand Expressions

The expressions to which an operator is applied.

```js
3 + 5
```

Here, `3` and `5` are operand expressions.

---

## 11. Operator

A symbol that denotes a primitive function.

```js
+  -  *  /
```

---

## 12. Arguments

The values obtained by evaluating operand or argument expressions and supplied to a function.

---

## 13. Evaluation of Operator Combinations

To evaluate an operator combination:

1. Evaluate the operand expressions.
2. Apply the function denoted by the operator to the resulting argument values.

---

## 14. Recursive Evaluation

Evaluating an expression may require evaluating its subexpressions using the same evaluation rules.

---

## 15. Read-Evaluate-Print Loop (REPL)

The interpreter:

```text
reads a statement
      ↓
evaluates it
      ↓
prints the result
```

---

## 16. Name

A symbol used to refer to a computational object.

---

## 17. Constant Declaration

Associates a name with a value.

```js
const size = 2;
```

---

## 18. Name-Object Association

The relationship maintained between a name and the computational object it refers to.

```text
size → 2
```

---

## 19. Environment

The interpreter's memory that keeps track of name-object associations.

---

## 20. Value of a Name

The object associated with that name in the current environment.

---

## 21. Function Declaration

A means of abstraction that creates a compound function and associates it with a name.

```js
function square(x) {
    return x * x;
}
```

---

## 22. Compound Function

A function constructed by the programmer from simpler expressions and functions.

---

## 23. Function Parameter

A local name used inside a function body to refer to a corresponding argument.

```js
function square(x) {
    return x * x;
}
```

`x` is a parameter.

---

## 24. Function Body

The statements that describe what the function does.

---

## 25. Return Statement

Determines the value of a function application.

```js
return x * x;
```

---

## 26. Return Expression

The expression following `return` whose value becomes the value of the function application.

---

## 27. Function Application

Applying a function to arguments.

```js
square(5);
```

---

## 28. Function Expression

The part of a function application that specifies which function is being applied.

```js
square(5)
```

` square ` is the function expression.

---

## 29. Argument Expression

An expression whose evaluated value is passed to the function.

```js
square(2 + 3)
```

`2 + 3` is the argument expression.

---

## 30. Evaluation of a Function Application

To evaluate:

```text
function_expression(argument_expressions)
```

the interpreter:

1. Evaluates the function expression.
2. Evaluates the argument expressions.
3. Applies the resulting function to the resulting argument values.

---

## 31. Substitution Model

A simplified model for understanding compound-function application:

> Evaluate the return expression of the function with each parameter replaced by the corresponding argument.

Example:

```js
square(5)
```

becomes conceptually:

```text
x * x
  ↓
5 * 5
  ↓
 25
```

---

## 32. Purpose of the Substitution Model

It is a mental model for understanding function application, not a literal description of how real interpreters implement function calls.

---

## 33. Applicative-Order Evaluation

The evaluation strategy JavaScript uses:

```text
evaluate arguments
      ↓
apply the function
```

---

## 34. Normal-Order Evaluation

An alternative strategy:

```text
substitute argument expressions
      ↓
fully expand
      ↓
reduce
```

---

## 35. Applicative Order vs. Normal Order

Applicative order evaluates arguments before application.

Normal order delays argument evaluation until the values are needed.

---

## 36. Predicate

An expression, operator, or function whose value is `true` or `false`.

```js
x >= 0
```

---

## 37. Boolean Values

The distinguished values:

```js
true
false
```

---

## 38. Conditional Expression

A mechanism for case analysis: [page 13 - 14]

```js
predicate 
/**
 * (In logic and discrete mathematics, a predicate is a statement or mathematical expression
 * containing one or more variables that becomes a true or false proposition only when
 * specific values are plugged into those variables.)
 *
 * (...a predicate—that is, an expression whose value is either true or false) [page 14]
 */
    ? consequent_expression
    : alternative_expression

/**
 * To evaluate a conditional expression, the interpreter starts by evaluating the
 * predicate of the expression. If the predicate evaluates to true, the interpreter evaluates
 * the consequent-expression and returns its value as the value of the conditional. If
 * the predicate evaluates to false, it evaluates the alternative-expression and returns
 * its value as the value of the conditional. [page 14]
 */
```

```js
// The general form of a case analysis is [page 15]
p1
? e1
: p2
? e2
.
.
.
: pn
? en
: final-alternative-expression
```

**Primitive predicates**, such as >=, >, <, <=, ===, and !==, test values directly. Logical conjunction (and), disjunction (or), and negation (not) let us construct **compound predicates** such as `x > y || x === y` or `! (x < y)`; unary operators have higher precedence than binary operators, whick makes the parentheses necessary.

- Tautology: always true (P or not P).
- Contradiction: always false (P and not P

---

## 39. Predicate Expression

The condition tested by a conditional expression.

---

## 40. Consequent Expression

The expression evaluated when the predicate is `true`.

---

## 41. Alternative Expression

The expression evaluated when the predicate is `false`.

---

## 42. Evaluation of a Conditional Expression

```text
evaluate predicate
      ↓
   true?
  /     \
yes      no
 ↓        ↓
consequent alternative
```

Only one branch is evaluated.

---

## 43. Case Analysis

Choosing among different computational paths based on predicates.

---

## 44. Primitive Predicates

Primitive operations that return boolean values.

```js
>
<
>=
<=
===
!==
```

---

## 45. Logical Composition Operations

Operations used to combine predicates.

```js
&&
||
!
```

---

## 46. Effective Function

A computer function must describe an actual process for obtaining a result, not merely characterize what the result is.

---

## 47. Declarative Knowledge

Describes **what is**.

Example:

```text
√x is the y such that y² = x
```

---

## 48. Imperative Knowledge

Describes **how to compute** something.

Example:

```text
start with a guess
      ↓
improve the guess
      ↓
repeat until good enough
```

---

## 49. Recursive Function

A function whose declaration refers directly or indirectly to itself.

---

## 50. Functional Decomposition

Breaking a problem into smaller identifiable subproblems, each handled by a separate function.

---

## 51. Cluster of Functions

A set of cooperating functions whose structure mirrors the decomposition of a problem into subproblems.

---

## 52. Module

A function that performs an identifiable task and can be used as a building block in defining other functions.

---

## 53. Black-Box Abstraction

Treating a function according to what it computes rather than how it computes it.

```text
function
   ↓
intended behavior
   ↓
implementation details hidden
```

---

## 54. Functional Abstraction

Viewing a function in terms of its behavior rather than its particular implementation.

---

## 55. Suppression of Detail

A function should hide implementation details from its users.

---

## 56. Local Name

A name whose meaning is restricted to a particular region of the program.

---

## 57. Bound Name

A name introduced by a binding construct.

```js
function square(x) {
    return x * x;
}
```

`x` is bound.

---

## 58. Binding

The association introduced between a name and the role or value it represents within some scope.

---

## 59. Function Declarations Bind Their Parameters

In:

```js
function f(x, y) {
    // ...
}
```

`x` and `y` are bound by the function declaration.

---

## 60. Free Name

A name used in a function body that is not bound by that function declaration.

```js
const x = 10;

function f(y) {
    return x + y;
}
```

Relative to `f`:

```text
y → bound
x → free
```

---

## 61. Assignment Is Not Binding

Writing:

```js
x = 1;
```

changes the value associated with an existing binding; it does not itself introduce a new binding.

---

## 62. Scope

The set of statements for which a binding of a name is in effect.

---

## 63. Parameter Scope

In a function declaration, the scope of its parameters is the body of the function.

---

## 64. Internal Declaration

A declaration placed inside another function.

```js
function outer(x) {
    function inner(y) {
        // ...
    }
}
```

---

## 65. Auxiliary Function

A helper function used as part of the implementation of another function.

---

## 66. Block

A region delimited by matching braces:

```js
{
    // ...
}
```

---

## 67. Block Structure

The organization of programs using nested blocks and declarations so that auxiliary names can remain local.

```text
main function
   │
   ├── helper 1
   ├── helper 2
   └── helper 3
```

---

## 68. Name Isolation

Keeping implementation-specific names local so they do not interfere with names elsewhere in a program.

---

## 69. Enclosing Function Declaration

An outer function declaration whose body contains another function declaration.

---

## 70. Lexical Scoping

The rule that free names in a function refer to bindings found in the environment in which that function was declared, including bindings made by enclosing function declarations.

```js
function make_adder(x) {
    function add(y) {
        return x + y;
    }

    return add;
}
```

Relative to `add`:

```text
y → bound by add
x → free in add
     ↓
     found in enclosing make_adder
     ↓
     x is bound there
```

---

## 71. A Free Name Does Not Necessarily Mean a Global Name

A name can be free in an inner function while referring to a binding in an enclosing function.

---

# Entire Progression

```text
primitive expressions
        ↓
means of combination
        ↓
compound expressions
        ↓
means of abstraction
        ↓
names
        ↓
environment
        ↓
compound functions
        ↓
function applications
        ↓
applicative-order evaluation
        ↓
substitution model
        ↓
predicates and conditionals
        ↓
effective computational processes
        ↓
functional decomposition
        ↓
black-box abstraction
        ↓
local names
        ↓
bound and free names
        ↓
scope
        ↓
internal declarations
        ↓
block structure
        ↓
lexical scoping
```