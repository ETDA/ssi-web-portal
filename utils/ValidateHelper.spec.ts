import {ValidateHelper} from '~/utils/ValidateHelper'

describe('ValidateHelper', () => {
  test('isURL', () => {
    expect(ValidateHelper.isURL('https://www.messenger.com/t/2058879267514886')).toBe(true)
    expect(ValidateHelper.isURL('http://www.messenger.com/t/2058879267514886')).toBe(true)
    expect(ValidateHelper.isURL('//www.messenger.com/t/2058879267514886')).toBe(true)
    expect(ValidateHelper.isURL('www.messenger.com/t/2058879267514886')).toBe(false)
    expect(ValidateHelper.isURL('messenger.com')).toBe(false)
  })

  test('isRequired', () => {
    expect(ValidateHelper.isRequired('343242')).toBe(true)
    expect(ValidateHelper.isRequired(123)).toBe(true)
    expect(ValidateHelper.isRequired(true)).toBe(true)
    expect(ValidateHelper.isRequired(null)).toBe(false)
    expect(ValidateHelper.isRequired(undefined)).toBe(false)
    expect(ValidateHelper.isRequired(false)).toBe(false)
    expect(ValidateHelper.isRequired('')).toBe(false)

  })

  test('getError', () => {
    expect(ValidateHelper.getError('The {field} fucking error?', 'Name', 'name')).toBe('This fucking error?')
    expect(ValidateHelper.getError('The Name fucking error?', 'Name', 'name')).toBe('This fucking error?')
    expect(ValidateHelper.getError('The name fucking error?', 'Name', 'name')).toBe('This fucking error?')
  })
})
