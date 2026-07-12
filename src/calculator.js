#!/usr/bin/env node

// Supports addition (+), subtraction (-), multiplication (*), and division (/).
function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new RangeError('Cannot divide by zero.');
  }

  return left / right;
}

const operations = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
};

function calculate(left, operation, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new TypeError('Both operands must be valid numbers.');
  }

  const calculator = operations[operation];
  if (!calculator) {
    throw new RangeError('Operation must be one of: +, -, *, /.');
  }

  return calculator(left, right);
}

function runCli() {
  const [leftInput, operation, rightInput] = process.argv.slice(2);

  if (!leftInput || !operation || !rightInput || process.argv.length !== 5) {
    console.error('Usage: node src/calculator.js <number> <+|-|*|/> <number>');
    process.exitCode = 1;
    return;
  }

  try {
    console.log(calculate(Number(leftInput), operation, Number(rightInput)));
  } catch (error) {
    if (!(error instanceof TypeError || error instanceof RangeError)) {
      throw error;
    }

    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  runCli();
}

module.exports = { add, subtract, multiply, divide, calculate };
