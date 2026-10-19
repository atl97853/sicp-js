/**
 * Multiplies term values over a range using a linear recursive process.
 * The next function must advance toward termination.
 *
 * @param {function(number): number} term - Computes each factor.
 * @param {number} start - First point in the range.
 * @param {function(number): number} next - Computes the next point.
 * @param {number} end - Inclusive upper bound.
 * @returns {number} The product, or 1 if the range is empty.
 */
function productRecursive(term, start, next, end) {
  return start > end
    ? 1
    : term(start) * productRecursive(term, next(start), next, end);
}

/**
 * Multiplies the squares of consecutive integers from start through end.
 * Uses a linear recursive process.
 *
 * @param {number} start - First integer in the range.
 * @param {number} end - Inclusive upper bound.
 * @returns {number} The product of squares, or 1 if the range is empty.
 */
function productOfSquaresRecursive(start, end) {
  /** Returns the square of a number. */
  function square(n) {
    return n * n;
  }

  /** Returns the next integer. */
  function increment(n) {
    return n + 1;
  }

  return productRecursive(square, start, increment, end);
}

/**
 * Multiplies term values over a range using a linear iterative process.
 * The next function must advance toward termination.
 *
 * @param {function(number): number} term - Computes each factor.
 * @param {number} start - First point in the range.
 * @param {function(number): number} next - Computes the next point.
 * @param {number} end - Inclusive upper bound.
 * @returns {number} The product, or 1 if the range is empty.
 */
function productIterative(term, start, next, end) {
  /**
   * Advances through the range while carrying the accumulated product.
   *
   * @param {number} current - Current point in the range.
   * @param {number} accumulatedProduct - Product of previously visited terms.
   * @returns {number} The completed product.
   */
  function iterate(current, accumulatedProduct) {
    return current > end
      ? accumulatedProduct
      : iterate(next(current), accumulatedProduct * term(current));
  }

  return iterate(start, 1);
}

/**
 * Multiplies the squares of consecutive integers from start through end.
 * Uses a linear iterative process.
 *
 * @param {number} start - First integer in the range.
 * @param {number} end - Inclusive upper bound.
 * @returns {number} The product of squares, or 1 if the range is empty.
 */
function productOfSquaresIterative(start, end) {
  /** Returns the square of a number. */
  function square(n) {
    return n * n;
  }

  /** Returns the next integer. */
  function increment(n) {
    return n + 1;
  }

  return productIterative(square, start, increment, end);
}

// Examples
console.log(productOfSquaresRecursive(1, 3)); // 36
console.log(productOfSquaresIterative(1, 3)); // 36