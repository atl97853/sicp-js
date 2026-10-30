# 1 Building Abstractions with Functions

## 1.1 The Elements of Programming — Quick Glossary

**Core idea:** combine simpler parts, then hide their details behind names.

Page links use the book’s **printed numbers** and open the corresponding [SICP JS PDF](https://sicp.sourceacademy.org/sicpjs.pdf) pages.

### Three Building Blocks

| Concept | Meaning | Example |
| --- | --- | --- |
| **Primitive expressions** | Represent the simplest entities the language deals with. | `5`, `334` |
| **Means of combination** | Build compound elements from simpler ones. | `5 + 334` |
| **Means of abstraction** | Let us name compound elements and use them as units. | `const total = 5 + 334;` |

Source: [p. 3](https://sicp.sourceacademy.org/sicpjs.pdf#page=35).

### 1.1.1 Expressions

- **Expression:** code evaluated to obtain a value: `5 + 3` → `8`. [pp. 3–4](https://sicp.sourceacademy.org/sicpjs.pdf#page=35)
- **Expression statement:** an expression followed by a semicolon: `5 + 3;`. [p. 3](https://sicp.sourceacademy.org/sicpjs.pdf#page=35)
- **Combination / compound expression:** an expression containing other expressions, such as `5 + 3` or `square(5)`. [p. 4](https://sicp.sourceacademy.org/sicpjs.pdf#page=36), [p. 9](https://sicp.sourceacademy.org/sicpjs.pdf#page=41)
- **Operator combination:** an **operator** between **operand expressions**: `5 + 3`. Here `+` is the operator; `5` and `3` are operands. This placement is **infix notation**. [p. 4](https://sicp.sourceacademy.org/sicpjs.pdf#page=36)
- **REPL:** the interactive *read–evaluate–print loop*: read a statement → evaluate → display the result. [p. 5](https://sicp.sourceacademy.org/sicpjs.pdf#page=37)

---
📚 Summary:
- **Numbers and arithmetic operations are primitive data and functions.** (p. 8)
- **Nesting of combinations provides a means of combining operations.** (p. 8)
- **Constant declarations that associate names** [`12m3m`] **with values provide a limited means of abstraction.** (p. 8)
---

### 1.1.2 Naming and the Environment

- **Constant declaration:** associates a name with a value; the book’s first means of abstraction. [pp. 5–6](https://sicp.sourceacademy.org/sicpjs.pdf#page=37)
- **Environment:** tracks **name–object associations**, giving names their meanings during evaluation. [p. 6](https://sicp.sourceacademy.org/sicpjs.pdf#page=38)

```js
const size = 5;          // Associates size with 5.
const total = size + 3;  // Associates total with 8.
```

Both declarations associate names with the values of their right-hand expressions.

### 1.1.3 Evaluating Operator Combinations

**Evaluate the operands → apply the operator’s function to their values.** [p. 6](https://sicp.sourceacademy.org/sicpjs.pdf#page=38)

The rule is **recursive**: an operand may itself be a combination. A numeral gives its number; a name gives its object from the environment. [p. 7](https://sicp.sourceacademy.org/sicpjs.pdf#page=39)

Declarations such as `const x = 3;` follow a separate rule. [p. 8](https://sicp.sourceacademy.org/sicpjs.pdf#page=40)

---
📚 Summary:
- **Compound expression:** An expression containing other expressions as parts, such as `5 * 5` (or `square(5)`).
- **Operator combination:** A particular kind of compound expression with an operator between its operands, such as `5 * 5`.
- **Compound operation:** A computation defined using simpler operations, such as squaring a number by multiplying it by itself (`x * x`).
---

### 1.1.4 Compound Functions

- **Primitive function:** a function supplied by the interpreter or its libraries. [p. 10](https://sicp.sourceacademy.org/sicpjs.pdf#page=42)
- **Compound function:** a reusable computation defined using simpler operations. A **function declaration** creates one and names it. [p. 8](https://sicp.sourceacademy.org/sicpjs.pdf#page=40)
- **Parameter:** a local name in a function declaration. **Argument:** a value supplied when applying the function. [p. 9](https://sicp.sourceacademy.org/sicpjs.pdf#page=41)
- **Function application:** `function_expression(argument_expressions)`. **Evaluate these expressions → apply the resulting function to the argument values.** [p. 9](https://sicp.sourceacademy.org/sicpjs.pdf#page=41)
- **Return statement:** ends the current function call and supplies its result. [p. 9](https://sicp.sourceacademy.org/sicpjs.pdf#page=41)

```js
function square(x) {  // x is a parameter.
    return x * x;
}
square(2 + 3);       // Argument expression: 2 + 3. Argument value: 5. Result: 25.
```

### 1.1.5 Substitution and Evaluation Order

**Substitution model:** replace parameter references with the corresponding arguments, then evaluate the resulting body. This models compound-function application; it does not describe the interpreter’s implementation. [pp. 11–12](https://sicp.sourceacademy.org/sicpjs.pdf#page=43)

| Evaluation order | What to remember |
| --- | --- |
| **Applicative order** | Evaluate arguments, then apply. Substitute their **values**. JavaScript uses this order for function applications. |
| **Normal order** | Substitute **unevaluated argument expressions**; expand compound-function applications, then evaluate the required primitive operations. |

Source: [pp. 12–13](https://sicp.sourceacademy.org/sicpjs.pdf#page=44).

### 1.1.6 Conditional Expressions and Predicates

**Conditional expression:** `predicate ? consequent : alternative`. Evaluate the predicate, then **only the selected branch**—consequent if true, alternative if false. Its value is the result. [p. 14](https://sicp.sourceacademy.org/sicpjs.pdf#page=46)

- **Predicate:** an expression evaluating to `true` or `false`, or an operator/function producing such a value. [p. 14](https://sicp.sourceacademy.org/sicpjs.pdf#page=46)
- **Primitive predicates:** built-in tests such as `>`, `<`, `>=`, `<=`, `===`, and `!==`. **Compound predicates:** predicates combined using logical operations. [p. 15](https://sicp.sourceacademy.org/sicpjs.pdf#page=47)

For the boolean expressions used in the book:

| Form | Meaning | Evaluation |
| --- | --- | --- |
| `a && b` | **Conjunction:** both true. | Evaluate `b` only if `a` is true. |
| `a \|\| b` | **Disjunction:** at least one true. | Evaluate `b` only if `a` is false. |
| `!a` | **Negation:** reverse the boolean value. | Evaluate `a`, then negate. |

SICP treats `&&` and `||` as **syntactic forms** with special evaluation rules; `!` is a unary operator. [pp. 15–16](https://sicp.sourceacademy.org/sicpjs.pdf#page=47)

*Logic reminder (added terminology):* for boolean `p`, `p || !p` is a **tautology** (always true); `p && !p` is a **contradiction** (always false).

### 1.1.7 Declarative and Imperative Knowledge

- **Declarative:** describes what is true—properties of the desired result.
- **Imperative:** describes how to compute the result.

Source: [p. 18](https://sicp.sourceacademy.org/sicpjs.pdf#page=50).

### 1.1.8 Functions as Black-Box Abstractions

[Read online](https://sourceacademy.org/sicpjs/1.1.8) · [PDF: pp. 22–26](https://sicp.sourceacademy.org/sicpjs.pdf#page=54)

- **Functional decomposition:** divide a problem into identifiable tasks, each implemented by a function that can be used to build other functions. [p. 22](https://sicp.sourceacademy.org/sicpjs.pdf#page=54)
- **Functional abstraction (black box):** use a function through **what it computes**, without needing to know its implementation. Implementations that provide the same expected behavior can be used interchangeably. [pp. 22–23](https://sicp.sourceacademy.org/sicpjs.pdf#page=54)

To use a black box correctly, know its accepted inputs, possible outputs, and intended behavior. See *Composing Programs*, [§1.3, “Functions as Abstractions”](https://composingprograms.com/3ed/defining-new-functions/).

#### Local Names and Scope

**Parameters are local to their function:** two functions can use the same parameter name without their bindings interfering. [p. 23](https://sicp.sourceacademy.org/sicpjs.pdf#page=55)

| Concept | Meaning | Reference |
| --- | --- | --- |
| **Bound name** | A name introduced by a parameter or local declaration in the function being considered. | [p. 24](https://sicp.sourceacademy.org/sicpjs.pdf#page=56) |
| **Free name** | A name used in a function but not bound locally within it; its binding is supplied by an enclosing environment. **Free does not mean undefined.** | [p. 24](https://sicp.sourceacademy.org/sicpjs.pdf#page=56) |
| **Scope** | The region where a binding determines what a name refers to. A parameter’s scope is its function body, including nested functions unless an inner declaration uses the same name. | [pp. 24–25](https://sicp.sourceacademy.org/sicpjs.pdf#page=56) |

**Safe renaming:** consistently renaming a parameter and its references preserves behavior, provided it introduces no name conflicts or **name capture**—accidentally making a previously free name refer to a local binding. [p. 24](https://sicp.sourceacademy.org/sicpjs.pdf#page=56)

#### Internal Declarations and Block Structure

- **Internal declarations:** declarations inside a function that keep helper functions and other names local to it. [p. 25](https://sicp.sourceacademy.org/sicpjs.pdf#page=57)
- **Block structure:** organize code by nesting declarations inside blocks (`{ ... }`). Local declarations keep helper names from conflicting with names outside the block. [pp. 25–26](https://sicp.sourceacademy.org/sicpjs.pdf#page=57)
- **Lexical scoping:** resolve a function’s free names in **the environment where it was declared**, using the nearest enclosing binding of each name. A nested function can therefore use an outer parameter without receiving it as an argument. [p. 25, footnote 25](https://sicp.sourceacademy.org/sicpjs.pdf#page=57)

```js
function add_three(x) {
    function add(y) {
        return x + y;
    }
    return add(3);
}

add_three(5); // 8
```

- In `add_three`, **x is bound** and the helper `add` is local.
- In `add`, **y is bound** and **x is free**. Lexical scoping finds `x` in the enclosing `add_three` call.

**Scope describes where a binding applies; an environment records name–value bindings during evaluation.** Further explanation: *Composing Programs*, [§1.3, “Local Names”](https://composingprograms.com/3ed/defining-new-functions/); nested-function examples: [§1.6, “Lexical Scope”](https://composingprograms.com/3ed/higher-order-functions/).

> **Key connection:** black-box abstraction hides implementation details; block structure keeps helper names local; lexical scoping lets those helpers share enclosing bindings.