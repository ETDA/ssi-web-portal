import {ObjectHelper} from '~/utils/ObjectHelper'

describe('ObjectHelper', () => {

  test('CreateOption', () => {
    expect(ObjectHelper.createOption('1', 'eiei')).toEqual({
      value: '1',
      label: 'eiei'
    })
  })

  test('getStatus', () => {
    expect(ObjectHelper.toStatus({
      data: 1,
      options: {},
      isLoading: true,
      isLoaded: false,
      isSuccess: true,
      isError: false,
      errorData: null
    })).toEqual({
      isLoading: true,
      isLoaded: false,
      isSuccess: true,
      isError: false,
      errorData: null
    })
  })

  test('depth', () => {
    // expect(ObjectHelper.depth({})).toEqual(0)
    // expect(ObjectHelper.depth({
    //   '1': '1'
    // })).toEqual(1)
    // expect(ObjectHelper.depth({
    //   '1': '1',
    //   '2': '2',
    // })).toEqual(2)
    // expect(ObjectHelper.depth({
    //   '1': '1',
    //   '2': '2',
    //   '3': '3',
    // })).toEqual(3)
    expect(ObjectHelper.depth({
      '1': '1',
      '2': '2',
      '3': '3',
      '4': {
        '1': '1',
      },
    })).toEqual(5)
  })
})
