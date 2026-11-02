# 2 Building Abstractions with Data

- **Primitive data:** basic building blocks; here, numbers. **Compound data:** objects formed by combining data objects into a **single conceptual unit**, such as a rational number containing a numerator and denominator. [pp. 69–70](https://sicp.sourceacademy.org/sicpjs.pdf#page=101)
- **Closure of combination:** compound objects can themselves be components of further combinations. This lets simple building blocks form increasingly complex structures. [p. 71](https://sicp.sourceacademy.org/sicpjs.pdf#page=103)

## 2.1 Introduction to Data Abstraction

[Read online](https://sourceacademy.org/sicpjs/2.1)

**Data abstraction:** a methodology that **isolates how a compound data object is used from the details of how it is constructed from more primitive data objects**. Like functional abstraction, it separates **use from implementation**. [p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

The core idea:

1. **Operate on “abstract data”:** structure programs that use **compound data objects** so that they make **no assumptions about the data that are not strictly necessary for performing the task at hand**.

2. **Define a “concrete” data representation independently:** specify how compound data objects are constructed from **more primitive data objects**, independently of the programs that use them.

3. **Connect the two parts through a set of functions:** functions called **selectors and constructors** implement the **abstract data in terms of the concrete representation**. **Constructors** build compound data objects; **selectors** retrieve their parts.

Reference: [§2.1, p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104).

## 2.1.1 Example: Arithmetic Operations for Rational Numbers

[Read online](https://sourceacademy.org/sicpjs/2.1.1)

**Rational number:** a value expressible as **`n/d`**, where `n` and `d` are integers and **`d ≠ 0`**. [pp. 72–73](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

**Wishful thinking:** a **strategy of synthesis**: assume the constructor `make_rat` and selectors `numer` and `denom` already exist, then define arithmetic operations in terms of them **before deciding how they are implemented**. [p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

> **Wishful thinking** is a **top-down design technique**: write high-level code assuming the helper functions you need already exist, then implement them later. It uses [**functional abstraction**](https://github.com/atl97853/sicp-js/blob/main/1_building_abstractions_with_functions.md#118-functions-as-black-box-abstractions) to treat those helpers as **black boxes with specified behavior**. Here, the **constructor and selectors** provide **data abstraction** by separating operations on rational numbers from their concrete representation.

### Pairs

**Pair:** a **compound structure** constructed using the primitive function **`pair`**. This function takes **two arguments** and returns **one compound data object containing them as parts**. [p. 73](https://sicp.sourceacademy.org/sicpjs.pdf#page=105)

| Primitive function | Role |
| --- | --- |
| **`pair(a, b)`** | **Constructor:** construct a pair containing `a` and `b`. |
| **`head(p)`** | **Selector:** extract the first part of pair `p`. |
| **`tail(p)`** | **Selector:** extract the second part of pair `p`. |

A pair can be **given a name and manipulated like a primitive data object**. Its parts can themselves be pairs, making pairs **general-purpose building blocks for more complex data structures**. [p. 74](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)

**List-structured data:** data objects **constructed from pairs**. The functions `pair`, `head`, and `tail` provide the **“glue”** for constructing and selecting their parts. [p. 74](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)

```js
const nested = pair(pair(1, 2), pair(3, 4));
head(tail(nested)); // 3: select the second pair, then its first part.
```

**Environment note:** the book's JavaScript environment supplies these primitive functions. In ordinary JavaScript, a **two-element array** is one possible concrete representation of a pair.

### Representing rational numbers

Represent a rational number as a **pair of two integers**: its **numerator** and **denominator**. The constructor and selectors are then implemented in terms of `pair`, `head`, and `tail`. [p. 74](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)

| Function | Required behavior | Initial implementation |
| --- | --- | --- |
| **`make_rat(n, d)`** | Construct a rational number with value **`n/d`**. | `return pair(n, d);` |
| **`numer(x)`** | Select the numerator of rational number `x`. | `return head(x);` |
| **`denom(x)`** | Select its denominator. | `return tail(x);` |

**`const one_half = make_rat(1, 2);`** associates the name `one_half` with a **compound data object representing the rational number `1/2`**. [pp. 74–75](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)

**Arithmetic operations** are defined in terms of the **constructor and selector functions** `make_rat`, `numer`, and `denom`. For `x = n₁/d₁` and `y = n₂/d₂`, with **nonzero denominators**: [p. 73](https://sicp.sourceacademy.org/sicpjs.pdf#page=105)

| Operation | Result or test |
| --- | --- |
| **`add_rat(x, y)`** | `(n₁d₂ + n₂d₁)/(d₁d₂)` |
| **`sub_rat(x, y)`** | `(n₁d₂ - n₂d₁)/(d₁d₂)` |
| **`mul_rat(x, y)`** | `(n₁n₂)/(d₁d₂)` |
| **`div_rat(x, y)`** | `(n₁d₂)/(d₁n₂)`; requires **`n₂ ≠ 0`**. |
| **`equal_rat(x, y)`** | **Cross-multiplication:** `n₁ * d₂ === n₂ * d₁`. |

### Reducing to lowest terms: changing the constructor

**Lowest terms:** divide the numerator and denominator by their **greatest common divisor (GCD)** before constructing the compound data object. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

**Ordinary JavaScript adaptation:** assume rational numbers already use arrays `[n, d]`, with existing selectors `numer(x)` returning `x[0]` and `denom(x)` returning `x[1]`.

```js
// utils.js

/** Returns the GCD of non-negative integers a and b. */
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

export default gcd;
```

```js
// main.js
import gcd from "./utils.js";

/** Constructs n/d in lowest terms; integer inputs, d !== 0. */
function make_rat(n, d) {
    const g = gcd(Math.abs(n), Math.abs(d));
    return [n / g, d / g];
}
```

For the book's pair representation, the last line is `return pair(n / g, d / g);`.

**Only the constructor's implementation changes:** instead of storing `[n, d]`, it stores `[n / g, d / g]`. **None of the functions that implement the arithmetic operations, such as `add_rat` and `mul_rat`, need to change.** [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

| Part | Responsibility |
| --- | --- |
| **Set of functions (interface)** | Specify the behavior of `make_rat`, `numer`, and `denom`. |
| **Implementation** | Define their bodies and the concrete representation; here, `make_rat` uses GCD reduction and an array. |
| **Use** | Arithmetic functions call the constructor and selectors without needing the details of reduction or storage. |

**Functional abstraction** lets callers use `make_rat` through its specified behavior while suppressing its implementation details. **Data abstraction** isolates how rational numbers are used from how they are constructed and represented. The set of constructor and selector functions connects these two parts. [p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

The change preserves the **rational value `n/d`**; the selected integers and printed fraction may change. **Sign normalization** is a separate requirement in [Exercise 2.1, p. 76](https://sicp.sourceacademy.org/sicpjs.pdf#page=108).

### JavaScript details

- **Function alias:** `const make_rat = pair;` makes `make_rat` and `pair` **names for the same primitive constructor**. A separately declared `make_rat` calls `pair`, allowing calls to `make_rat` to be traced independently. [p. 74, footnote 2](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)

- **Operator overloading:** an operator performs different operations depending on its operands. The book uses **`+` to add two numbers or concatenate two strings**. [p. 75, footnote 3](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

- **Printing rational numbers:** `print_rat` uses **`stringify`** to convert the numerator and denominator to strings, **`+`** to combine them with `" / "`, and **`display`** to print the result. In the book's environment, **`display` returns its argument**, which `print_rat` then returns. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)