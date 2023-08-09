import { activityService } from '@/services/activity-service.js'

export default {
  state: {
    activitys: null,
    labels: null,
  },
  getters: {
    activitys({ activitys }) {
      return activitys
    },
    labels({ labels }) {
      return labels
    },
  },
  mutations: {
    setActivitys(state, { activitys }) {
      state.activitys = activitys
    },
    setLabels(state, { labels }) {
      state.labels = labels
    },
    removeActivity(state, { id }) {
      const idx = state.activitys.findIndex((activity) => activity._id === id)
      state.activitys.splice(idx, 1)
    },
    saveActivity(state, { activity }) {
      console.log(activity)
      const idx = state.activitys.findIndex(
        (currActivity) => currActivity._id === activity._id
      )
      if (idx !== -1) state.activitys.splice(idx, 1, activity)
      else state.activitys.push(activity)
    },
    setCurrActivity(state, { activityId }) {
      state.currActivity = state.activitys.find(
        (activity) => activity._id === activityId
      )
    },
    addMsg(state, { activityId, newMsg }) {
      const activity = state.activitys.find(
        (activity) => activity._id === activityId
      )
      if (!activity.msgs) activity.msgs = []
      activity.msgs.push(newMsg)
    },
    removeMsg(state, { activityId, msgId }) {
      const activity = state.activitys.find(
        (activity) => activity._id === activityId
      )
      const idx = activity.msgs.findIndex((msg) => msg.id === msgId)
      activity.msgs.splice(idx, 1)
    },
  },
  actions: {
    async loadActivitys({ commit }, { filterBy, sortBy }) {
      try {
        if (!filterBy) filterBy = { txt: '', status: '', labels: null }
        if (!sortBy) sortBy = {}

        const labels = activityService.getLabels()
        commit({ type: 'setLabels', labels })

        const activitys = await activityService.query(filterBy, sortBy)
        commit({ type: 'setActivitys', activitys })
      } catch (err) {
        console.log('Could not get activitys')
        // TODO: throw error to display user
      }
    },
    async removeActivity({ commit }, { id }) {
      try {
        const res = await activityService.remove(id)
        commit({ type: 'removeActivity', id })
        return res
      } catch (err) {
        console.log('Could Not remove activity')
        // TODO: throw error to display user
      }
    },
    async saveActivity({ commit }, { activity }) {
      try {
        const newActivity = await activityService.save(activity)
        commit({ type: 'saveActivity', activity: newActivity })
      } catch (err) {
        console.log('Could Not save activity')
        // TODO: throw error to display user
      }
    },
    async addMsg({ commit }, { activityId, txt }) {
      try {
        const newMsg = await activityService.addMsg(activityId, txt)
        commit({ type: 'addMsg', activityId, newMsg })
      } catch (err) {
        console.log(err)
        console.log('Could Not add msg')
      }
    },
    async removeMsg({ commit }, { activityId, msgId }) {
      try {
        await activityService.removeMsg(activityId, msgId)
        commit({ type: 'removeMsg', activityId, msgId })
      } catch (err) {
        console.log(err)
        console.log('Could Not delete msg')
      }
    },
  },
}
