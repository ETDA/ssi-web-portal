import { computed, getCurrentInstance, onUnmounted, provide, useContext, useStore } from '@nuxtjs/composition-api'
import FormRepository from '~/repositories/FormRepository'
import {IFormOption} from '~/components/Form/types'

export const useForm = <T>(options: { name: string }) => {
  const vm: any = getCurrentInstance()
  const ctx = useContext()
  provide('form_name', options.name)
  provide('destroyOnUnmount', true)
  provide('destroyOnMount', true)
  const formRepo = new FormRepository(ctx)

  const values = computed((): T => formRepo.get<T>(options.name))

  formRepo.reset(options.name)

  onUnmounted(() => {
    formRepo.reset(options.name)
  })

  const emitSubmit = (data: any) => {
    vm.emit('submit', data)
  }
  const validate = (submitFunc: Function, transformFunc?: Function) => {
    return new Promise(async (resolve, reject) => {
      const isValid = await vm.refs?.form.validate()
      if (isValid) {
        if (transformFunc) {
          submitFunc(transformFunc(formRepo.get(options.name)))
          return resolve(true)
        } else {
          submitFunc(formRepo.get(options.name))
          return resolve(true)
        }
      }

      return resolve(true)
    })
  }

  return {
    init: <T>(data) => formRepo.init<T>(options.name, data),
    updateAttr: <T>(attr: string, value: T) => formRepo.updateAttr<T>(options.name, attr, value),
    repo: formRepo,
    values,
    emitSubmit,
    formName: options.name,
    validate
  }
}

// TODO: This is cache or something, is not update the UI
export const useFormFields = (fields: IFormOption[]): IFormOption[] => {
  return  fields
}
