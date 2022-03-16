import {Base} from '~/core/Base'
import {Component, Prop} from 'vue-property-decorator'
import {CONFIRM_TYPES, DIALOG_TYPES} from '~/components/Dialog/constants'

@Component
export class BaseDialog extends Base {
  @Prop({ required: true }) readonly options!: any

  loading = false
  input = ''

  get messageHasTitle () {
    let m = this.options.message
    return (typeof m === 'object' && m !== null) && m.title
  }

  get messageTitle () {
    return this.messageHasTitle ? this.options.message.title : null
  }

  get messageBody () {
    let m = this.options.message
    return (typeof m === 'string') ? m : (m.body || '')
  }

  get cancelBtnDisabled () {
    return (this.options.window === DIALOG_TYPES.ALERT)
  }

  get okBtnDisabled () {
    return (this.options.window === DIALOG_TYPES.CONFIRM) &&
      (this.options.type === CONFIRM_TYPES.HARD) &&
      (this.input !== this.options.verification)
  }

  get leftBtnEnabled () {
    return (this.cancelBtnDisabled === false) || (this.options.reverse === true)
  }

  get rightBtnEnabled () {
    return (this.cancelBtnDisabled === false) || (this.options.reverse === false)
  }

  get leftBtnFocus () {
    return !this.isHardConfirm && (this.options.reverse === true)
  }

  get rightBtnFocus () {
    return !this.isHardConfirm && (this.options.reverse === false)
  }

  get leftBtnText () {
    return this.options.reverse ? this.options.okText : this.options.cancelText
  }

  get rightBtnText () {
    return this.options.reverse ? this.options.cancelText : this.options.okText
  }

  get loaderEnabled () {
    return !!this.options.loader
  }

  get isHardConfirm () {
    return this.options.window === DIALOG_TYPES.CONFIRM &&
      this.options.type === CONFIRM_TYPES.HARD
  }

  get isPrompt () {
    return (this.options.window === DIALOG_TYPES.PROMPT)
  }

  get leftBtnComponent () {
    return (this.options.reverse === false) ? 'cancel-btn' : 'ok-btn'
  }

  get rightBtnComponent () {
    return (this.options.reverse === true) ? 'cancel-btn' : 'ok-btn'
  }

  get hardConfirmHelpText () {
    return this.options.verificationHelp.replace(/\[\+:(\w+)]/g, (match, $1) => {
      return this.options[$1] || match
    })
  }

  get promptHelpText () {
    return this.options.promptHelp.replace(/\[\+:(\w+)]/g, (match, $1) => {
      return this.options[$1] || match
    })
  }

  clickRightBtn () {
    this.options.reverse ? this.cancel() : this.proceed(this.getDefaultData())
  }

  clickLeftBtn () {
    this.options.reverse ? this.proceed(this.getDefaultData()) : this.cancel()
  }

  submitDialogForm () {
    this.okBtnDisabled || this.proceed(this.getDefaultData())
  }

  getDefaultData (): any {
    return this.isPrompt ? this.input : null
  }

  proceed (withData: any = null) {
    if (this.loaderEnabled) {
      this.switchLoadingState(true)
      this.options.promiseResolver({
        close: this.close,
        loading: this.switchLoadingState,
        data: withData
      })
    } else {
      this.options.promiseResolver({
        data: withData
      })
      this.close()
    }
  }

  cancel () {
    if (this.loading === true) { return }
    this.close()
  }

  switchLoadingState (loading: any = null) {
    if (loading === null) {
      loading = !this.loading
    }

    this.loading = !!loading
  }

  close () {
    this.$emit('close')
  }
}
