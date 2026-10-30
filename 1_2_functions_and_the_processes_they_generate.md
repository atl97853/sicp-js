# 1 Building Abstractions with Functions

## 1.2 Functions and the Processes They Generate

**Function:** rules for **local evolution**, from one computational stage to the next. **Process:** the computation those rules generate. Its **global behavior** includes shape, time, and space. [pp. 26–27](https://sicp.sourceacademy.org/sicpjs.pdf#page=58)

**Cost model:** time counts elementary operations; space counts **simultaneously retained** information. Arithmetic and each number count as one unit. Constant-space tail recursion assumes **proper tail calls**: the runtime avoids accumulating call records. [p. 30](https://sicp.sourceacademy.org/sicpjs.pdf#page=62), [p. 37, footnote 35](https://sicp.sourceacademy.org/sicpjs.pdf#page=69)

Page links use **printed book numbers**. Supplementary web sources use section names.

### 1.2.1 Linear Recursion and Iteration

[Read online](https://sourceacademy.org/sicpjs/1.2.1) · [PDF: pp. 27–30](https://sicp.sourceacademy.org/sicpjs.pdf#page=59)

**Recursive function:** code that calls itself directly or indirectly. **Process:** how the computation evolves. Recursive code can generate an **iterative process**. [pp. 29–30](https://sicp.sourceacademy.org/sicpjs.pdf#page=61)

| Process | State and evolution | Steps / space |
| --- | --- | --- |
| **Linear recursive process** | Builds a **chain of deferred operations**. **Expansion** builds the chain; **contraction** performs the waiting operations. The interpreter must remember this unfinished work. | `Θ(n)` / `Θ(n)` |
| **Linear iterative process** | Its **state can be summarized by a fixed number of state variables**, together with a fixed update rule and an optional termination test. Their values completely describe the remaining computation. | `Θ(n)` / `Θ(1)` |

Source: [p. 29](https://sicp.sourceacademy.org/sicpjs.pdf#page=61). **Linear** means proportional to `n`; **iterative** alone says nothing about time growth. The **number of state variables** stays fixed; their **values** change.

**What must be remembered?** A recursive process needs its arguments **plus hidden information about the chain of deferred operations**. In an iterative process, the explicit state values are enough to resume between steps, given the same update rule. [p. 29](https://sicp.sourceacademy.org/sicpjs.pdf#page=61)

| Term | Precise meaning | Reference |
| --- | --- | --- |
| **Deferred operation** | Work awaiting a call’s result: `10 + f(...)` adds **after** `f` returns. Repeated calls leave additions waiting, building a **chain of deferred operations**. | [p. 29](https://sicp.sourceacademy.org/sicpjs.pdf#page=61) |
| **Accumulator** | A state variable carrying intermediate results, such as a running product. | [pp. 27–29](https://sicp.sourceacademy.org/sicpjs.pdf#page=59) |
| **Base case** | Returns without further recursion. Recursive steps must progress toward termination. | [Composing Programs, §1.7](https://composingprograms.com/3ed/recursive-functions/) |
| **Tail call** | Returns the call’s result with no further work; arguments are evaluated first. A recursive tail call is **tail recursion**. | [p. 30](https://sicp.sourceacademy.org/sicpjs.pdf#page=62) |
| **Stack** | Storage for unfinished calls, including what must resume when another call returns. | [p. 29, footnote 28](https://sicp.sourceacademy.org/sicpjs.pdf#page=61) |

**Factorial examples:** non-negative integers; `0! = 1`. [pp. 27–29](https://sicp.sourceacademy.org/sicpjs.pdf#page=59)

```js
// Linear recursive process: builds a chain of deferred multiplications.
function factorial_recursive(n) {
    return n === 0 ? 1 : n * factorial_recursive(n - 1);
}

// Linear iterative process: fixed state (remaining, product); no deferred chain.
function factorial_iterative(n) {
    function iter(remaining, product) {
        return remaining === 0
            ? product
            : iter(remaining - 1, product * remaining);
    }
    return iter(n, 1);
}
```

| For input `3` | Process to recognize |
| --- | --- |
| **Recursive** | The call expands to `3 * (2 * (1 * factorial_recursive(0)))`: a **chain of deferred multiplications**. The base case returns `1`, then the waiting multiplications produce `6`. |
| **Iterative** | `(remaining, product)`: `(3, 1)` → `(2, 3)` → `(1, 6)` → `(0, 6)`; return `6`. Each multiplication happens **before** the next call, so no multiplication remains waiting afterward. |

📚 **Recognition cues:**

- **Recursive process:** look for a **chain of deferred operations**—work that must resume after recursive calls return.
- **Iterative process:** look for a **fixed number of state variables** that completely describe the computation, with no growing chain of deferred operations.

Source: [pp. 29–30](https://sicp.sourceacademy.org/sicpjs.pdf#page=61).

### 1.2.2 Tree Recursion

[Read online](https://sourceacademy.org/sicpjs/1.2.2) · [PDF: pp. 32–35](https://sicp.sourceacademy.org/sicpjs.pdf#page=64)

**Tree recursion:** calls can branch into multiple recursive calls; base cases stop branching. With fixed work/storage per call, **steps track node count** and **call-stack space tracks maximum depth**. Branching need not imply exponential time. It naturally handles hierarchical data and alternatives, including expression evaluation. [pp. 32–33](https://sicp.sourceacademy.org/sicpjs.pdf#page=64)

**Fibonacci:** each value adds the previous two, starting with `F(0) = 0`, `F(1) = 1`.

```js
function fib(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
// For non-negative integers: fib(6) returns 8.
```

| Fibonacci method | What changes? | Steps / space |
| --- | --- | --- |
| **Naive tree recursion** | `fib(5)` computes `fib(3)` both directly and through `fib(4)`. | `Θ(φⁿ)` / `Θ(n)`, where `φ ≈ 1.618` |
| **Memoization / full table** | Stores each result for reuse. | `Θ(n)` / `Θ(n)` |
| **Iterative two-value state** | Start `(a, b) = (1, 0)`; update **simultaneously** to `(a + b, a)`. After `n` updates, `b = F(n)`. | `Θ(n)` / `Θ(1)` |

Sources: [pp. 33–35](https://sicp.sourceacademy.org/sicpjs.pdf#page=65), [Composing Programs, §2.9](https://composingprograms.com/3ed/efficiency/). Space counts the **active path**, not the entire tree.

**Memoization:** store results on demand for reuse. **Tabulation:** fill stored results in dependency order. Cost depends on distinct subproblems and work per subproblem; it is not always linear. SICP uses both terms for caching. [p. 35, footnote 33](https://sicp.sourceacademy.org/sicpjs.pdf#page=67), [OpenDSA](https://opendsa-server.cs.vt.edu/ODSA/Books/CS4104/html/DynamicProgramming.html)

**Counting change:** either exclude a denomination or use one coin of it. For amount `a`, `k` types, and positive last denomination `dₖ`:

`ways(a, k) = ways(a, k - 1) + ways(a - dₖ, k)`

Base cases: amount `0` gives **one** way (no more coins); negative amount or positive amount with no types gives **zero** ways. [pp. 34–35](https://sicp.sourceacademy.org/sicpjs.pdf#page=66)

### 1.2.3 Orders of Growth

[Read online](https://sourceacademy.org/sicpjs/1.2.3) · [PDF: pp. 36–37](https://sicp.sourceacademy.org/sicpjs.pdf#page=68)

**Order of growth:** how resource requirements scale with **problem size `n`**. Define `n`—items, exponent value, required accuracy, etc. **`R(n)`** counts a resource: steps or maximum storage. [p. 36](https://sicp.sourceacademy.org/sicpjs.pdf#page=68)

| Notation | Meaning for sufficiently large `n` |
| --- | --- |
| **Theta, `Θ(f(n))` — tight bound** | `R(n)` lies between two positive constant multiples of `f(n)`. |
| **Big O, `O(f(n))` — upper bound** | `R(n)` is at most a positive constant multiple of `f(n)`; the bound may be loose. |

Sources: [pp. 36–37](https://sicp.sourceacademy.org/sicpjs.pdf#page=68), [NIST](https://xlinux.nist.gov/dads/HTML/bigOnotation.html). **Best/average/worst case** and **bound notation** are separate choices: `O` does not mean “worst case.”

| Order and tight bound | Scaling cue | Time example |
| --- | --- | --- |
| **Constant** `Θ(1)` | Bounded independently of `n`. | Absolute value. |
| **Logarithmic** `Θ(log n)` | Doubling input adds roughly fixed work. | Binary search, worst case. |
| **Linear** `Θ(n)` | Doubling input roughly doubles work. | One pass; fixed work per item. |
| **Linearithmic** `Θ(n log n)` | Linear work across logarithmically many levels. | Merge sort, worst case. |
| **Quadratic** `Θ(n²)` | Doubling input gives roughly four times the work. | All `n²` pairs; fixed work per pair. |
| **Exponential** `Θ(cⁿ)`, fixed `c > 1` | Each extra input unit multiplies resources by a roughly fixed factor. | Naive Fibonacci: `c = φ ≈ 1.618`. |

**Simplify:** drop constant factors and lower-order terms: `3n² + 10n + 17` is `Θ(n²)`. Logarithm bases do not change the order; exponential bases can. Time and space can have different bounds. [p. 37](https://sicp.sourceacademy.org/sicpjs.pdf#page=69), [Composing Programs](https://composingprograms.com/3ed/orders-of-growth/)

### 1.2.4 Exponentiation

[Read online](https://sourceacademy.org/sicpjs/1.2.4) · [PDF: pp. 38–40](https://sicp.sourceacademy.org/sicpjs.pdf#page=70)

**Exponentiation:** compute `bⁿ` for a non-negative integer exponent, using `b⁰ = 1`.

| Method | Reduction or state | Steps / space |
| --- | --- | --- |
| **Repeated multiplication, recursive** | `bⁿ = b × bⁿ⁻¹`; multiplication waits for the smaller result. | `Θ(n)` / `Θ(n)` |
| **Repeated multiplication, iterative** | Update a running product `n` times. | `Θ(n)` / `Θ(1)` |
| **Successive squaring, recursive** | Even `n`: `bⁿ = (bⁿ⁄²)²`. Odd `n`: `bⁿ = b × bⁿ⁻¹`. | `Θ(log n)` / `Θ(log n)` |

Sources: [p. 38](https://sicp.sourceacademy.org/sicpjs.pdf#page=70), [p. 39](https://sicp.sourceacademy.org/sicpjs.pdf#page=71).

```js
function square(x) {
    return x * x;
}

function fast_expt(b, n) {
    return n === 0
        ? 1
        : n % 2 === 0
        ? square(fast_expt(b, n / 2))
        : b * fast_expt(b, n - 1);
}
// fast_expt(2, 8) returns 256.
```

**Why logarithmic:** within two steps, the exponent is at least halved or reaches zero. **Compute the half-power once**, then square its result; calling `fast_expt(b, n / 2)` twice would duplicate work. [p. 39](https://sicp.sourceacademy.org/sicpjs.pdf#page=71)

**Invariant:** a quantity or property preserved by every state update. It helps establish correctness. An iterative successive-squaring method can achieve `Θ(log n)` steps with `Θ(1)` state space; exercise 1.16 develops this using an invariant. [p. 40](https://sicp.sourceacademy.org/sicpjs.pdf#page=72)

### 1.2.5 Greatest Common Divisors

[Read online](https://sourceacademy.org/sicpjs/1.2.5) · [PDF: pp. 41–42](https://sicp.sourceacademy.org/sicpjs.pdf#page=73)

**Greatest common divisor (GCD):** the largest positive integer dividing both inputs without a remainder. Use it to reduce fractions to lowest terms. [p. 41](https://sicp.sourceacademy.org/sicpjs.pdf#page=73)

**Euclid’s algorithm:** replace `(a, b)` with `(b, a % b)` until `b = 0`; return `a`. Inputs: non-negative integers, not both zero.

```js
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}
// gcd(48, 18) returns 6.
```

`(48, 18)` → `(18, 12)` → `(12, 6)` → `(6, 0)` → **6**. [p. 42](https://sicp.sourceacademy.org/sicpjs.pdf#page=74)

| Question | Reason |
| --- | --- |
| **Correctness** | `a = q × b + r` implies `(a, b)` and `(b, r)` have the same common divisors. **The GCD is invariant.** |
| **Termination** | For `b > 0`, the next second value is `0 ≤ r < b`, so it decreases to zero. |
| **Process** | **Iterative:** `(a, b)` completely describes state; the recursive call is a tail call. |
| **Cost** | For positive inputs, `n = min(a, b)`: `O(log n)` remainder steps, **worst-case `Θ(log n)`**; `Θ(1)` state space. |

Sources: [pp. 41–42](https://sicp.sourceacademy.org/sicpjs.pdf#page=73).

**Lamé’s theorem:** `k` remainder steps require the smaller input to be at least `F(k)`. Exponential Fibonacci growth therefore bounds steps logarithmically; consecutive Fibonacci inputs give worst-case growth. [p. 42](https://sicp.sourceacademy.org/sicpjs.pdf#page=74)

---

📚 **Review checklist:** identify the input-size measure, current state, deferred work, termination condition, reduction rate, and why each reduction preserves the required result.