import firebase from 'firebase/app'
import dateFilter from '../filters/date-filter'


export default {
    state: {
        recordInfo: null,
        recordInfoObj: null,
        recordSave: null,
    },
    mutations: {
        setRecordInfo(state, info) {
            state.recordInfo = info
        },
        setRecordInfoObj(state, info) {
            state.recordInfoObj = info
        },
        setRecordSave(state, info) {
            state.recordSave = info
        },
        clearRecordAll(state) {
            state.recordInfo = [],
            state.recordInfoObj = {},
            state.recordSave = []
        }
    },
    actions: {
        async pushRecord({dispatch}, recordData) {
            const uid = await dispatch('getUid')
            const record = await firebase.database().ref(`/users/${uid}/record`).push({
                ...recordData
            })
            return record.key
        },
        async fetchRecord({commit, dispatch}, recordId) {
            const uid = await dispatch('getUid')
            const data = (await firebase.database().ref(`/users/${uid}/record/${recordId}`).once('value')).val()
            const info = Object.keys(data).map((key, value) => ({
                ...data[key],
                id: value + 1
            }))
            await commit('setRecordInfo', info)
            await commit('setRecordInfoObj', data)
        },
        async saveRecord({dispatch}, {recordData, recordId, nameVariant}) {
            const uid = await dispatch('getUid')
            await firebase.database().ref(`/users/${uid}/save/${recordId}`).set({
                ...recordData,
                nameVariant,
                date: new Date().getTime(),
                recordId
            })
        },
        async fetchSaveRecord({commit, dispatch}) {
            const uid = await dispatch('getUid')
            await firebase.database().ref(`/users/${uid}/save`).on('value', snapshot => {
                const frame = snapshot.val()
                if (frame) {
                    const info = Object.keys(frame).map((key, value) => ({
                        ...frame[key],
                        recordId: key,
                        date: dateFilter(frame[key].date, 'datetime'),
                        id: value + 1
                    }))
                    commit('setRecordSave', info)
                }
                else {
                    commit('setRecordSave', [])
                }
            })
        },
        async deleteSaveRecord({dispatch}, recordId) {
            const uid = await dispatch('getUid')
            await firebase.database().ref(`/users/${uid}/save/${recordId}`).remove()
        }
    },
    getters: {
        recordInfo: state => state.recordInfo,
        recordSave: state => state.recordSave,
        recordInfoObj: state => state.recordInfoObj
    }
}