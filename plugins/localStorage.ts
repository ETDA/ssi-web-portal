import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: '_app',
    paths: ['app']
  })(store)
}
