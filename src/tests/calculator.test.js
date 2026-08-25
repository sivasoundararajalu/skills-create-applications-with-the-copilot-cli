'use strict';

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
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

describe('modulo', () => {
  test('returns the remainder', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('rejects modulo by zero', () => {
    expect(() => modulo(1, 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('power', () => {
  test('raises a base to an exponent', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('supports negative exponents', () => {
    expect(power(2, -2)).toBe(0.25);
  });
});

describe('squareRoot', () => {
  test('returns the square root of a non-negative number', () => {
    expect(squareRoot(81)).toBe(9);
  });

  test('rejects negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed.');
  });
});

describe('extended operation image examples', () => {
  test.each([
    ['modulo with 5 % 2', modulo, [5, 2], 1],
    ['power with 2 ^ 3', power, [2, 3], 8],
    ['square root with √16', squareRoot, [16], 4],
  ])('%s returns the expected result', (_description, operation, operands, expected) => {
    expect(operation(...operands)).toBe(expected);
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
    ['%', 10, 3, 1],
    ['**', 2, 3, 8],
    ['modulo', 10, 3, 1],
    ['power', 2, 3, 8],
  ])('calculates %s for %d and %d', (operation, firstNumber, secondNumber, expected) => {
    expect(calculate(operation, firstNumber, secondNumber)).toBe(expected);
  });

  test.each([
    ['sqrt', 81, 9],
    ['squareRoot', 81, 9],
  ])('calculates %s for %d', (operation, number, expected) => {
    expect(calculate(operation, number)).toBe(expected);
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate('average', 4, 2)).toThrow('Unsupported operation');
  });

  test('rejects non-finite operands', () => {
    expect(() => calculate('+', Number.NaN, 2)).toThrow('The first operand must be a finite number.');
    expect(() => calculate('+', Infinity, 2)).toThrow('The first operand must be a finite number.');
    expect(() => calculate('+', 2, Number.NaN)).toThrow('The second operand must be a finite number.');
  });
});
