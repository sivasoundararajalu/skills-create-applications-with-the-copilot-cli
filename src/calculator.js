#!/usr/bin/env node

'use strict';

/**
 * Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
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

const operations = {
  '+': addition,
  '-': subtraction,
  '*': multiplication,
  '/': division,
  addition,
  subtraction,
  multiplication,
  division,
};

function calculate(operation, firstNumber, secondNumber) {
  const calculatorOperation = operations[operation];

  if (!calculatorOperation) {
    throw new Error(
      `Unsupported operation "${operation}". Use addition, subtraction, multiplication, division, +, -, *, or /.`
    );
  }

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    throw new TypeError('Both operands must be finite numbers.');
  }

  return calculatorOperation(firstNumber, secondNumber);
}

function runCli(argumentsList) {
  const [operation, firstOperand, secondOperand] = argumentsList;

  if (argumentsList.length !== 3) {
    throw new Error('Usage: node src/calculator.js <operation> <first-number> <second-number>');
  }

  const result = calculate(operation, Number(firstOperand), Number(secondOperand));
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
  calculate,
};
