import { nameIsValid, fullTrim, getTotal } from '../src/app'

describe('nameIsValid test coverage', () => {
  test('it loads without error', () => {
    expect(nameIsValid).toBeDefined()
    expect(typeof nameIsValid).toBe('function')
  })
  test('li is an username', () => {
    expect(nameIsValid('li')).toBe(true)
  })
  test('janedoe is an username', () => {
    expect(nameIsValid('janedoe')).toBe(true)
  })
  test.each([
    { name: null },
    { name: undefined },
    { name: 'John' },
    { name: 'john1' },
  ])('$name is not an username', ({ name }) => {
    expect(nameIsValid(name)).not.toBe(true)
  })
  test.each([{ name: 1 }, { name: '!' }, { name: 'L' }, { name: 's' }])(
    '$name with 1 symbol is not an username',
    ({ name }) => {
      expect(nameIsValid(name)).not.toBe(true)
    },
  )
})

describe('fulltrim test coverage', () => {
  test('There is no spaces in the ""', () => {
    expect(fullTrim('')).toBe('')
  })
  test('There is no spaces in the "OTUS"', () => {
    expect(fullTrim('O T U S')).toBe('OTUS')
  })
  test('There is no spaces in the "QA&JS"', () => {
    expect(fullTrim('  QA & JS  ')).toBe('QA&JS')
  })
})

describe('getTotal test coverage', () => {
  test('it loads without error', () => {
    expect(getTotal).toBeDefined()
    expect(typeof getTotal).toBe('function')
  })
  test('There is 90 after discount', () => {
    expect(getTotal([{ price: 10, quantity: 10 }], 10)).toBe(90)
  })
  test.each([
    { item: ([{ price: 10, quantity: 10 }], -10) },
    { item: ([{ price: 10, quantity: 10 }], 101) },
    { item: ([{ price: 10, quantity: 10 }], '50') },
  ])(
    'There is no exists negative, text or more, than 100 discounts',
    ({ item }) => {
      expect(() => getTotal(item)).toThrow()
    },
  )
})
