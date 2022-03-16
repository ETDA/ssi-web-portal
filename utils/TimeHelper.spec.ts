import { TimeHelper } from '~/utils/TimeHelper'

describe('TimeHelper', () => {
  test('isMustAfter', () => {
    expect(TimeHelper.isMustAfter('2019-10-18 03:32:50', '2019-10-18 03:32:50')).toBe(false)
    expect(TimeHelper.isMustAfter('2019-10-18 03:33:50', '2019-10-18 03:32:50')).toBe(true)
    expect(TimeHelper.isMustAfter('2019-10-18 03:31:50', '2019-10-18 03:32:50')).toBe(false)
  })

  test('toUTC', () => {
    const date = '2019-10-18 10:32:50'
    expect(TimeHelper.toUTC(date)).toBe('2019-10-18 03:32:50')
    expect(TimeHelper.toUTC('miss')).toBe('miss')
  })

  test('toLocal', () => {
    const date = '2019-10-18 03:32:50'
    expect(TimeHelper.toLocal(date)).toBe('2019-10-18 10:32:50')
    expect(TimeHelper.toLocal('miss')).toBe('miss')

  })

  test('getTimeFromTimeFormat', () => {
    const date = '2019-10-18 03:32:50'
    expect(TimeHelper.getTimeFromTimeFormat(date, 'DD-MM-YYYY')).toBe('18-10-2019')
    expect(TimeHelper.getTimeFromTimeFormat(date, 'YYYY-MM-DD')).toBe('2019-10-18')
    expect(TimeHelper.getTimeFromTimeFormat('miss', 'DD-MM-YYYY')).toBe('miss')

  })

  test('getDateFormTimeWithLocal', () => {
    const date = '2019-10-18 03:32:50'
    expect(TimeHelper.getDateFormTimeWithLocal(date)).toBe('18/10/2019')
    const date2 = '2019-10-18 23:32:50'
    expect(TimeHelper.getDateFormTimeWithLocal(date2)).toBe('19/10/2019')
    expect(TimeHelper.getDateFormTimeWithLocal('miss')).toBe('miss')

  })

  test('getISODateTimeFormTime', () => {
    const date = '2019-10-18 03:32:50'
    expect(TimeHelper.getISODateTimeFormTime(date)).toBe('2019-10-17T20:32:50.000Z')
    expect(TimeHelper.getISODateTimeFormTime('miss')).toBe('miss')

  })

  test('getISODateTimeFormTime', () => {
    const date = '2019-10-18 03:32:50'
    expect(TimeHelper.getDateTimeFormTime(date)).toBe('2019-10-18 03:32:50')

    const date2 = '2019-10-17T20:32:50.000Z'
    expect(TimeHelper.getDateTimeFormTime(date2)).toBe('2019-10-18 03:32:50')
    expect(TimeHelper.getDateTimeFormTime('miss')).toBe('miss')

  })

  test('getTimeFormTime', () => {
    const date = '2019-10-18 03:32:50'
    expect(TimeHelper.getTimeFormTime(date)).toBe('03:32')
    expect(TimeHelper.getTimeFormTime('miss')).toBe('miss')

  })

  test('isDateTimeValid', () => {
    const date = '2020-04-01 17:39:20'
    expect(TimeHelper.isDateTimeValid(date)).toBe(true)
    expect(TimeHelper.isDateTimeValid('')).toBe(false)
    expect(TimeHelper.isDateTimeValid('fdsfdsfsd')).toBe(false)
    expect(TimeHelper.isDateTimeValid('2020-04-01')).toBe(true)
    expect(TimeHelper.isDateTimeValid('17:39:20')).toBe(false)
  })

  test('getDateTimeBeforeMonth', () => {
    const date = '2020-04-01 17:39:20'
    expect(TimeHelper.getDateTimeBeforeMonth(date, 2)).toBe('2020-02-01 17:39:20')
    expect(TimeHelper.getDateTimeBeforeMonth(date, 3)).toBe('2020-01-01 17:39:20')
    expect(TimeHelper.getDateTimeBeforeMonth(date)).toBe('2020-03-01 17:39:20')
  })

  test('getDateTimeFormFixTime', () => {
    const date = '2020-04-01 17:39:20'
    expect(TimeHelper.getDateTimeFormFixTime(date, '00:00')).toBe('2020-04-01 00:00:00')
    expect(TimeHelper.getDateTimeFormFixTime(date, '23:59')).toBe('2020-04-01 23:59:00')
    expect(TimeHelper.getDateTimeFormFixTime(date, '23:59:59')).toBe('2020-04-01 23:59:59')
    expect(TimeHelper.getDateTimeFormFixTime(date, '')).toBe('2020-04-01 00:00:00')
    expect(TimeHelper.getDateTimeFormFixTime('miss', '')).toBe('miss')
  })
})
