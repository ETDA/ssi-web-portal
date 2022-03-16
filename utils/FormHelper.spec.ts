import {FormHelper} from '~/utils/FormHelper'

describe('FormSchemaHelper', () => {

  test('undefinedToNull', () => {
    expect(FormHelper.undefinedToNull(null)).toEqual(null)
    expect(FormHelper.undefinedToNull(1)).toEqual(1)
    expect(FormHelper.undefinedToNull(undefined)).toEqual(null)
    expect(FormHelper.undefinedToNull('long')).toEqual('long')
  })

  test('getLangRules', () => {
    expect(FormHelper.getLangRules('th')).toEqual('required')
    expect(FormHelper.getLangRules('en')).toEqual('required')
    expect(FormHelper.getLangRules('jp')).toEqual('')
    expect(FormHelper.getLangRules('')).toEqual('')
  })

  test('getOption', () => {
    const options = [
      {
        value: 'long',
        label: 'Long'
      }, {
        value: 'p',
        label: 'P'
      }]
    expect(FormHelper.getOption('long', options)).toEqual({
      value: 'long',
      label: 'Long'
    })
    expect(FormHelper.getOption('', options)).toEqual(null)
    expect(FormHelper.getOption('123456', options)).toEqual({ 'label': '', 'value': '123456' })
    expect(FormHelper.getOption('123456', options, [
      {
        value: '123456',
        label: 'pskclub'
      }])).toEqual({ 'label': 'pskclub', 'value': '123456' })

    expect(FormHelper.getOption({ value: 'p' }, options)).toEqual({
      value: 'p',
      label: 'P'
    })
  })

  test('getOptions', () => {
    const options = [
      {
        value: 'long',
        label: 'Long'
      }, {
        value: 'p',
        label: 'P'
      }]

    expect(FormHelper.getOptions(['long', 'p'], options)).toEqual(options)
    expect(FormHelper.getOptions([], options)).toEqual([])
    expect(FormHelper.getOptions(options, options)).toEqual(options)
    expect(FormHelper.getOptions(['123456'], options)).toEqual([
      {
        value: '123456',
        label: '_'
      }])

    expect(FormHelper.getOptions(['123456'], options, [{ 'label': 'pskclub', 'value': '123456' }])).toEqual([
      {
        value: '123456',
        label: 'pskclub'
      }])
    expect(FormHelper.getOptions(['long'], options)).toEqual([
      {
        value: 'long',
        label: 'Long'
      }])
  })
})
