import {EventInput} from '~/core/types'

export const INPUT_TYPES = {
    GROUP: 'GROUP',
    COMPONENT: 'COMPONENT',
    DATE: 'DATE',
    TIME: 'TIME',
    RADIO_BUTTON: 'RADIO_BUTTON',
    DATE_TIME: 'DATE_TIME',
    DATE_RANGE: 'DATE_RANGE',
    TEXT: 'TEXT',
    COPY: 'COPY',
    SLUG: 'SLUG',
    WYSWYG: 'WYSWYG',
    ADDRESS: 'ADDRESS',
    COUNTRY: 'COUNTRY',
    TEXT_AREA: 'TEXT_AREA',
    SELECT: 'SELECT',
    MULTI_SELECT: 'MULTI_SELECT',
    TAG: 'TAG',
    PASSWORD: 'PASSWORD',
    NUMBER: 'NUMBER',
    TOGGLE_SWITCH: 'TOGGLE_SWITCH',
    CHECK_BOX: 'CHECK_BOX',
    SINGLE_CHECK_BOX: 'SINGLE_CHECK_BOX',
    UPLOAD_IMAGE: 'UPLOAD_IMAGE',
    UPLOAD_IMAGE_WITH_CAPTION: 'UPLOAD_IMAGE_WITH_CAPTION',
    MULTI_UPLOAD_IMAGE: 'MULTI_UPLOAD_IMAGE',
    FILE: 'FILE',
    COLOR: 'COLOR',
    MAP: 'MAP',
    UPLOAD: 'UPLOAD'
}

export const INPUT_SIZES: { [key in IInputSize]: IInputSize } = {
    SM: 'SM',
    LG: 'LG',
    MD: 'MD'
}

export interface IOption {
    label: string
    value: any
}

export type IInputSize = 'SM' | 'MD' | 'LG'

export interface IFormOption {
    type: string,
    component?: any,
    description?: string
    className?: string,
    isHide?: boolean
    children?: IFormOption[]
    props?: {
        autoFocus?: boolean
        transform?: (event: EventInput | any, oldValue: any) => any
        className?: string
        before?: string
        after?: string
        testid?: string
        isCannotChange?: boolean
        options?: IOption[] | any[]
        initOptions?: IOption[] | any[]
        name: string
        error?: string
        defaultValue?: any
        rules?: string
        label?: string
        placeholder?: string
        isDisabled?: boolean
        isStatic?: boolean
        help?: string
        size?: IInputSize
        latitudeName?: string
        longitudeName?: string
        initCamera?: IPosition
        defaultPosition?: IPosition
        postfix?: string
        [key: string]: any
    },
    on?: {
        [key: string]: Function
    }
}

export interface IPosition {
    lat: number
    lng: number
}

export interface IRadioOption extends IOption {
    imageURL?: string
}
