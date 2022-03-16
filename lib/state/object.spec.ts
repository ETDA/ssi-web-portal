import * as object from '~/lib/state/object'
import {
  defaultObjectState,
  getObjectAction,
  objectErrorMutation,
  objectLoadingMutation,
  objectMutations,
  objectResetMutation,
  objectSuccessMutation,
  postObjectAction
} from '~/lib/state/object'
import * as util from '~/lib/state/util'
import {commitWithPrefixLoading, commonObjectState} from '~/lib/state/util'
import {IActionOptions, IObjectState, IStateContext, Post} from '~/lib/state/types'
import {IState} from '~/store/types'
import {ActionContext} from 'vuex'
import {NewRequester} from '~/lib/Requester'
import {Core} from '~/core/Core'
import {faker} from '~/utils/faker'

describe('object', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('mutations', () => {
    const mutations = objectMutations()
    expect(mutations.error).not.toBeUndefined()
    expect(mutations.success).not.toBeUndefined()
    expect(mutations.loading).not.toBeUndefined()
    expect(mutations.reset).not.toBeUndefined()
  })

  test('mutations with prefix', () => {
    const prefix = 'add'
    const mutations = objectMutations(prefix)
    expect(mutations.addError).not.toBeUndefined()
    expect(mutations.addSuccess).not.toBeUndefined()
    expect(mutations.addLoading).not.toBeUndefined()
    expect(mutations.addReset).not.toBeUndefined()
  })

  test('objectLoadingMutation', () => {
    const prefix = ''
    const state = defaultObjectState()
    const options: any = {
      name: 'long'
    }
    const mutations = (objectLoadingMutation(prefix))
    mutations(state, { options })
    const expectState = {
      ...defaultObjectState(),
      isLoading: true,
      options: {
        ...state.options,
        ...options
      }
    }
    expect(state).toEqual(expectState)
  })

  test('objectLoadingMutation with prefix', () => {
    const prefix = 'post'
    const state = defaultObjectState()
    const options: any = {
      name: 'long'
    }
    const mutations = (objectLoadingMutation(prefix))
    mutations(state, { options })
    const expectState = {
      ...defaultObjectState(),
      [prefix]: {
        ...state[prefix],
        isLoading: true,
        options: {
          ...state.options,
          ...options
        }
      }
    }
    expect(state).toEqual(expectState)
  })

  test('objectSuccessMutation', () => {
    const prefix = ''
    const state = defaultObjectState()
    const options: any = {
      op: 'pskclub'
    }

    const data: any = {
      name: 'long'
    }
    const mutations = (objectSuccessMutation(prefix))
    mutations(state, { data, options })
    const expectState = {
      ...defaultObjectState(),
      isSuccess: true,
      isLoaded: true,
      data: data,
      options: {
        ...state.options,
        ...options
      }
    }
    expect(state).toEqual(expectState)
  })

  test('objectSuccessMutation with prefix', () => {
    const prefix = 'post'
    const state = defaultObjectState()
    const options: any = {
      name: 'long'
    }
    const mutations = (objectSuccessMutation(prefix))
    mutations(state, { options })
    const expectState = {
      ...defaultObjectState(),
      [prefix]: {
        ...state[prefix],
        isSuccess: true,
        options: {
          ...state.options,
          ...options
        }
      }
    }
    expect(state).toEqual(expectState)
  })

  test('objectErrorMutation', () => {
    const prefix = ''
    const state = defaultObjectState()
    const data: any = {
      name: 'long'
    }
    const mutations = (objectErrorMutation(prefix))
    mutations(state, data)
    const expectState = {
      ...defaultObjectState(),
      isLoaded: true,
      isError: true,
      errorData: data,
      data: null,
      options: {}
    }
    expect(state).toEqual(expectState)
  })

  test('objectErrorMutation with prefix', () => {
    const prefix = 'post'
    const state = defaultObjectState()
    const mutations = (objectErrorMutation(prefix))
    mutations(state, null)
    const expectState = {
      ...defaultObjectState(),
      [prefix]: {
        ...state[prefix],
        isError: true,
        errorData: null,
        options: {},
        data: null
      }
    }
    expect(state).toEqual(expectState)
  })

  test('objectErrorMutation', () => {
    const prefix = ''
    const state = defaultObjectState()
    const data: any = {
      name: 'long'
    }
    const mutations = (objectErrorMutation(prefix))
    mutations(state, data)
    const expectState = {
      ...defaultObjectState(),
      isError: true,
      isLoaded: true,
      errorData: data
    }
    expect(state).toEqual(expectState)
  })

  test('objectResetMutation', () => {
    const prefix = ''
    const state = {
      ...defaultObjectState(),
      isSuccess: true,
      data: 'pskclub'
    }
    const mutations = (objectResetMutation(prefix))
    mutations(state)
    const expectState = defaultObjectState()
    expect(state).toEqual(expectState)
  })

  test('objectResetMutation with prefix', () => {
    const prefix = 'post'
    const moreData = () => ({
      isSuccess: true,
      data: 'pskclub'
    })

    const state = {
      ...defaultObjectState(),
      ...moreData(),
      [prefix]: commonObjectState()
    }
    const mutations = (objectResetMutation(prefix))
    mutations(state)
    const expectState = {
      ...defaultObjectState(),
      ...moreData()
    }
    expect(state).toEqual(expectState)
  })

  test('getObjectAction success', async () => {
    const options: (ctx: IStateContext) => IActionOptions = jest.fn(() => ({
      baseURL: '/products',
      headers: {
        auth: 'eiei'
      }
    }))
    const ctx: ActionContext<IObjectState<any>, IState> | any = {
      commit: jest.fn(),
      dispatch: jest.fn()
    }

    const reqOptions = {
      baseURL: faker.internet.url(),
      headers: {
        token: faker.name.firstName()
      },
      params: {}
    }

    const mockRes = {
      data: {
        status: 'success'
      },
      status: 200,
      statusText: '200',
      headers: {},
      config: {},
      request: {}
    }

    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValueOnce(reqOptions)
    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValueOnce(reqOptions)
    const spyReq = jest.spyOn(NewRequester, 'get').mockResolvedValueOnce(mockRes)
    const spyCommitLoading = jest.spyOn(util, 'commitWithPrefixLoading')
    const spyDispatchLoadingHook = jest.spyOn(object, 'objectDispatchHookLoading')
    const spyCommitSuccess = jest.spyOn(util, 'commitWithPrefixSuccess')
    const spyDispatchSuccessHook = jest.spyOn(object, 'ObjectDispatchHookSuccess')
    const action = await getObjectAction(options)(ctx, {})

    expect(spyReq).toHaveBeenCalledTimes(1)
    expect(spyReq.mock.calls[0][0]).toBe(options(ctx).baseURL)
    expect(spyReq.mock.calls[0][1]).toEqual({
      ...reqOptions,
      headers: {
        ...reqOptions.headers,
        ...options(ctx).headers
      }

    })
    expect(spyCommitSuccess).toHaveBeenCalledTimes(1)
    expect(spyCommitSuccess.mock.calls[0][1]).toEqual(mockRes.data)
    expect(spyCommitLoading).toHaveBeenCalledTimes(1)
    expect(spyDispatchLoadingHook).toHaveBeenCalledTimes(1)
    expect(spyCommitSuccess).toHaveBeenCalledTimes(1)
    expect(spyDispatchSuccessHook).toHaveBeenCalledTimes(1)
    expect(spyDispatchSuccessHook.mock.calls[0][1]).toEqual(mockRes.data)
    expect(ctx.commit).toHaveBeenCalledTimes(2)
    expect(ctx.dispatch).toHaveBeenCalledTimes(2)
  })

  test('getObjectAction error', async () => {
    const options: (ctx: IStateContext) => IActionOptions = jest.fn(() => ({
      baseURL: '/products',
      headers: {
        auth: 'eiei'
      }
    }))
    const reqOptions = {
      baseURL: faker.internet.url(),
      headers: {
        token: faker.name.firstName()
      }
    }

    const ctx: any = {
      commit: jest.fn(),
      dispatch: jest.fn()
    }

    const mockReqRes = {
      config: {},
      code: 500,
      request: {},
      response: {
        data: {
          status: 'error'
        },
        status: 500,
        statusText: '500',
        headers: {},
        config: {},
        request: {}
      },
      isAxiosError: false
    }
    const spyReq = jest.spyOn(NewRequester, 'get').mockRejectedValueOnce(mockReqRes)
    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValueOnce(reqOptions)
    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValueOnce(reqOptions)
    const spyCommitLoading = jest.spyOn(util, 'commitWithPrefixLoading')
    const spyDispatchLoadingHook = jest.spyOn(object, 'objectDispatchHookLoading')
    const spyCommitError = jest.spyOn(util, 'commitWithPrefixError')
    const spyDispatchErrorHook = jest.spyOn(object, 'ObjectDispatchHookError')
    const action = await getObjectAction(options)(ctx, {})

    expect(spyCommitLoading).toHaveBeenCalledTimes(1)
    expect(spyReq).toHaveBeenCalledTimes(1)
    expect(spyReq.mock.calls[0][0]).toBe(options(ctx).baseURL)
    expect(spyReq.mock.calls[0][1]).toEqual({
      ...reqOptions,
      headers: {
        ...reqOptions.headers,
        ...options(ctx).headers
      },
      params: {}
    })
    expect(spyCommitError).toHaveBeenCalledTimes(1)
    expect(spyCommitError.mock.calls[0][1]).toEqual(mockReqRes)
    expect(spyDispatchLoadingHook).toHaveBeenCalledTimes(1)
    expect(spyDispatchErrorHook).toHaveBeenCalledTimes(1)
    expect(spyDispatchErrorHook.mock.calls[0][1]).toEqual(mockReqRes)
    expect(ctx.commit).toHaveBeenCalledTimes(2)
    expect(ctx.dispatch).toHaveBeenCalledTimes(2)
  })

  test('postObjectAction success', async () => {
    const options: (ctx: IStateContext) => IActionOptions = jest.fn(() => ({
      baseURL: '/products',
      headers: {
        auth: 'eiei'
      }
    }))
    const ctx: ActionContext<IObjectState<any>, IState> | any = {
      commit: jest.fn(),
      dispatch: jest.fn()
    }

    const reqOptions = {
      baseURL: 'https://google.com',
      headers: {
        token: 'fkdspfasfafasdfa'
      },
      params: {}
    }

    const mockRes = {
      data: {
        status: 'success'
      },
      status: 200,
      statusText: '200',
      headers: {},
      config: {},
      request: {}
    }

    const data: Post = {
      type: '',
      data: {},
      options: {}
    }

    const spyReq = jest.spyOn(NewRequester, 'post').mockResolvedValueOnce(mockRes)
    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValueOnce(reqOptions)
    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValueOnce(reqOptions)
    const spyCommitLoading = jest.spyOn(util, 'commitWithPrefixLoading')
    const spyDispatchLoadingHook = jest.spyOn(object, 'objectDispatchHookLoading')
    const spyCommitSuccess = jest.spyOn(util, 'commitWithPrefixSuccess')
    const spyDispatchSuccessHook = jest.spyOn(object, 'ObjectDispatchHookSuccess')
    const action = await postObjectAction(options)(ctx, data)

    expect(spyReq).toHaveBeenCalledTimes(1)
    expect(spyReq.mock.calls[0][0]).toBe(options(ctx).baseURL)
    expect(spyReq.mock.calls[0][1]).toEqual(data.data)
    expect(spyReq.mock.calls[0][2]).toEqual({
      ...reqOptions,
      headers: {
        ...reqOptions.headers,
        ...options(ctx).headers
      }
    })
    expect(spyCommitSuccess).toHaveBeenCalledTimes(1)
    expect(spyCommitSuccess.mock.calls[0][1]).toEqual(mockRes.data)
    expect(spyCommitLoading).toHaveBeenCalledTimes(1)
    expect(spyDispatchLoadingHook).toHaveBeenCalledTimes(1)
    expect(spyCommitSuccess).toHaveBeenCalledTimes(1)
    expect(spyDispatchSuccessHook).toHaveBeenCalledTimes(1)
    expect(spyDispatchSuccessHook.mock.calls[0][1]).toEqual(mockRes.data)
    expect(ctx.commit).toHaveBeenCalledTimes(2)
    expect(ctx.dispatch).toHaveBeenCalledTimes(2)
  })

  test('postObjectAction error', async () => {
    const options: (ctx: IStateContext) => IActionOptions = jest.fn(() => ({
      baseURL: '/products',
      headers: {
        auth: 'eiei'
      }
    }))

    const data: Post = {
      type: '',
      data: {},
      options: {}
    }

    const reqOptions = {
      baseURL: 'https://google.com',
      headers: {
        token: 'fkdspfasfafasdfa'
      },
      params: {}
    }

    const ctx: any = {
      commit: jest.fn(),
      dispatch: jest.fn()
    }

    const mockReqRes = {
      config: {},
      code: 500,
      request: {},
      response: {
        data: {
          status: 'error'
        },
        status: 500,
        statusText: '500',
        headers: {},
        config: {},
        request: {}
      },
      isAxiosError: false
    }

    const spyReq = jest.spyOn(NewRequester, 'post').mockRejectedValueOnce(mockReqRes)
    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValueOnce(reqOptions)
    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValueOnce(reqOptions)
    const spyCommitLoading = jest.spyOn(util, 'commitWithPrefixLoading')
    const spyDispatchLoadingHook = jest.spyOn(object, 'objectDispatchHookLoading')
    const spyCommitError = jest.spyOn(util, 'commitWithPrefixError')
    const spyDispatchErrorHook = jest.spyOn(object, 'ObjectDispatchHookError')
    const action = await postObjectAction(options)(ctx, data)

    expect(spyCommitLoading).toHaveBeenCalledTimes(1)
    expect(spyReq).toHaveBeenCalledTimes(1)
    expect(spyReq.mock.calls[0][0]).toBe(options(ctx).baseURL)
    expect(spyReq.mock.calls[0][1]).toEqual(data.data)
    expect(spyReq.mock.calls[0][2]).toEqual({
      ...reqOptions,
      headers: {
        ...reqOptions.headers,
        ...options(ctx).headers
      }
    })
    expect(spyCommitError).toHaveBeenCalledTimes(1)
    expect(spyCommitError.mock.calls[0][1]).toEqual(mockReqRes)
    expect(spyDispatchLoadingHook).toHaveBeenCalledTimes(1)
    expect(spyDispatchErrorHook).toHaveBeenCalledTimes(1)
    expect(spyDispatchErrorHook.mock.calls[0][1]).toEqual(mockReqRes)
    expect(ctx.commit).toHaveBeenCalledTimes(2)
    expect(ctx.dispatch).toHaveBeenCalledTimes(2)
  })
})
