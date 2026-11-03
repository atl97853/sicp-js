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

### Pairs and rational-number representation

**Pair:** a **compound data object with two parts**, either of which can itself be a pair. **List-structured data** consists of objects constructed from pairs. [pp. 73–74](https://sicp.sourceacademy.org/sicpjs.pdf#page=105)

Initially, a rational number is represented as a **pair of integers: numerator and denominator**. The book’s environment supplies `pair`, `head`, and `tail`. [p. 74](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)

| Pair operation | Rational-number implementation |
| --- | --- |
| **Construct:** `pair(a, b)` | `make_rat(n, d)` returns `pair(n, d)`. |
| **Select first part:** `head(p)` | `numer(x)` returns `head(x)`. |
| **Select second part:** `tail(p)` | `denom(x)` returns `tail(x)`. |

### Rational arithmetic

Operations use **`make_rat`, `numer`, and `denom`**. For `x = n₁/d₁` and `y = n₂/d₂`, with **nonzero denominators**: [p. 73](https://sicp.sourceacademy.org/sicpjs.pdf#page=105)

| Operation | Result or test |
| --- | --- |
| **`add_rat` / `sub_rat`** | `(n₁d₂ ± n₂d₁)/(d₁d₂)` |
| **`mul_rat`** | `(n₁n₂)/(d₁d₂)` |
| **`div_rat`** | `(n₁d₂)/(d₁n₂)`; requires **`n₂ ≠ 0`**. |
| **`equal_rat`** | **Cross-multiplication:** `n₁ * d₂ === n₂ * d₁`. |

### Lowest terms

**Lowest terms:** numerator and denominator have **GCD 1**. Reduce a fraction by dividing both by their **greatest common divisor**. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

For an existing array representation, where `numer(x)` returns `x[0]` and `denom(x)` returns `x[1]`:

```js
import gcd from "./utils.js";

function make_rat(n, d) {
    const g = gcd(Math.abs(n), Math.abs(d));
    return [n / g, d / g];
}
```

**Only `make_rat` changes; the arithmetic functions remain unchanged.** The **rational value is preserved**, although the stored integers and printed fraction may change. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

**Sign normalization** is addressed separately in [Exercise 2.1, p. 76](https://sicp.sourceacademy.org/sicpjs.pdf#page=108).

### JavaScript details

- **Function alias:** `const make_rat = pair;` gives two names to **the same function**; a wrapper is a separate function that calls it. [p. 74, footnote 2](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)
- **Operator overloading:** an operator has **different meanings for different operand types**; `+` adds numbers or concatenates strings. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)
- **Printing:** `print_rat` uses `stringify` to convert values to strings and `display` to print `numerator / denominator`. In the book’s environment, **`display` returns its argument**. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

### 2.2.1 Abstraction Barriers
#### Core concepts

| Concept | Meaning |
| --- | --- |
| **Data-abstraction principle** | Identify a **basic set of operations** for each **type of data object**, then express all manipulations of objects of that type **using only those operations**. [p. 76](https://sicp.sourceacademy.org/sicpjs.pdf#page=108) |
| **Data abstraction** | Separate **how data objects are used** from **how they are constructed and represented**. |
| **Interface** | A **set of functions with specified behavior** through which programs construct, select parts of, and manipulate data objects. |
| **Implementation** | The function bodies and **concrete representation** that make those operations work, possibly using more primitive data objects. |
| **Abstraction barrier** | Separates **the programs above, which use the data abstraction**, from **the programs below, which implement it**. |

> **Functions at each level are the interfaces that define the abstraction barriers and connect the different levels.** [p. 76](https://sicp.sourceacademy.org/sicpjs.pdf#page=108)

**Constructors and selectors** implement the **abstract data in terms of its concrete representation**.

**When using an abstraction, you can ignore representation details. When implementing it, you still need to understand those details.** This is the distinction that abstraction barriers establish.

#### Example: rational-number package

| Level | Implemented or manipulated through |
| --- | --- |
| **Programs using rational numbers** | The arithmetic functions supplied **for public use** by the rational-number package. |
| **Arithmetic functions** | The rational-number **constructor and selectors**. |
| **Constructor and selectors** | **Pairs**. |

The details of **how pairs are implemented are irrelevant to the rest of the rational-number package**.

#### Representation dependence

1. **Multiple representations:** any complex data structure can be **represented in a variety of ways** using the primitive data structures provided by a programming language.
2. **Effect on programs:** the **choice of representation influences the programs that operate on it**.
3. **Effect of changes:** if the representation changes later, all such programs might need to be modified accordingly.
4. **Confining dependence:** this could be time-consuming and expensive in large programs unless **dependence on the representation is confined, by design, to very few program modules**.

#### Advantages

- **Easier maintenance and modification:** programs become much easier to maintain and modify.
- **Flexibility in design:** **constraining dependence on the representation to a few interface functions** helps us **design programs as well as modify them**, because it preserves the flexibility to consider **alternative implementations**.
- **Deferred decisions:** the data-abstraction methodology lets us **defer representation decisions without losing the ability to make progress on the rest of the system**.