import { StringHelper } from '~/utils/StringHelper'

describe('StringHelper', () => {
  test('genString', () => {
    expect(StringHelper.genString(5).length).toBe(5)
    expect(StringHelper.genString(10).length).toBe(10)
  })

  test('truncate', () => {
    expect(StringHelper.truncate('สวัสดีพ่อมึงตายอิอิ', 5)).toBe('สวัสด...')
    expect(StringHelper.truncate('sajdisajfgdghjiosdfngosdjg', 5)).toBe('sajdi...')
    expect(StringHelper.truncate('sajdisajfgdghjiosdfngosdjg', 100)).toBe('sajdisajfgdghjiosdfngosdjg')
  })

  test('withComma', () => {
    expect(StringHelper.withComma(5)).toBe('5')
    expect(StringHelper.withComma(10000)).toBe('10,000')
    expect(StringHelper.withComma('20000')).toBe('20,000')
  })

  test('toPascalCase', () => {
    expect(StringHelper.toPascalCase('long')).toBe('Long')
    expect(StringHelper.toPascalCase('passakon puttasuwan')).toBe('PassakonPuttasuwan')
  })

  test('split', () => {
    expect(StringHelper.split('long', ',')).toEqual(['long'])
    expect(StringHelper.split('long,pskclub', ',')).toEqual(['long', 'pskclub'])
    expect(StringHelper.split('long  ,  pskclub', ',')).toEqual(['long', 'pskclub'])
    expect(StringHelper.split('', ',')).toEqual([])
  })

  test('getSlugFromText', () => {
    expect(StringHelper.getSlugFromText('long Pskclub  @ 123')).toEqual('long-pskclub--123')
    expect(StringHelper.getSlugFromText('123 long Pskclub  @  ')).toEqual('123-long-pskclub-')
    expect(StringHelper.getSlugFromText('123 long Pskclub  @๒๓๔ #$*  หลง')).toEqual('123-long-pskclub-๒๓๔--หลง')
  })

  test('getAliasFromText', () => {
    expect(StringHelper.getAliasFromText('long Pskclub  @ 123')).toEqual('long-pskclub--123')
    expect(StringHelper.getAliasFromText('123 long Pskclub  @  ')).toEqual('123-long-pskclub-')
    expect(StringHelper.getAliasFromText('123 long Pskclub  @๒๓๔ #$*  หลง')).toEqual('123-long-pskclub---')
  })

  test('getError', () => {
    expect(StringHelper.getError({})).toEqual('มีบางอย่างผิดพลาด')
    expect(StringHelper.getError({ code: 'xxx', message: '' })).toEqual('มีบางอย่างผิดพลาด')
    expect(StringHelper.getError({ code: 'xxx', message: '' }, 'error')).toEqual('error')
    expect(StringHelper.getError({ code: 'xxx', message: 'something bug' })).toEqual('something bug')
    expect(StringHelper.getError({
      code: 'INVALID_PARAMS', message: 'something bug', fields: {
        email: {
          code: 'REQ',
          message: 'Req some value'
        },
        password: {
          code: 'REQ',
          message: 'PassReq some value'
        }
      }
    })).toEqual('PassReq some value')
  })
})
