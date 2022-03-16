import Vue from 'vue'
import {extend, localize, ValidationObserver, ValidationProvider} from 'vee-validate/dist/vee-validate.full'
import {regex} from 'vee-validate/dist/rules.js'
import InfiniteLoading from 'vue-infinite-loading'
import InputTextField from '../components/Form/InputTextField.vue'
import InputTextAreaField from '../components/Form/InputTextAreaField.vue'
import InputToggleSwitchField from '../components/Form/InputToggleSwitchField.vue'
import InputSelectField from '../components/Form/InputSelectField.vue'
import InputMultiSelectField from '../components/Form/InputMultiSelectField.vue'
import InputCheckBoxField from '../components/Form/InputCheckBoxField.vue'
import InputRadioButtonField from '../components/Form/InputRadioButtonField.vue'
import InputDateField from '../components/Form/InputDateField.vue'
import InputTagField from '../components/Form/InputTagField.vue'
import InputUploadField from '../components/Form/InputUploadField.vue'
import InputDateTimeField from '../components/Form/InputDateTimeField.vue'
import ContentContainer from '../components/ContentContainer.vue'
import Field from '../components/Form/Field.vue'
import SubmitButton from '../components/Form/SubmitButton.vue'
import Error from '../components/Error.vue'
import IMG from '../components/IMG.vue'
import Empty from '../components/Empty.vue'
import Loading from '../components/Loading.vue'
import Modal from '../components/Modal.vue'
import Card from '../components/Card.vue'
import Tab from '../components/Tab/index.vue'
import TabEasy from '../components/Tab/TabEasy.vue'
import BootstrapVue from 'bootstrap-vue'
import Table from '../components/Table/index.vue'
import TableEasy from '../components/Table/TableEasy.vue'
import TableCard from '../components/Table/TableCard.vue'
import Multiselect from 'vue-multiselect'
import Datetime from '~/components/vue-date-time/vue-datetime'
import AppRepository from '~/repositories/AppRepository'
import {ValidateHelper} from '~/utils/ValidateHelper'
import AuthRepository from '~/repositories/AuthRepository'
import vClickOutside from 'v-click-outside'
import {StringHelper} from '~/utils/StringHelper'
import {ArrayHelper} from '~/utils/ArrayHelper'
import {TimeHelper} from '~/utils/TimeHelper'
import TableCustom from '~/components/Table/TableCustom.vue'
import Fragment from '~/components/Fragment.vue'
import frag from 'vue-frag'
import TableHeader from '~/components/Table/TableHeader.vue'
import {ObjectHelper} from '~/utils/ObjectHelper'
import LoadingTransparent from "~/components/LoadingTransparent.vue";
import InputDateRangeField from "~/components/Form/InputDateRangeField.vue";
import InputFileField from "~/components/Form/InputFileField.vue";

Vue.directive('frag', frag)
// @ts-ignore
Vue.component('FormWrapper', {
  extends: ValidationObserver,
  inject: ['form_name'],
  props: {tag: {type: String, default: 'form'}}
})

extend('url', {
  validate: value => ValidateHelper.isURL(value),
  message() {
    return 'Invalid URL format'
  }
})

extend('color-hex', {
  validate: value => ValidateHelper.isColorHex(value),
  message() {
    return 'Invalid hex color format'
  }
})

extend('image-required', {
  validate: value => ValidateHelper.isRequired(value.url),
  message() {
    return 'This field is required'
  }
})

extend('regex', {
  validate: (str: any, {regex: params}: any) => {
    return regex.validate(str, {regex: params[0]})
  },
  message: (_, {regex: params}: any) => {
    return `กรุณากรอกให้ตรงตามรูปแบบ ${params[1]}`.replaceAll(/\//g, '')
  },
})

localize({
  en: {
    messages: {
      required: 'กรุณากรอกข้อมูล',
      numeric: 'กรุณากรอกตัวเลขเท่านั้น',
      email: 'กรุณากรอกอีเมลให้ถูกต้อง',
      url: 'กรุณากรอก URL ให้ถุกต้อง',
      confirmed: 'กรุณากรอกข้อมูลให้ถูกต้อง',
    }
  },
})

extend('file-zip', {
  validate: value => {
    return value?.type === 'application/zip' || value?.type === 'application/x-zip-compressed'
  },
  message() {
    return 'กรุณาเลือกไฟล์ข้อมูลให้ถูกต้อง'
  }
})

extend('file-json', {
  validate: value => value?.type === 'application/json',
  message() {
    return 'กรุณาเลือกไฟล์ข้อมูลให้ถูกต้อง'
  }
})

// @ts-ignore
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ContentContainer', ContentContainer)
Vue.component('InputDateTimeField', InputDateTimeField)
Vue.component('InputDateRangeField', InputDateRangeField)
Vue.component('InputTextField', InputTextField)
Vue.component('InputTextAreaField', InputTextAreaField)
Vue.component('InputTagField', InputTagField)
Vue.component('InputToggleSwitchField', InputToggleSwitchField)
Vue.component('InputSelectField', InputSelectField)
Vue.component('InputMultiSelectField', InputMultiSelectField)
Vue.component('InputDateField', InputDateField)
Vue.component('InputCheckBoxField', InputCheckBoxField)
Vue.component('InputRadioButtonField', InputRadioButtonField)
Vue.component('InputFileField', InputFileField)
Vue.component('InputUploadField', InputUploadField)
Vue.component('')
Vue.component('SubmitButton', SubmitButton)
Vue.component('Field', Field)
Vue.component('Error', Error)
Vue.component('IMG', IMG)
Vue.component('Empty', Empty)
Vue.component('Loading', Loading)
Vue.component('LoadingTransparent', LoadingTransparent)
Vue.component('Card', Card)
Vue.component('Modal', Modal)
Vue.component('Tab', Tab)
Vue.component('TabEasy', TabEasy)
Vue.component('multiselect', Multiselect)
Vue.component('Table', Table)
Vue.component('TableHeader', TableHeader)
Vue.component('TableCustom', TableCustom)
Vue.component('TableEasy', TableEasy)
Vue.component('TableCard', TableCard)
Vue.component('InfinityLoading', InfiniteLoading)
Vue.component('fragment', Fragment)
Vue.use(BootstrapVue)
Vue.use(Datetime)
Vue.use(vClickOutside)

export default (ctx, inject) => {
  inject('app', new AppRepository(ctx))
  inject('auth', new AuthRepository(ctx))
  inject('string', StringHelper)
  inject('array', ArrayHelper)
  inject('object', ObjectHelper)
  inject('time', TimeHelper)
}
