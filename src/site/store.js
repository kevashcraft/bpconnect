import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [ persistedState() ],
  state: {
    builderSupervisors: {},
    filters: {},
    config: {},
    configDeleted: false,
    modal: '',
    modalStack: [],
    pageTitle: '',
    workers: [],
    ticketTypes: []
  },
  mutations: {
    builderSupervisorsSet (state, builderSupervisors) {
      state.builderSupervisors = builderSupervisors
    },
    configSet (state, config) {
      state.config = config
    },
    configDeletedSet (state, configDeleted) {
      state.configDeleted = configDeleted
    },
    filtersSet (state, filters) {
      state.filters = filters
    },
    filterSet (state, obj) {
      state.filters[obj.key] = obj.filter
    },
    modalSet (state, modal) {
      state.modal = modal
    },
    modalStackPush (state, modal) {
      if (state.modalStack.indexOf(modal) < 0) {
        state.modalStack.push(modal)
      }
    },
    modalStackSet (state, stack) {
      state.modalStack = stack
    },
    modalStackSplice (state, index) {
      state.modalStack.splice(index, 1)
    },
    pageTitleSet (state, title) {
      state.pageTitle = title
    },
    ticketTypesSet (state, ticketTypes) {
      state.ticketTypes = ticketTypes
    },
    workersSet (state, workers) {
      state.workers = workers
    }
  },
  actions: {
    modalClear ({ commit, state }) {
      commit('modalSet', '')
      commit('modalStackSet', [])
    },
    modalOpen ({ commit, state }, modal) {
      // remove if in the stack
      let prevIndex = state.modalStack.indexOf(modal)
      if (prevIndex > -1) commit('modalStackSplice', prevIndex)

      commit('modalSet', modal)
    },
    modalNext ({ commit, state }) {
      let modal = ''

      if (state.modalStack.length) {
        modal = state.modalStack[0]

        setTimeout(() => {
          commit('modalStackSplice', 0)
        }, 350)
      }

      commit('modalSet', modal)
    },
    modalSave ({ commit, state }, modal) {
      if (modal !== state.modal) {
        if (state.modal.length) {
          commit('modalStackPush', state.modal)
        }
        commit('modalSet', modal)
      } else {
        console.log("you're trying to save the wrong modal")
      }
    }
  }
})
