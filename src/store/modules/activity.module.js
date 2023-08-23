import { activityService } from '@/services/activity-service.js'

export default {
  state: {
    activitys: null,
    labels: null,
    filterBy: {
      title: '',
      isActive: true,
      labels: [],
      sortBy: 'createdAt -1',
    },
  },
  getters: {
    activitys({ activitys }) {
      return activitys
    },
    labels({ labels }) {
      return labels
    },
    filteredActivitys({ filterBy, activitys }) {
      if (!activitys) return
      //   return activitys
      const regex = new RegExp(filterBy.title, 'i')
      let filteredActivitys = activitys.filter((activity) =>
        regex.test(activity.title)
      )

      if (filterBy.isActive)
        filteredActivitys = filteredActivitys.filter(
          (activity) => activity.isActive
        )

      if (filterBy.labels.length) {
        filteredActivitys = filteredActivitys.filter((activity) => {
          return activity.labels.some(
            (label) => filterBy.labels.indexOf(label) >= 0
          )
        })
      }
      const { sortBy } = filterBy
      if (sortBy !== 'title')
        filteredActivitys.sort((t1, t2) => t1[sortBy] - t2[sortBy])
      else filteredActivitys.sort((t1, t2) => t1.title.localeCompare(t2.title))
      filteredActivitys.sort((t1, t2) => {
        if (sortBy !== 'title') return t1[sortBy] - t2[sortBy]
        else return t1.title.localeCompare(t2.title)
      })
      // const startIdx = filterBy.pageIdx * pageSize

      // filteredActivitys = filteredActivitys.slice(startIdx, startIdx + pageSize)
      // console.log(filteredActivitys)
      return filteredActivitys
    },
  },
  mutations: {
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
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
    async setFilter({ commit }, { filterBy }) {
      const activitys = await activityService.query(filterBy)
      commit({ type: 'setActivitys', activitys })
    },
    async loadActivitys({ commit }, { filterBy, sortBy }) {
      try {
        if (!filterBy) filterBy = { title: '', status: '', labels: null }
        if (!sortBy) sortBy = { value: 'date 1' }

        const labels = activityService.getLabels()
        commit({ type: 'setLabels', labels })

        const activitys = await activityService.query(filterBy, sortBy)
        commit({ type: 'setActivitys', activitys })
      } catch (err) {
        console.log('Could not get activitys', err)
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
