#!/usr/bin/env node

// Supports addition (+), subtraction (-), multiplication (*), division (/),
// modulo (%), exponentiation (^), and square root (sqrt).
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

function modulo(left, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new TypeError('Both operands must be valid numbers.');
  }

  if (right === 0) {
    throw new RangeError('Cannot divide by zero.');
  }

  return left % right;
}

function power(base, exponent) {
  if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
    throw new TypeError('Both operands must be valid numbers.');
  }

  return base ** exponent;
}

function squareRoot(value) {
  if (!Number.isFinite(value)) {
    throw new TypeError('The operand must be a valid number.');
  }

  if (value < 0) {
    throw new RangeError('Cannot calculate the square root of a negative number.');
  }

  return Math.sqrt(value);
}

const operations = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
  '%': modulo,
  '^': power,
};

function calculate(left, operation, right) {
  if (operation === 'sqrt') {
    if (right !== undefined) {
      throw new TypeError('Square root only accepts one operand.');
    }

    return squareRoot(left);
  }

  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new TypeError('Both operands must be valid numbers.');
  }

  const calculator = operations[operation];
  if (!calculator) {
    throw new RangeError('Operation must be one of: +, -, *, /, %, ^, sqrt.');
  }

  return calculator(left, right);
}

function runCli() {
  const [leftInput, operation, rightInput] = process.argv.slice(2);
  const isSqrtWithCorrectArity = operation === 'sqrt' && process.argv.length === 4;
  const isBinaryOperationWithCorrectArity =
    operation !== 'sqrt' && Boolean(rightInput) && process.argv.length === 5;

  if (!leftInput || !operation || (!isSqrtWithCorrectArity && !isBinaryOperationWithCorrectArity)) {
    console.error(
      'Usage: node src/calculator.js <number> <operation> [number] (operations: +, -, *, /, %, ^, sqrt)'
    );
    process.exitCode = 1;
    return;
  }

  try {
    console.log(
      calculate(
        Number(leftInput),
        operation,
        isSqrtWithCorrectArity ? undefined : Number(rightInput)
      )
    );
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

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
};
