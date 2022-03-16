import {IOption} from '~/components/Form/types'
import {_isUndefined} from '~/utils/lodash'
import {ObjectHelper} from '~/utils/ObjectHelper'
import {ArrayHelper} from '~/utils/ArrayHelper'

export class FormHelper {
  static getLangRules = (lang: string) => {
    return lang === 'th' || lang === 'en' ? 'required' : ''
  }

  static getOptions = (value: any[] = [], options: IOption[], initOptions: IOption[] = []): IOption[] => {
    return ArrayHelper.toArray(value).map((item: any) => {
      let find = ArrayHelper.toArray(options).find((option: IOption) => option.value === (item?.value || item))
      if (!find && !ArrayHelper.isEmpty(initOptions)) {
        find = ArrayHelper.toArray(initOptions).find((option: IOption) => option.value === (item?.value || item))
      }
      return {
        value: item?.value || item,
        label: find ? find.label : (item.label || '_')
      }
    })
  }

  static getOption = (value: any = '', options: IOption[], initOptions: IOption[] = []): IOption | null => {
    if (!value) {
      return null
    }

    let find = options.find((item: IOption) => item.value === (value?.value || value)) ||
      ObjectHelper.createOption(value?.value || value)

    if (!find.label && ArrayHelper.toArray(initOptions).length > 0) {
      find = initOptions.find((item: IOption) => item.value === (value?.value || value)) ||
        ObjectHelper.createOption(value?.value || value)
    }

    return find
  }

  static undefinedToNull = (value: any = null): any => {
    return _isUndefined(value) ? null : value
  }
}
