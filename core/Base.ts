import {IStore} from '~/lib/state/types'
import {Component, Inject, Prop, Provide, Vue, Watch} from 'vue-property-decorator'
import {IInputSize, INPUT_SIZES, IOption} from '~/components/Form/types'
import FormRepository from '~/repositories/FormRepository'
import {DialogHelper} from '~/utils/DialogHelper'
import AuthRepository from '~/repositories/AuthRepository'
import AppRepository from '~/repositories/AppRepository'
import {_isEqual, _isUndefined} from '~/utils/lodash'
import {FormHelper} from '~/utils/FormHelper'
import {StringHelper} from '~/utils/StringHelper'
import {ArrayHelper} from '~/utils/ArrayHelper'
import {TimeHelper} from '~/utils/TimeHelper'
import {EventInput} from '~/core/types'

export interface IDialogDeleteOptions {
  title: string,
  description: string,
  confirmText?: string
}

export interface IDialogActionConfirmOptions {
  title: string,
  description: string,
  confirmText?: string
  isDanger?: boolean
}

export class Base extends Vue {
  $store!: IStore<any>
  $refs!: any
  $auth!: AuthRepository
  $app!: AppRepository
  $cookies!: any
  $router!: any
  $dialog!: {
    confirm: any
  }

  $string!: StringHelper
  $array!: ArrayHelper
  $time!: TimeHelper

  $dialogDelete(options: IDialogDeleteOptions): Promise<any> {
    const ops = DialogHelper.deleteOptions()
    ops[1] = {
      ...ops[1],
      ...options
    }
    return this.$dialog.confirm(...ops)
  }

  $dialogConfirm(options: { icon: string, title: string }): Promise<any> {
    const ops = DialogHelper.confirmOptions()
    ops[1] = {
      ...ops[1],
      ...options
    }

    return this.$dialog.confirm(...ops)
  }

  $dialogError(options: { title: string, description?: string }): Promise<any> {
    const ops = DialogHelper.errorOptions()
    ops[1] = {
      ...ops[1],
      ...options
    }

    return this.$dialog.confirm(...ops)
  }
}

export class BaseApp extends Base {

}

@Component
export class BaseForm<T> extends BaseApp {
  @Provide('form_name') form_name = 'default'
  @Provide('destroyOnUnmount') destroyOnUnmount = true
  @Provide('destroyOnMount') destroyOnMount = true
  @Prop(Boolean) readonly isEdit!: boolean

  get formRepo(): FormRepository {
    return new FormRepository(this)
  }

  get form(): T {
    return this.formRepo.get(this.form_name)
  }

  created() {
    if (this.destroyOnMount) {
      this.formRepo.reset(this.form_name)
    }
  }

  destroyed() {
    if (this.destroyOnUnmount) {
      this.formRepo.reset(this.form_name)
    }
  }

  emitSubmit(data: any) {
    this.$emit('submit', data)
  }

  public async validate(submitFunc: Function, transformFunc?: Function) {
    return new Promise(async (resolve, reject) => {
      const isValid = await (this.$refs.form as any).validate()
      if (isValid) {
        if (transformFunc) {
          submitFunc(transformFunc(this.formRepo.get(this.form_name)))
          return resolve(true)
        } else {
          submitFunc(this.formRepo.get(this.form_name))
          return resolve(true)
        }
      }

      return resolve(true)
    })
  }
}

@Component
export class BaseInput extends BaseApp {
  @Prop(Boolean) readonly isCannotChange!: boolean
  @Prop(Boolean) readonly isStatic!: boolean
  @Prop(Boolean) readonly isDisabled!: boolean
  @Prop({type: String, default: ''}) readonly rules!: string
  @Prop(Boolean) readonly autoFocus!: boolean
  @Prop() readonly defaultValue!: any
  @Prop() readonly value!: any
  @Prop(String) readonly name!: string
  @Prop(String) readonly className!: string
  @Prop(Function) readonly transform?: (value: any, oldValue: any) => any
  @Prop(String) readonly label!: string
  @Prop(String) readonly help!: string
  @Prop(String) readonly error!: string
  @Prop({default: () => INPUT_SIZES.MD}) readonly size!: IInputSize
  @Prop(String) readonly placeholder!: string
  @Prop(String) readonly testid?: string
  @Inject('form_name') readonly form_name!: string
  @Prop({type: String, default: () => ''}) readonly postfix?: string

  innerValue: any = null

  get formRepo(): FormRepository {
    return new FormRepository(this)
  }

  get isRequired(): boolean {
    return this.rules ? this.rules.search('required') !== -1 : false
  }

