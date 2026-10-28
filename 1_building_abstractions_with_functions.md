# 1 Building Abstractions with Functions

## 1.1 The elements of programming
- **Primitives expressions**: the simplest entities the language is concerned with. `5`, `334`. 
- **Means of combination**: mechanisms for building **compound elements** from simpler ones. `5 + 334` combines two p**rimitive expressions** with an **operator** to form a **compound expression**. Such expressions are called **combinations** (p. 4) 
- **Means of abstraction**: mechanisms by which compound elements can be named and manipulated as units. `const total = 5 + 334;`

### 1.1.1 Expressions
- You type a statement, and the interpreter responds by displaying the result of its *evaluating* that statement. One kind of statement you might type is an **expression statemen**t, which consists of an expression followed by a semicolon. *One kind of primitive expression is a number* (p. 3).
- `5 + 334`: expressions such as these, which contain other expressions as components, are called **combinations**.
- A combination with an **operator symbol** (+, -, /, *, etc.) between **operand expressions** on its left and right is called an **operator combination** [`11b2b`].
- The value of an **operator combination** is the result of applying the function specified by the **operator** to the values of the **operands**.
- **Infix notation**: the convention of placing the operator between its operands.
- The interpreter runs in a **reads-evaluate-print loop**: even with complex expressions, **the interpreter** always operates in the same basic cycle: **It reads a statement typed by the user** -> **evaluates the statement**, -> **and prints the result** (p. 5).
---
Summary:
- **Numbers and arithmetic operations are primitive data and functions.** (p. 8)
- **Nesting of combinations provides a means of combining operations.** (p. 8)
- **Constant declarations that associate names** [`12m3m`] **with values provide a limited means of abstraction.** (p. 8)
---
### 1.1.2 Naming and the Environment
- **Constant declaration** is our language's **simplest means of abstraction**, for it allows us to use simple names to refer to the results of **compound operations**, such as the circumference (p. 6).
```js
const pi = 3.14159; // const _ = primitive expression
const radius = 10; // const _ = primitive expression
const circumference = 2 * pi * radius; // name-object association (compound operation)
```
- **Name-object associations**: can be created incrementally in successive interactions.
- **Associating values with names**: [`12m3m`] and later retrieving them means that the interpreter must maintain some sort of **memory** [`13q4q`] that keeps track of the **name-object pairs** (p. 6).
- **The program environment**: is the interpreter’s memory of name–object associations [`13q4q`]. 

### 1.1.3 Evaluating Operator Combinations
- **To evaluate an operator combination**: first evaluate its operand expressions, then apply the function denoted by the operator to their resulting values (p. 6).
- The key point is the **role of the environment** in determining the meaning of the names in expressions; the general notion of the environment as providing a context in which evaluation takes place will play an important role in our understanding of program execution (p. 8).
---
Summary [`11b2b`]:
- **Compound expression:** An expression containing other expressions as parts, such as `5 * 5` (or `square(5)`).
- **Operator combination:** A particular kind of compound expression with an operator between its operands, such as `5 * 5`.
- **Compound operation:** A computation defined using simpler operations, such as squaring a number by multiplying it by itself (`x * x`) [`14d5d`].
---
### 1.1.4 Compound Functions
- **Function declarations**: a much more powerful **abstraction technique** by which a **compound operation** [`14d5d`] can be given a name and then referred to as a unit (p. 8).
```js
// "...how to express *the idea of squaring*."
// "...to square something, take it times itself."
function square(x) {
    return x * x;
}
// Above we have a *compound function*, which has been given the name *square*. It represents the operation *[14d5d]* of multiplying something by itself.
// The thing to be multiplied is given *a local name* -> *x*.
```
- **Function applications**: are after **operator combinations** the **second kind of combination of expressions** *into* **larger expressions** that we encounter. The general form of a function application is -> `function-expression(argument-expressions)` (p. 9).