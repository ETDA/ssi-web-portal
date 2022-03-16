<template>
  <div>
    <InputTextField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-if="isText(getOption())"
        v-on="getOption().on"
    />
    <InputFileField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-if="isFile(getOption())"
        v-on="getOption().on"
    />
    <InputUploadField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-if="isUpload(getOption())"
        v-on="getOption().on"
    />
    <InputSelectField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-else-if="isSelect(getOption())"
        v-on="getOption().on"
    />
    <InputMultiSelectField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-else-if="isMultiSelect(getOption())"
        v-on="getOption().on"
    />
    <InputTagField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-else-if="isTag(getOption())"
        v-on="getOption().on"
    />
    <InputDateField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-else-if="isDate(getOption())"
        v-on="getOption().on"
    />
    <InputDateTimeField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-else-if="isDateTime(getOption())"
        v-on="getOption().on"
    />
    <InputDateTimeField
        :id="value[getOption().props.name]"
        :value="value[getOption().props.name]"
        v-bind="{ ...getOption().props }"
        v-else-if="isTime(getOption())"
        v-on="getOption().on"
    />
    <InputDateRangeField
        :id="value[getOption().props.name]"
        :value="value[getOption().props.name]"
        v-bind="{ ...getOption().props }"
        v-else-if="isDateRangeTime(getOption())"
        v-on="getOption().on"/>
    <InputToggleSwitchField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-else-if="isToggleSwitch(getOption())"
        v-on="getOption().on"
    />
    <InputCheckBoxField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-else-if="isCheckBox(getOption())"
        v-on="getOption().on"
    />
    <InputRadioButtonField
        :value="value[getOption().props.name]"
        v-bind="getOption().props"
        v-else-if="isRadioButton(getOption())"
        v-on="getOption().on"
    />
    <InputTextField
        :value="value[getOption().props.name]"
        v-bind="{ ...getOption().props, type: 'password' }"
        v-else-if="isPassword(getOption())"
        v-on="getOption().on"
    />
    <InputTextField
        :value="value[getOption().props.name]"
        v-bind="{ ...getOption().props, type: 'number' }"
        v-else-if="isNumber(getOption())"
        v-on="getOption().on"
    />
    <InputTextAreaField
        :value="value[getOption().props.name]"
        v-bind="{ ...getOption().props }"
        v-else-if="isTextArea(getOption())"
        v-on="getOption().on"
    />

    <component
        :is="getOption().component"
        :value="value[getOption().props.name]"
        v-bind="{ ...getOption().props }"
        v-else-if="isComponent(getOption())"
        v-on="getOption().on"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { IFormOption, INPUT_TYPES } from './types'
import { Base } from '~/core/Base'
import { _get } from '~/utils/lodash'

@Component
export default class FieldCondition extends Base {
  @Prop(Object) readonly option!: IFormOption
  @Prop(Object) readonly value!: IFormOption
  @Prop() readonly error!: any

  getOption () {
    if (this.error && this.error.fields) {
      return {
        ...this.option,
        props: {
          ...this.option.props,
          error: _get(
              this.error.fields,
              `${this.option!.props!.name}.message`,
              null
          )
        }
      }
    }

    return this.option
  }

  isComponent (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.COMPONENT
  }

  isRadioButton (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.RADIO_BUTTON
  }

  isText (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.TEXT
  }

  isTextArea (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.TEXT_AREA
  }

  isSelect (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.SELECT
  }

  isMultiSelect (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.MULTI_SELECT
  }

  isDate (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.DATE
  }

  isTag (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.TAG
  }

  isFile (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.FILE
  }

  isUpload (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.UPLOAD
  }

  isDateTime (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.DATE_TIME
  }

  isDateRangeTime (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.DATE_RANGE
  }

  isTime (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.TIME
  }

  isToggleSwitch (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.TOGGLE_SWITCH
  }

  isCheckBox (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.CHECK_BOX
  }

  isPassword (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.PASSWORD
  }

  isNumber (option: IFormOption): boolean {
    return option.type === INPUT_TYPES.NUMBER
  }
}
</script>
