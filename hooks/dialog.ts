import { DialogHelper } from '~/utils/DialogHelper'
import Vue from 'vue'
import { IDialogActionConfirmOptions, IDialogDeleteOptions } from '~/core/Base'

export enum DialogConfirmIconType {
  SUCCESS = 'success'
}

export const useDialog = () => {
  return {
    confirm: (options: { icon?: DialogConfirmIconType, title: string, description?: string }): Promise<any> => {
      const ops = DialogHelper.confirmOptions()
      ops[1] = {
        ...ops[1],
        ...options
      }

      // @ts-ignore
      return Vue.dialog.confirm(...ops)
    },
    delete: (options: IDialogDeleteOptions): Promise<any> => {
      const ops = DialogHelper.deleteOptions()
      ops[1] = {
        ...ops[1],
        ...options
      }
      // @ts-ignore
      return Vue.dialog.confirm(...ops)
    },
    error: (options: { title: string, description?: string }): Promise<any> => {
      const ops = DialogHelper.errorOptions()
      ops[1] = {
        ...ops[1],
        ...options
      }
      // @ts-ignore
      return Vue.dialog.confirm(...ops)
    },
    actionConfirm: (options: IDialogActionConfirmOptions): Promise<any> => {
      const ops = DialogHelper.actionConfirmOptions()
      ops[1] = {
        ...ops[1],
        ...options
      }
      // @ts-ignore
      return Vue.dialog.confirm(...ops)
    }

  }
}
