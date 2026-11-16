const { add, subtract, multiply, divide } = require('../src/calculator');

test('add', () => expect(add(1, 2)).toBe(3));
test('subtract', () => expect(subtract(5, 3)).toBe(2));
test('multiply', () => expect(multiply(4, 3)).toBe(12));
test('divide', () => expect(divide(10, 2)).toBe(5));
test('divide by zero throws', () => {
  expect(() => divide(1, 0)).toThrow();
});
