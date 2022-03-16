import {StringHelper} from '~/utils/StringHelper'

export interface IWindowPopupOptions {
  width: number
  height: number
  html: string
  css: string
  js: string
}

export class DialogHelper {
  static deleteOptions = (): any[] => (['dialog', { view: 'dialog', type: 'delete' }])
  static confirmOptions = (): any[] => (['dialog', { view: 'dialog', type: 'confirm' }])
  static errorOptions = (): any[] => (['dialog', { view: 'dialog', type: 'error' }])
  static actionConfirmOptions = (): any[] => (['dialog', { view: 'dialog', type: 'action-confirm' }])

  static openWindowPopup (options: IWindowPopupOptions): Window | null {
    const left = (window.screen.width / 2) - (options.width / 2)
    const top = (window.screen.height / 2) - (options.height / 2)
    const script = document.createElement('script')

    script.innerHTML = options.js
    const w: any = window.open('', 'preview', `width=${options.width} height=${options.height} left=${left} top=${top}`)
    w.document.body.innerHTML = StringHelper.genHTML(options.html, options.css)
    w.document.body.appendChild(script)

    return w
  }
}
