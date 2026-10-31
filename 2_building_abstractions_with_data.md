# 2 Building Abstractions with Data

[Read the chapter introduction](https://sourceacademy.org/sicpjs/2). Page links use **printed book numbers**.

| Key concept | Meaning | Reference |
| --- | --- | --- |
| **Compound data** | Data objects combined into a **single conceptual unit**, such as a numerator and denominator forming one rational number. | [pp. 69–70](https://sicp.sourceacademy.org/sicpjs.pdf#page=101) |
| **Appropriate manipulations** | Operations with the required meaning for the data being used. A client needs to know what `add` and `mul` do, without knowing how their arguments are represented. | [p. 70](https://sicp.sourceacademy.org/sicpjs.pdf#page=102) |
| **Closure of combination** | Results of a combination operation can themselves be components in further combinations, such as pairs containing pairs. | [p. 71](https://sicp.sourceacademy.org/sicpjs.pdf#page=103) |

**Why manipulate compound objects directly?** Functions can receive and return whole objects instead of tracking separate components and their relationships. This raises the conceptual level, improves modularity, and increases expressive power. [pp. 69–71](https://sicp.sourceacademy.org/sicpjs.pdf#page=101)

## 2.1 Introduction to Data Abstraction

[Read online](https://sourceacademy.org/sicpjs/2.1) · [PDF: p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

**Data abstraction:** a methodology that **isolates how a compound data object is used from how it is constructed from more primitive data objects**. This parallels functional abstraction: separate **use** from **implementation**. [p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

The **two parts of the system** are:

| Part | Responsibility | Rational-number example |
| --- | --- | --- |
| **Client / use part** | Operates on **abstract data** through the promised interface. | `add_rat` uses `make_rat`, `numer`, and `denom`. |
| **Representation / implementation part** | Chooses a **concrete representation** and implements that interface. | Store the numerator first and denominator second in a pair; implement the constructor and selectors accordingly. |

- **Abstract data:** data understood through its meaning and supported operations, independently of its storage layout.
- **Concrete representation:** the chosen lower-level encoding—for example, a pair whose first component is the numerator and second component is the denominator.
- **Interface:** a **set of functions—constructors and selectors**—connecting the two parts. A **constructor** builds an object; a **selector** extracts a component.

**No unnecessary assumptions:** clients rely on the interface’s promised behavior, rather than the storage layout or field order. [p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

### 2.1.1 Example: Arithmetic Operations for Rational Numbers

[Read online](https://sourceacademy.org/sicpjs/2.1.1) · [PDF: pp. 72–75](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

**Rational number:** a value expressible as `n/d`, where `n` and `d` are integers and **`d ≠ 0`**.

**Wishful thinking:** design the operations **as if the required constructor and selectors already existed**, specifying what they must do before deciding how to implement them. [p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104)

| Interface function | Required behavior |
| --- | --- |
| **`make_rat(n, d)`** — constructor | Construct a rational number with value `n/d`. |
| **`numer(x)`** — selector | Return the numerator of rational number `x`. |
| **`denom(x)`** — selector | Return its denominator. |

Source: [p. 72](https://sicp.sourceacademy.org/sicpjs.pdf#page=104). The constructor preserves the **value** `n/d`; after reduction, selectors need not return the original unreduced integers. [p. 75](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

For `x = n₁/d₁` and `y = n₂/d₂`, with nonzero denominators:

| Operation | Result or test |
| --- | --- |
| **`add_rat(x, y)`** | `(n₁d₂ + n₂d₁)/(d₁d₂)` |
| **`sub_rat(x, y)`** | `(n₁d₂ - n₂d₁)/(d₁d₂)` |
| **`mul_rat(x, y)`** | `(n₁n₂)/(d₁d₂)` |
| **`div_rat(x, y)`** | `(n₁d₂)/(d₁n₂)`; requires **`n₂ ≠ 0`**. |
| **`equal_rat(x, y)`** | `n₁d₂ = n₂d₁`: compare values by cross-multiplication. |

Source: [p. 73](https://sicp.sourceacademy.org/sicpjs.pdf#page=105). For example, addition uses **only the rational-number interface**:

```js
function add_rat(x, y) {
    return make_rat(numer(x) * denom(y) + numer(y) * denom(x),
                    denom(x) * denom(y));
}
```

#### Pairs: the “Glue” for Compound Data

**Pair:** a compound structure containing **two components**, either of which can itself be a pair. Objects built from pairs are called **list-structured data**. [pp. 73–74](https://sicp.sourceacademy.org/sicpjs.pdf#page=105)

| Function | Meaning |
| --- | --- |
| **`pair(a, b)`** | Construct a pair with components `a` and `b`. |
| **`head(p)`** | Select its first component. |
| **`tail(p)`** | Select its second component, which may itself be a pair. |

The book’s environment supplies these functions. **Your two-element arrays can implement the same pair interface** in ordinary JavaScript:

```js
const pair = (a, b) => [a, b];
const head = p => p[0];
const tail = p => p[1];

const nested = pair(pair(1, 2), pair(3, 4));
head(nested);       // [1, 2]
tail(nested);       // [3, 4]
head(tail(nested)); // 3
```

**Arrays implement pairs; pairs represent rational numbers.** Indexing stays inside `head`/`tail`; rational arithmetic uses `numer`/`denom`. Nesting illustrates **closure of combination**. [pp. 71, 74](https://sicp.sourceacademy.org/sicpjs.pdf#page=103)

#### Representing Rational Numbers

The initial representation simply pairs `n` with `d`. To store fractions in **lowest terms**, divide both parts by their **greatest common divisor**. This changes the constructor while preserving the rational-number operations. [pp. 74–75](https://sicp.sourceacademy.org/sicpjs.pdf#page=106)

```js
// Euclid's algorithm from §1.2.5; called here with non-negative inputs.
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Preconditions: integer n and d; d !== 0.
function make_rat(n, d) {
    const g = gcd(Math.abs(n), Math.abs(d));
    return pair(n / g, d / g);
}

function numer(x) { return head(x); }
function denom(x) { return tail(x); }

const sum = add_rat(make_rat(1, 3), make_rat(1, 3));
console.log(numer(sum), denom(sum)); // 2 3
```

The simple constructor would produce `6/9`; the reducing constructor produces `2/3` using the **same `add_rat`**. Sign normalization is a separate policy addressed in exercise 2.1. [pp. 75–76](https://sicp.sourceacademy.org/sicpjs.pdf#page=107)

---

📚 **Recognition cues:**

- **Compound data:** combine parts into a **single conceptual unit**.
- **Data abstraction:** separate **how data is used** from **how it is represented**.
- **Wishful thinking:** define operations through an assumed **constructor/selector interface**, then implement it.
- **Modularity:** improve the representation through that interface while preserving client behavior.