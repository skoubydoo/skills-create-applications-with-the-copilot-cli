const test = require('node:test');
const assert = require('node:assert/strict');

const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
} = require('../calculator');

test('adds numbers from the example', () => {
  assert.equal(add(2, 3), 5);
});

test('adds negative and decimal numbers', () => {
  assert.equal(add(-2, 3), 1);
  assert.equal(add(0.1, 0.2), 0.30000000000000004);
});

test('subtracts numbers from the example', () => {
  assert.equal(subtract(10, 4), 6);
});

test('subtracts negative numbers', () => {
  assert.equal(subtract(-2, -3), 1);
});

test('multiplies numbers from the example', () => {
  assert.equal(multiply(45, 2), 90);
});

test('multiplies by zero and negative numbers', () => {
  assert.equal(multiply(0, 8), 0);
  assert.equal(multiply(-4, 3), -12);
});

test('divides numbers from the example', () => {
  assert.equal(divide(20, 5), 4);
});

test('divides decimal and negative numbers', () => {
  assert.equal(divide(7, 2), 3.5);
  assert.equal(divide(-12, 3), -4);
});

test('rejects division by zero', () => {
  assert.throws(() => divide(10, 0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.',
  });
});

test('calculates modulo using the example operands', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(modulo(-10, 3), -1);
});

test('rejects modulo by zero', () => {
  assert.throws(() => modulo(10, 0), {
    name: 'RangeError',
    message: 'Cannot divide by zero.',
  });
});

test('raises a base to an exponent using the example operands', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(power(9, 0.5), 3);
});

test('calculates square roots using the example operand', () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(0), 0);
});

test('rejects square roots of negative numbers', () => {
  assert.throws(() => squareRoot(-1), {
    name: 'RangeError',
    message: 'Cannot calculate the square root of a negative number.',
  });
});

test('calculates each supported operation', () => {
  assert.equal(calculate(2, '+', 3), 5);
  assert.equal(calculate(10, '-', 4), 6);
  assert.equal(calculate(45, '*', 2), 90);
  assert.equal(calculate(20, '/', 5), 4);
  assert.equal(calculate(5, '%', 2), 1);
  assert.equal(calculate(2, '^', 3), 8);
  assert.equal(calculate(16, 'sqrt'), 4);
});

test('rejects invalid operands and operations', () => {
  assert.throws(() => calculate(Number.NaN, '+', 2), {
    name: 'TypeError',
    message: 'Both operands must be valid numbers.',
  });
  assert.throws(() => calculate(2, 'unknown', 3), {
    name: 'RangeError',
    message: 'Operation must be one of: +, -, *, /, %, ^, sqrt.',
  });
  assert.throws(() => calculate(-1, 'sqrt'), {
    name: 'RangeError',
    message: 'Cannot calculate the square root of a negative number.',
  });
});