  created() {
    this.init()
  }

  init() {
    const value = this.value
    if (!_isUndefined(value)) {
      this.innerValue = value
    } else {
      this.innerValue = FormHelper.undefinedToNull(this.defaultValue)
    }
  }

  onInput(e: EventInput) {
    this.$emit('change', e)
    this.innerValue = this.transform ? this.transform(e, this.innerValue) : (e.target?.value || '')
  }

  @Watch('innerValue', {deep: true})
  onChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      const newRawValue = _isUndefined(value) ? null : value
      this.formRepo.updateAttr(this.form_name, this.name, newRawValue)
      this.$emit('input', newRawValue)
      this.$emit('change', value)
    }
  }

  getError(error: string): string {
    if (!error) {
      return ''
    }

    return error.replace(`The ${this.label}`, 'This ').replace(`The ${this.name}`, 'This ').replace(`The {field}`, 'This ')
  }

  onKeyPress(e: any) {
    if (this.isCannotChange) {
      e.preventDefault()
    }

    return true
  }

  addError() {
    if (this.error) {
      (this.$refs.input as any).applyResult({
        errors: [this.error], // array of string errors
        valid: false, // boolean state
        failedRules: {} // should be empty since this is a manual error.
      })
    }
  }

  @Watch('error')
  onErrorChange() {
    if (this.error && (this as any).$refs.field)
      (this as any).$refs.field.focus()
    this.addError()
  }

  @Watch('value', {deep: true})
  onValueChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      this.innerValue = value
    }
  }

  mounted() {
    this.addError()
    if (this.autoFocus) {
      setTimeout(() => {
        this.$refs.field.focus()
        this.$refs.field.select()
      }, 20)

    }
  }
}

@Component
export class BaseSelectInput extends BaseInput {
  @Prop({default: () => [], type: Array}) readonly options!: IOption[]
  @Prop({default: () => [], type: Array}) readonly initOptions!: IOption[]
  @Prop(Boolean) readonly isLoading!: boolean
  @Prop({type: Boolean, default: () => true}) readonly allowEmpty!: boolean


  init() {
    if (!_isUndefined(this.value)) {
      this.innerValue = FormHelper.getOption(this.value, this.options, this.initOptions)
    } else {
      this.innerValue = FormHelper.getOption(this.defaultValue, this.options, this.initOptions)
    }
  }

  @Watch('options')
  onInnerOptionsChange(value: IOption[], oldValue: IOption[]) {
    if (!_isEqual(value, oldValue)) {
      this.innerValue = FormHelper.getOption(this.innerValue || this.defaultValue, value, this.initOptions)
    }
  }

  @Watch('innerValue')
  onChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      const result = FormHelper.getOption(value, this.options, this.initOptions)
      this.$emit('input', result?.value || null)
      this.formRepo.updateAttr(this.form_name, this.name, result?.value || null)
    }
  }

  @Watch('value', {deep: true})
  onValueChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      this.innerValue = FormHelper.getOption(value, this.options, this.initOptions)
    }
  }

  onClear() {
    this.innerValue = null
  }

  getClassName(errors, classes, valid, className) {
    return {
      'form-control-lg': this.size === 'LG',
      'form-control': true,
      'is-invalid': errors[0],
      'form-control-alt': this.isStatic,
      'is-valid': classes.dirty && classes.changed && valid,
      [className]: true
    }
  }
}

@Component
export default class BaseSelectAddress extends BaseSelectInput {
  innerOptions: any[] = []
  isInnerLoading: boolean = false

  init() {
    if (this.defaultValue) {
      this.innerValue = FormHelper.getOption(this.defaultValue, this.innerOptions)
    } else {
      this.innerValue = FormHelper.getOption(this.value, this.innerOptions)
    }
  }

  @Watch('innerOptions')
  onInnerOptionsChange(value: IOption[], oldValue: IOption[]) {
    if (!_isEqual(value, oldValue)) {
      this.innerValue = FormHelper.getOption((this.innerValue || this.defaultValue) || null, value)
    }
  }

  @Watch('innerValue')
  onChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      const result = FormHelper.getOption(value, this.innerOptions)
      this.$emit('input', result?.value || null)
      this.formRepo.updateAttr(this.form_name, this.name, result?.value || null)
    }
  }

  @Watch('value', {deep: true})
  onValueChange(value: any, oldValue: any) {
    if (!_isEqual(value, oldValue)) {
      this.innerValue = FormHelper.getOption(value, this.innerOptions)
    }
  }
}
