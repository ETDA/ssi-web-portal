export interface ITabItem {
  name: string
  type?: 'component' | 'link',
  to?: string,
  component: Function | any
  isHide?: boolean
  isNoBorder?: boolean
  isNoPaddingX?: boolean
  isAllPadding?: boolean
  backgroundColor?: string
  icon?: string
  props?: object
}

export interface ITabAction {
  icon?: string
  name: string
  action: any
}

export interface ITabEasyOption {
  label: string
  value: string
  icon?: string
}

export interface ITabEasyActionOption {
  label?: string
  value: string
  icon?: string
  on?: {
    click?: (e: any) => any
  }
}
