import { formatMessage } from "../formatMessage"

describe('formatMessage', () => {
  it('replace parameters inside a string', () => {
    const result = formatMessage(['firstName', 'lastName'], {
      firstName: 'anael',
      lastName: 'chardan'
    }, 'Hey {{firstName}} {{lastName}}, I like the {{firstName}} firstName')

    const expected = 'Hey anael chardan, I like the anael firstName';

    expect(result).toEqual(expected);
  })
})