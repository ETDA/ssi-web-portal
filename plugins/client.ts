import Vue from 'vue'
import Dialog from '../components/Dialog/index.vue'
import VuejsDialog from 'vuejs-dialog'

Vue.use(VuejsDialog);
(Vue as any).dialog.registerComponent('dialog', Dialog)