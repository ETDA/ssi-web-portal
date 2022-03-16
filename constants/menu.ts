import {ISidebarItemState} from '~/store/types'

interface IMenu {
  [key: string]: ISidebarItemState
}

export const menu = () => ({
  unlock: {
    name: 'Unlock',
    to: '/unlock'
  },
  home: {
    name: 'หน้าหลัก',
    to: '/'
  },
  schemas: {
    name: 'จัดการ Schema',
    to: '/schemas'
  },
  schemasCreate: {
    name: 'เพิ่ม Schema',
    to: '/schemas/create'
  },
  schemasUpload: {
    name: 'อัปโหลด Schema',
    to: '/schemas/upload'
  },
  SchemaEndpoint: {
    name: 'เชื่อมต่อ Schema',
    to: '/schemas/endpoint'
  },
  walletUser: {
    name: 'จัดการผู้ใช้ e-Wallet',
    to: '/users/e-wallet'
  },
  walletUserSingle: {
    name: 'ข้อมูลผู้ใช้งาน',
    to: ``
  },
  walletUserHistory: {
    name: 'ประวัติการใช้งาน'
  },
  portalUser: {
    name: 'จัดการผู้ใช้ e-Portal',
    to: '/users/e-portal'
  },
  portalUserCreate: {
    name: 'เพิ่มผู้ใช้งาน',
    to: '/users/e-portal/create'
  },
  portalUserSingle: {
    name: 'ข้อมูลผู้ใช้งาน',
    to: ``
  },
  document: {
    name: 'จัดการเอกสาร',
    to: '/documents'
  },
  requestDocument: {
    name: 'ร้องขอเอกสารสำแดง',
    to: '/documents/request'
  },
  verifyDocument:  {
    name: 'ตรวจสอบเอกสาร',
    to: '/documents/verify'
  },
  createDocument:  {
    name: 'ออกเอกสารรับรอง',
    to: '/documents/create'
  },
  setting: {
    name: 'ตั้งค่า e-Portal',
    to: '/settings'
  },
  keySetting: {
    name: 'Key Setting',
    to: '/key-management'
  },
  profile: {
    name: 'จัดการบัญชี',
    to: '/profile'
  },
})
