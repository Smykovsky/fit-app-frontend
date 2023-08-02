export const state = () => ({
  alerts: [],
  errors: [],
  menuIsActive: false
})

export const getters = {
  getAlerts(state) {
    return state.alerts;
  },
  getErrors(state) {
    return state.errors;
  },
  getMenuIsActive(state) {
    return state.menuIsActive;
  }
}

export const mutations = {
  setAlerts(state, alert) {
    state.alerts.push(alert);
  },
  clearAlerts(state, alert) {
    state.alerts = alert;
  },
  setErrors(state, error) {
    state.errors.push(error)
  },
  clearErrors(state, error) {
    state.errors = error
  },
  setMenuIsActive(state) {
    state.menuIsActive = !state.menuIsActive
  }
}

export const actions = {
  addAlert({state, commit}, payload) {
    commit('setAlerts', payload);
    setTimeout(() => {
      var tmp = [];
      state.alerts.forEach( v => {
        if (v === payload) {
          return
        }
        tmp.push(v);
      });
      commit('clearAlerts', tmp);
    }, 10000)
  },
  removeAlert({state, commit}, payload) {
    var tmp = [];
    state.alerts.forEach(v => {
      if (v === payload) {
        return
      }
      tmp.push(v);
    });
    commit('clearAlerts', tmp);
  },
  removeError({state, commit}, payload) {
    var tmp = [];
    state.errors.forEach(v => {
      if (v === payload) {
        return
      }
      tmp.push(v);
    });
    commit('clearErrors', tmp);
  },
  addError({state, commit}, payload) {
    commit('setErrors', payload);
    setTimeout(() => {
      var tmp = [];
      state.errors.forEach(v => {
        if (v === payload) {
          return
        }
        tmp.push(v);
      });
      commit('clearErrors', tmp);
    }, 10000)
  }
}
