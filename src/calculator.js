#!/usr/bin/env node

'use strict';

/**
 * Supported operations: addition (+), subtraction (-), multiplication (*), division (/),
 * modulo (%), power (**), and square root (sqrt).
 */
function addition(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtraction(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiplication(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function division(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    throw new RangeError('Division by zero is not allowed.');
  }

  return firstNumber / secondNumber;
}

function modulo(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    throw new RangeError('Modulo by zero is not allowed.');
  }

  return firstNumber % secondNumber;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(number) {
  if (number < 0) {
    throw new RangeError('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(number);
}

const operations = {
  '+': addition,
  '-': subtraction,
  '*': multiplication,
  '/': division,
  '%': modulo,
  '**': power,
  sqrt: squareRoot,
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
};

function calculate(operation, firstNumber, secondNumber) {
  const calculatorOperation = operations[operation];

  if (!calculatorOperation) {
    throw new Error(
      `Unsupported operation "${operation}". Use addition, subtraction, multiplication, division, modulo, power, squareRoot, +, -, *, /, %, **, or sqrt.`
    );
  }

  if (!Number.isFinite(firstNumber)) {
    throw new TypeError('The first operand must be a finite number.');
  }

  if (calculatorOperation.length === 2 && !Number.isFinite(secondNumber)) {
    throw new TypeError('The second operand must be a finite number.');
  }

  return calculatorOperation(firstNumber, secondNumber);
}

function runCli(argumentsList) {
  const [operation, ...operands] = argumentsList;
  const calculatorOperation = operations[operation];

  if (!calculatorOperation) {
    calculate(operation, Number.NaN);
  }

  const expectedOperandCount = calculatorOperation.length;

  if (operands.length !== expectedOperandCount) {
    const operandUsage = expectedOperandCount === 1 ? '<number>' : '<first-number> <second-number>';
    throw new Error(`Usage: node src/calculator.js <operation> ${operandUsage}`);
  }

  const result = calculate(operation, ...operands.map(Number));
  console.log(result);
}

if (require.main === module) {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
};
