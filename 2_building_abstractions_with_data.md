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

**Rational number:** a value **`n/d`**, where `n` and `d` are integers and **`d ≠ 0`**. [pp. 72–73](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

**Wishful thinking:** a **strategy of synthesis**: assume the needed constructors and selectors exist, then define operations using their specified behavior **before implementing them**. [p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

### Pairs, constructors, and selectors

**Pair:** a **compound data object with two parts**, either of which can itself be a pair, as in `pair(1, pair(2, 3))`. **List-structured data** consists of objects constructed from pairs. [pp. 73–74](https://sicp.sourceacademy.org/sicpjs.pdf#page=105)

A rational number is initially represented as a **pair of integers: numerator and denominator**. The book's environment supplies the primitive pair functions below. [p. 74](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)

| Role | Pair function | Rational-number definition |
| --- | --- | --- |
| **Constructor: builds an object** | `pair(a, b)` | `make_rat(n, d)` returns `pair(n, d)`. |
| **Selector: retrieves the first part** | `head(p)` | `numer(x)` returns `head(x)`. |
| **Selector: retrieves the second part** | `tail(p)` | `denom(x)` returns `tail(x)`. |

### Rational arithmetic

Operations use the **set of constructor and selector functions**, independently of the concrete representation. For `x = n₁/d₁` and `y = n₂/d₂`, with **nonzero denominators**: [p. 73](https://sicp.sourceacademy.org/sicpjs.pdf#page=105)

| Operation | Result or test |
| --- | --- |
| **`add_rat` / `sub_rat`** | `(n₁d₂ ± n₂d₁)/(d₁d₂)` |
| **`mul_rat`** | `(n₁n₂)/(d₁d₂)` |
| **`div_rat`** | `(n₁d₂)/(d₁n₂)`; requires **`n₂ ≠ 0`**. |
| **`equal_rat`** | **Cross-multiplication:** `n₁ * d₂ === n₂ * d₁`. |

### Lowest terms and abstraction

**Lowest terms:** numerator and denominator have **GCD 1**. Reduce a fraction by dividing both by their **greatest common divisor**. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

For an existing array representation, with `numer(x)` returning `x[0]` and `denom(x)` returning `x[1]`:

```js
import gcd from "./utils.js";

function make_rat(n, d) {
    const g = gcd(Math.abs(n), Math.abs(d));
    return [n / g, d / g];
}
```

**Only `make_rat` changes; arithmetic functions such as `add_rat` and `mul_rat` remain unchanged.** The **rational value is preserved**, although the stored integers and printed fraction may change. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

| Concept | Definition |
| --- | --- |
| [**Functional abstraction**](https://github.com/atl97853/sicp-js/blob/main/1_building_abstractions_with_functions.md#118-functions-as-black-box-abstractions) | Separate **what a function does** from **how it is implemented**. |
| **Data abstraction** | Separate **how compound data is used** from **how it is represented**, through a **set of constructors and selectors (the interface)**. |

Reference: [p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104). **Sign normalization** is addressed separately in [Exercise 2.1, p. 76](https://sicp.sourceacademy.org/sicpjs.pdf#page=108).

### JavaScript details

- **Function alias:** `const make_rat = pair;` gives two names to **the same function**; a wrapper is a separate function that calls it. [p. 74, footnote 2](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)
- **Operator overloading:** the same operator has **different meanings for different operand types**; `+` adds numbers or concatenates strings. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)
- **Printing:** `stringify` converts values to strings; `display` prints and returns its argument. `print_rat` combines these to display `numerator / denominator`. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)