'use strict';

const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
} = require('../calculator');

describe('addition', () => {
  test('adds the image example operands', () => {
    expect(addition(2, 3)).toBe(5);
  });

  test('adds negative and decimal numbers', () => {
    expect(addition(-2, 3.5)).toBe(1.5);
  });
});

describe('subtraction', () => {
  test('subtracts the image example operands', () => {
    expect(subtraction(10, 4)).toBe(6);
  });

  test('subtracts negative numbers', () => {
    expect(subtraction(-2, -3)).toBe(1);
  });
});

describe('multiplication', () => {
  test('multiplies the image example operands', () => {
    expect(multiplication(45, 2)).toBe(90);
  });

  test('multiplies by zero', () => {
    expect(multiplication(8, 0)).toBe(0);
  });
});

describe('division', () => {
  test('divides the image example operands', () => {
    expect(division(20, 5)).toBe(4);
  });

  test('returns a decimal quotient when needed', () => {
    expect(division(7, 2)).toBe(3.5);
  });

  test('rejects division by zero', () => {
    expect(() => division(1, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('calculate', () => {
  test.each([
    ['+', 2, 3, 5],
    ['-', 10, 4, 6],
    ['*', 45, 2, 90],
    ['/', 20, 5, 4],
    ['addition', 2, 3, 5],
    ['subtraction', 10, 4, 6],
    ['multiplication', 45, 2, 90],
    ['division', 20, 5, 4],
  ])('calculates %s for %d and %d', (operation, firstNumber, secondNumber, expected) => {
    expect(calculate(operation, firstNumber, secondNumber)).toBe(expected);
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate('%', 4, 2)).toThrow('Unsupported operation');
  });

  test('rejects non-finite operands', () => {
    expect(() => calculate('+', Number.NaN, 2)).toThrow('Both operands must be finite numbers.');
    expect(() => calculate('+', Infinity, 2)).toThrow('Both operands must be finite numbers.');
  });
});
