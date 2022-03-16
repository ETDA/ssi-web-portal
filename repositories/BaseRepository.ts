import {IPageOptions, IPageStateMeta, IStatus} from '~/lib/state/types'
import {Commit, Dispatch} from 'vuex/types'
import {Base} from '~/core/Base'
import {_get} from '~/utils/lodash'
import {IContext, IState} from '~/store/types'

export class BaseRepository {
  protected _vm

  constructor (_vm: Base | IContext | any) {
    this._vm = {
      store: _vm.store || _vm.$store
    }
  }

  get store () {
    return (this._vm as any).store || this._vm.$store
  }

  get state (): IState {
    return this.store.state
  }

  get dispatch (): Dispatch {
    return this.store.dispatch
  }

  get getters (): any {
    return this.store.getters
  }

  get commit (): Commit {
    return this.store.commit
  }
}

export interface PageRepository {
  options: IPageOptions
  status: IStatus
  addStatus: IStatus
  deleteStatus: IStatus
  items: any[]

  $fetch (page?: number, query?: string): Promise<any>

  $get (id: string): Promise<any>

  $update (id: string, data: any): Promise<any>

  $delete (id: string): Promise<any>

  $search (query: string): Promise<any>
}

export class BasePageRepository<T, A, U> extends BaseRepository implements PageRepository {
  meta!: IPageStateMeta

  get items (): T[] {
    return _get(this.state, this.meta.path, {}).items?.filter((item) => !!(item))
  }

  get status (): IStatus {
    return this.getters[this.meta.getterTypes.status]
  }

  get options (): IPageOptions {
    return _get(this.state, this.meta.path, {}).options
  }

  get findStatus (): IStatus {
    return this.getters[this.meta.getterTypes.findStatus]
  }

  get updateStatus (): IStatus {
    return this.getters[this.meta.getterTypes.updateStatus]
  }

  get addStatus (): IStatus {
    return this.getters[this.meta.getterTypes.addStatus]
  }

  get deleteStatus (): IStatus {
    return this.getters[this.meta.getterTypes.deleteStatus]
  }

  get findItem (): T {
    return _get(this.state, this.meta.path, {}).find.data || {}
  }

  get addItem (): T {
    return _get(this.state, this.meta.path, {}).add.data || {}
  }

  get updateItem (): T {
    return _get(this.state, this.meta.path, {}).update.data || {}
  }

  get deleteItem (): T {
    return _get(this.state, this.meta.path, {}).delete.data || {}
  }

  $fetch = (page: number = 1, query: string = '', options = {}): Promise<any> => {
    return this.dispatch(new this.meta.actionTypes.GetPage(page, query, options))
  }

  $get = (id: string, options: any = {}): Promise<any> => {
    return this.dispatch(new this.meta.actionTypes.Find(id, options))
  }

  $add = (data: A, options: any = {}): Promise<any> => {
    return this.dispatch(new this.meta.actionTypes.Add(data, options))
  }

  $update = (id: string, data: any, options = {}): Promise<any> => {
    return this.dispatch(new this.meta.actionTypes.Update(id, data, options))
  }

  $search = (text: string, options = {}) => {
    return this.store.dispatch(new this.meta.actionTypes.GetPage(1, text, options))
  }

  $delete = (id: string, options: any = {}): Promise<any> => {
    return this.dispatch(new this.meta.actionTypes.Delete(id, options))
  }
}
