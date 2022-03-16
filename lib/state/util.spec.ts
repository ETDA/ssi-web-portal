import {
  addPrefix,
  commitPageLoading,
  commitPageSuccess,
  commitWithPrefixError,
  commitWithPrefixLoading,
  commitWithPrefixSuccess,
  commonObjectState,
  getRequestObjectOption,
  getRequestPageOption,
  isChangeWithTrue,
  mutationErrorStatus,
  mutationLoadingStatus,
  mutationResetStatus,
  mutationSuccessStatus
} from '~/lib/state/util'
import {defaultPageState} from '~/lib/state/page'
import {IMutationData} from '~/lib/state/types'
import {Core} from '~/core/Core'
import {faker} from '~/utils/faker'

describe('util', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('mutationLoadingStatus', () => {
    const state = commonObjectState()
    mutationLoadingStatus(state)
    expect(state.isLoading).toBe(true)
    expect(state.isError).toBe(false)
    expect(state.isSuccess).toBe(false)
    expect(state.errorData).toBe(null)

    const pageState = defaultPageState()
    const prefix = 'add'
    mutationLoadingStatus(pageState, null, prefix)
    expect(pageState[prefix].isLoading).toBe(true)
    expect(pageState[prefix].isError).toBe(false)
    expect(pageState[prefix].isSuccess).toBe(false)
    expect(pageState[prefix].errorData).toBe(null)
  })

  test('mutationErrorStatus', () => {
    const state = commonObjectState()
    mutationErrorStatus(state, null)
    expect(state.isLoading).toBe(false)
    expect(state.isError).toBe(true)
    expect(state.isSuccess).toBe(false)
    expect(state.errorData).toBe(null)

    const state2 = defaultPageState()
    const prefix = 'add'
    mutationErrorStatus(state2, null, prefix)
    expect(state2[prefix].isLoading).toBe(false)
    expect(state2[prefix].isError).toBe(true)
    expect(state2[prefix].isSuccess).toBe(false)
    expect(state2[prefix].errorData).toBe(null)

    const state3 = defaultPageState()
    const prefix2 = 'delete'
    const error = 'something went wrong'
    mutationErrorStatus(state3, error, prefix2)
    expect(state3[prefix2].isLoading).toBe(false)
    expect(state3[prefix2].isError).toBe(true)
    expect(state3[prefix2].isSuccess).toBe(false)
    expect(state3[prefix2].errorData).toEqual(error)
  })

  test('mutationSuccessStatus no prefix', () => {
    const state = commonObjectState()
    mutationSuccessStatus(state)
    expect(state.isLoading).toBe(false)
    expect(state.isError).toBe(false)
    expect(state.isSuccess).toBe(true)
    expect(state.errorData).toBe(null)
  })

  test('mutationSuccessStatus add prefix', () => {
    const state2 = defaultPageState()
    const prefix = 'add'
    mutationSuccessStatus(state2, null, prefix)
    expect(state2[prefix].isLoading).toBe(false)
    expect(state2[prefix].isError).toBe(false)
    expect(state2[prefix].isSuccess).toBe(true)
    expect(state2[prefix].errorData).toBe(null)
    expect(state2[prefix].data).toBe(null)

    const items = [
      {
        id: '1'
      },
      {
        id: '2'
      },
      {
        id: '3'
      },
      {
        id: '4'
      }
    ]
    const data = {
      data: {
        id: '5'
      }
    }

    const expectItems = [data.data, ...items]

    state2.items = items
    mutationSuccessStatus(state2, data, prefix)
    expect(state2[prefix].isLoading).toBe(false)
    expect(state2[prefix].isError).toBe(false)
    expect(state2[prefix].isSuccess).toBe(true)
    expect(state2[prefix].errorData).toBe(null)
    expect(state2[prefix].data).toBe(data.data)
    expect(state2.items).toEqual(expectItems)

    const data2 = {
      data: null
    }

    state2.items = items
    mutationSuccessStatus(state2, data2, prefix)
    expect(state2[prefix].isLoading).toBe(false)
    expect(state2[prefix].isError).toBe(false)
    expect(state2[prefix].isSuccess).toBe(true)
    expect(state2[prefix].errorData).toBe(null)
    expect(state2[prefix].data).toBe(data2.data)
    expect(state2.items).toEqual(items)
  })

  test('mutationSuccessStatus delete prefix', () => {
    const prefix = 'delete'
    const state = defaultPageState()
    const items = [
      {
        id: '1'
      },
      {
        id: '2'
      },
      {
        id: '3'
      },
      {
        id: '4'
      }
    ]
    const data: IMutationData = {
      data: {
        id: '3'
      },
      options: {
        primary: 'id'
      }
    }

    // items = []
    mutationSuccessStatus(state, data, prefix)
    expect(state[prefix].isLoading).toBe(false)
    expect(state[prefix].isError).toBe(false)
    expect(state[prefix].isSuccess).toBe(true)
    expect(state[prefix].errorData).toBe(null)
    expect(state.items).toEqual([])

    const expectData = [
      {
        id: '1'
      },
      {
        id: '2'
      },
      {
        id: '4'
      }
    ]

    // items = not empty
    state.items = items
    mutationSuccessStatus(state, data, prefix)
    expect(state[prefix].isLoading).toBe(false)
    expect(state[prefix].isError).toBe(false)
    expect(state[prefix].isSuccess).toBe(true)
    expect(state[prefix].errorData).toBe(null)
    expect(state.items).toEqual(expectData)

    // items = not empty and can delete

    const data2: IMutationData = {
      data: [
        {
          id: '1'
        },
        {
          id: '2'
        },
        {
          id: '3'
        },
        {
          id: '4'
        }
      ]
    }

    state.items = data2.data
    mutationSuccessStatus(state, data2, prefix)
    expect(state[prefix].isLoading).toBe(false)
    expect(state[prefix].isError).toBe(false)
    expect(state[prefix].isSuccess).toBe(true)
    expect(state[prefix].errorData).toBe(null)
    expect(state.items).toEqual(data2.data)
  })

  test('mutationSuccessStatus update prefix', () => {
    const prefix = 'update'
    const state = defaultPageState()
    const items = [
      {
        id: '1'
      },
      {
        id: '2'
      }
    ]

    const data: IMutationData = {
      data: {
        id: '2',
        name: 'long'
      },
      options: {
        primary: 'id'
      }
    }

    const expectData = [
      {
        id: '1'
      },
      {
        id: '2',
        name: 'long'
      }
    ]

    // empty items
    mutationSuccessStatus(state, data, prefix)
    expect(state[prefix].isLoading).toBe(false)
    expect(state[prefix].isError).toBe(false)
    expect(state[prefix].isSuccess).toBe(true)
    expect(state[prefix].errorData).toBe(null)
    expect(state[prefix].data).toBe(data.data)
    expect(state.items).toEqual([])

    state.items = items
    mutationSuccessStatus(state, data, prefix)
    expect(state[prefix].isLoading).toBe(false)
    expect(state[prefix].isError).toBe(false)
    expect(state[prefix].isSuccess).toBe(true)
    expect(state[prefix].errorData).toBe(null)
    expect(state[prefix].data).toBe(data.data)
    expect(state.items).toEqual(expectData)

    const items2 = [
      {
        user_id: '1'
      },
      {
        user_id: '2'
      }
    ]
    const data2: IMutationData = {
      data: {
        user_id: '2',
        name: 'long'
      },
      options: {
        primary: 'user_id'
      }
    }

    const expectData2 = [
      {
        user_id: '1'
      },
      {
        user_id: '2',
        name: 'long'
      }
    ]

    state.items = items2
    mutationSuccessStatus(state, data2, prefix)
    expect(state[prefix].isLoading).toBe(false)
    expect(state[prefix].isError).toBe(false)
    expect(state[prefix].isSuccess).toBe(true)
    expect(state[prefix].errorData).toBe(null)
    expect(state[prefix].data).toEqual(data2.data)
    expect(state.items).toEqual(expectData2)
  })

  test('mutationResetStatus', () => {
    const state = commonObjectState()
    mutationResetStatus(state)
    expect(state.isLoading).toBe(false)
    expect(state.isError).toBe(false)
    expect(state.isSuccess).toBe(false)
    expect(state.errorData).toBe(null)

    const pageState = defaultPageState()
    const prefix = 'add'
    mutationResetStatus(pageState, null, prefix)
    expect(pageState[prefix].isLoading).toBe(false)
    expect(pageState[prefix].isError).toBe(false)
    expect(pageState[prefix].isSuccess).toBe(false)
    expect(pageState[prefix].errorData).toBe(null)
  })

  test('isChangeWithTrue', () => {
    expect(isChangeWithTrue(true, false)).toBe(true)
    expect(isChangeWithTrue(true, true)).toBe(false)
    expect(isChangeWithTrue(false, false)).toBe(false)
    expect(isChangeWithTrue(false, true)).toBe(false)
  })

  test('addPrefix', () => {
    expect(addPrefix('success', 'add')).toBe('addSuccess')
    expect(addPrefix('success', '')).toBe('success')
  })

  test('commitWithPrefixLoading', () => {
    let commit = jest.fn()
    const options = { name: 'long' }
    commitWithPrefixLoading(commit, options, '')
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('loading', { options })

    commit = jest.fn()
    commitWithPrefixLoading(commit, options, 'add')
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('addLoading', { options })
  })

  test('commitWithPrefixSuccess', () => {
    let commit = jest.fn()
    const options = { name: 'long' }
    const data = { id: '321' }
    commitWithPrefixSuccess(commit, data, options, '')
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('success', { data, options })

    commit = jest.fn()
    commitWithPrefixSuccess(commit, data, options, 'add')
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('addSuccess', { data, options })
  })

  test('commitWithPrefixError', () => {
    let commit = jest.fn()
    const data = {
      response: {
        data: 'eiei error'
      }
    }
    commitWithPrefixError(commit, data, '')
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('error', data.response.data)

    commit = jest.fn()
    commitWithPrefixError(commit, data, 'add')
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('addError', data.response.data)

    commit = jest.fn()
    commitWithPrefixError(commit, null, 'add')
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('addError', Core.config.DEFAULT_ERROR_MSG)
  })

  test('commitPageLoading', () => {
    let commit = jest.fn()
    const options = { name: 'long' }

    commitPageLoading(commit, options)
    expect(commit).toHaveBeenCalledWith('loading', { options })
  })

  test('commitPageSuccess', () => {
    let commit = jest.fn()
    const options = { name: 'long' }
    const data = [{ id: '321' }]

    commitPageSuccess(commit, data, options)
    expect(commit).toHaveBeenCalledWith('success', { data, options })
  })

  test('getRequestObjectOption', () => {
    const ctx: any = {
      commit: jest.fn(),
      dispatch: jest.fn()
    }
    const options: any = jest.fn(() => ({
      params: {
        long: 5
      }
    }))
    const data = {}
    const reqOptions = {
      baseURL: faker.internet.url(),
      headers: {
        token: faker.name.firstName()
      }
    }

    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValue(reqOptions)
    const result = getRequestObjectOption(ctx, options, data)
    expect(result).toEqual({
        baseURL: reqOptions.baseURL,
        headers: {
          ...reqOptions.headers
        },
        params: options().params
      }
    )
  })

  test('getRequestPageOption', () => {
    const ctx: any = {
      commit: jest.fn(),
      dispatch: jest.fn()
    }
    const options: any = jest.fn(() => ({
      params: {
        long: 5
      }
    }))
    const data = {
      page: 2,
      q: 'pskclub'
    }
    const reqOptions = {
      baseURL: faker.internet.url(),
      headers: {
        token: faker.name.firstName()
      }
    }

    jest.spyOn(Core, 'DefaultAPIOptions').mockReturnValue(reqOptions)
    const result = getRequestPageOption(ctx, options, data)
    expect(result).toEqual({
        baseURL: reqOptions.baseURL,
        headers: {
          ...reqOptions.headers
        },
        params: {
          ...options().params,
          ...data,
          limit: Core.config.LIMIT_PER_PAGE
        }
      }
    )
  })
})

