// @ts-ignore
import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Bangkok')

export const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss' // 2020-02-25 09:23:00
export const dateWithoutTimeFormat = 'YYYY-MM-DD' // 2020-02-25
export const timeWithoutDate = 'HH:mm' // 09:23

const isTimeInValid = (time: any) => time === 'Invalid date'

export class TimeHelper {

  static toUTC = (time: string): string => {
    if (!time) {
      return ''
    }
    try {
      const newTime = moment(time).subtract(7, 'hour').format('YYYY-MM-DD HH:mm:ss')
      return isTimeInValid(newTime) ? time : newTime
    } catch (e) {
      return time.toString()
    }
  }

  static toLocal = (time: string): string => {
    if (!time) {
      return ''
    }
    try {
      const newTime = moment(time).add(7, 'hour').format('YYYY-MM-DD HH:mm:ss')
      return isTimeInValid(newTime) ? time : newTime
    } catch (e) {
      return time
    }
  }

  static getShortTimeForTable = (time: string): string => {
    if (!time) {
      return ''
    }
    try {
      const newTime = moment(time).fromNow()
      return isTimeInValid(newTime) ? time : newTime
    } catch (e) {
      return time
    }
  }

  static getCurrentDate = (): string => {
    const newTime = moment().format('YYYY-MM-DD')
    return isTimeInValid(newTime) ? '' : newTime
  }

  static getDateFormTime = (time: string): string => {
    if (!time) {
      return ''
    }
    const newTime = moment(time).format('DD/MM/YYYY')
    return isTimeInValid(newTime) ? time : newTime
  }

  static getTimeFromTimeFormat = (time: string, format: string) => {
    if (!time) {
      return ''
    }
    const newTime = moment(time).format(format)
    return isTimeInValid(newTime) ? time : newTime
  }

  static getDateFormTimeWithLocal = (time: string): string => {
    if (!time) {
      return ''
    }
    const newTime = moment(TimeHelper.toLocal(time)).format('DD/MM/YYYY')
    return isTimeInValid(newTime) ? time : newTime
  }

  static getDateFormTimeWithLocalWithFormat = (time: string, format = 'DD/MM/YYYY'): string => {
    if (!time) {
      return ''
    }
    const newTime = moment(TimeHelper.toLocal(time)).format(format)
    return isTimeInValid(newTime) ? time : newTime
  }

  static getISODateTimeFormTime = (time: string): string => {
    if (!time) {
      return ''
    }
    const newTime = moment(time).toISOString()
    return (isTimeInValid(newTime) || !newTime) ? time : newTime

  }

  static getDateTimeFormTime = (time: string, format = 'YYYY-MM-DD HH:mm:ss'): string => {
    if (!time) {
      return ''
    }
    const newTime = moment(time).format(format)
    return isTimeInValid(newTime) ? time : newTime
  }

  static getDateTimeTable = (time: string): string => {
    if (!time) {
      return ''
    }
    const newTime = moment(time).format('DD/MM/YYYY HH:mm')
    return isTimeInValid(newTime) ? time : newTime

  }

  static getTimeFormTime = (time: string): string => {
    if (!time) {
      return ''
    }
    const newTime = moment(time).format('HH:mm')
    return isTimeInValid(newTime) ? time : newTime
  }

  static getCurrentDateTime = (): string => {
    const newTime = moment().format('YYYY-MM-DD HH:mm:ss')
    return isTimeInValid(newTime) ? '' : newTime
  }

  static getDateTimeBeforeMonth = (fromDateTime: string, month: number = 1): string => {
    if (month <= 0) {
      month = 1
    }

    const newTime = moment(fromDateTime).subtract(month, 'months').format('YYYY-MM-DD HH:mm:ss')
    return isTimeInValid(newTime) ? fromDateTime : newTime
  }

  static isDateTimeValid = (time: string): boolean => {
    if (!time) {
      return false
    }

    return !isTimeInValid(moment(time).format('YYYY-MM-DD HH:mm:ss'))
  }

  static getDateTimeFormFixTime = (dateTime: string, fixTime: string = '00:00'): string => {
    if (!dateTime) {
      return ''
    }
    if (!fixTime) {
      fixTime = '00:00'
    }
    try {
      const newDate = moment(dateTime).format('YYYY-MM-DD')
      const newTime = moment(newDate + ' ' + fixTime).format('YYYY-MM-DD HH:mm:ss')

      return isTimeInValid(newTime) ? dateTime : newTime
    } catch (e) {
      return dateTime.toString()
    }
  }

  static isBetween = (date: string, start: string, end: string, current: string = defaultDateFormat): boolean => (
      moment(date, current).isBetween(start, end)
  )

  static isBefore = (date: string, date2: string, current: string = defaultDateFormat): boolean => (
      moment(date, current).isSameOrBefore(date2, 'minute')
  )

  static isAfter = (date: string, date2: string, current: string = defaultDateFormat): boolean => (
      moment(date, current).isSameOrAfter(date2, 'minute')
  )

  static isDateSame = (date: string, date2: string): boolean => {
    const newDate = moment(date).format(dateWithoutTimeFormat)
    const newDate2 = moment(date2).format(dateWithoutTimeFormat)

    return moment(newDate).isSame(newDate2)
  }

  static isMustAfter = (date: string, date2: string, current: string = defaultDateFormat): boolean => (
      moment(date, current).isAfter(date2, 'minute')
  )

  static isMustBefore = (date: string, date2: string, current: string = defaultDateFormat): boolean => (
      moment(date, current).isBefore(date2, 'minute')
  )

  static isDifferenceTimeAtLeast = (time1: string, time2: string, range: number): boolean => {
    let a = moment(time1).minute()
    let b = moment(time2).minute()
    let c = moment(time1).hour()
    let d = moment(time2).hour()

    a += (c * 60)
    b += (d * 60)
    a /= 60
    b /= 60

    return Math.abs(Math.ceil(a - b)) >= range
  }

  static isDifferenceDayAtLeast = (date: string, date2: string, range: number): boolean => {
    let a = moment(date, defaultDateFormat).date()
    let b = moment(date2, defaultDateFormat).date()

    return Math.abs(Math.ceil(a - b)) >= range
  }

  static addYear = (time: string, year: number, format = defaultDateFormat): string => {
    if (!time) {
      return ''
    }
    try {
      const newTime = moment(time).add(year, 'year').format(format)
      return isTimeInValid(newTime) ? time : newTime
    } catch (e) {
      return time
    }
  }

  static minusYear = (time: string, year: number, format = defaultDateFormat): string => {
    if (!time) {
      return ''
    }
    try {
      const newTime = moment(time).subtract(year, 'year').format(format)
      return isTimeInValid(newTime) ? time : newTime
    } catch (e) {
      return time
    }
  }
}
