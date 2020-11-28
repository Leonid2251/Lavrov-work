import firebase from "firebase/app";

export default {
  state: {
    user: null
  },
  mutations: {
    setUserInfo(state, info) {
      state.user = info
    },
    clearUserInfo(state) {
      state.user = null
    }
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        const info = await firebase.auth().signInWithEmailAndPassword(email, password);
        commit('setUserInfo', info)
      } catch (e) {
        throw e;
      }
    },
    async register({commit, dispatch}, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch ('getUid')
        const info = await firebase.database().ref(`/users/${uid}/info`).set({
          name: name,
        })
        commit('setUserInfo', info)
      } catch (e) {
        throw e;
      }
    },
    getUid(){
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout({commit}) {
      await firebase.auth().signOut();
      commit('clearUserInfo')
      commit('clearRecordAll')
    }
  },
  getters: {
    user: state => state.user
  }
};
