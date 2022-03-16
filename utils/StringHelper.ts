import urlJoin from 'url-join'

export class StringHelper {
  static getSlugFromText = (str: string): string => {
    const regexpSpacialLetter: RegExp = /[\_|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s]+/g
    return str.toLowerCase().replace(/\s+/g, '-').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '').replace(regexpSpacialLetter, '')
  }

  static getAliasFromText = (str: string): string => {
    const regexpSpacialLetter: RegExp = /[\_|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s]+/g
    return str.toLowerCase().replace(/\s+/g, '-').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '').replace(/[ก-๙]/g, '').replace(regexpSpacialLetter, '')
  }
  static genString = (length: number = 5) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  static withComma = (value: number | string = 0): string => {
    return (+(value || 0)).toLocaleString()
  }

  static copyToClipBoard = (value: string = '') => {
    const textArea: any = window.document.createElement('textarea')
    textArea.value = value
    window.document.body.appendChild(textArea)
    textArea.select()
    window.document.execCommand('Copy')
    textArea.remove()
  }

  static toPascalCase = (str: string): string => {
    return `${str}`.replace(new RegExp(/[-_]+/, 'g'), ' ').replace(new RegExp(/[^\w\s]/, 'g'), '').replace(new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`).replace(new RegExp(/\s/, 'g'), '').replace(new RegExp(/\w/), s => s.toUpperCase())
  }

  static split = (str: string | null | undefined, separator: string | RegExp): string[] => {
    return `${str || ''}`.split(separator).filter((item: string) => item).map((item: string) => item.trim())
  }

  static joinURL = (value: any, value2: any): string => {
    return urlJoin(value, value2)
  }

  static truncate = (str: any, num = 300) => {
    str = str || ''
    if (str.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }

  static genHTML (html = '', css = '', js = ''): string {
    const newCSS = css ? `<style>${css}</style>` : ''
    const newJS = js ? `<script type="text/javascript">window.onload=function(){${js}}</script>` : ''
    const newHTML = html || ''

    return `${newCSS}${newHTML}${newJS}`
  }

  static getShortDID = (did: string): string => {
    try {
      if (!did) {
        return '-'
      }
      const dids = did.split(':')
      const length = dids[2].length
      return `${dids[0]}:${dids[1]}:${dids[2].substring(0, 3)}xxxxxxxxxx${dids[2].substring(length - 3, length)}`
    } catch (e) {
      return did
    }
  }

  static getError = (errorData: { code: string, message: any, fields: object } | any, defaultErrorMessage: string = 'มีบางอย่างผิดพลาด') => {
    let msg = errorData?.message
    if (!errorData.code || !msg) {
      return defaultErrorMessage
    }

    if (errorData.code !== 'INVALID_PARAMS' && !errorData.fields) {
      return msg
    }

    for (const [key, value] of Object.entries<any>(errorData.fields)) {
      msg = value.message
    }

    return msg
  }
}
