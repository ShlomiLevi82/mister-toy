import { toyService } from '../../services/toy-service'

export default {
  state: {
    toys: null,
    labels: [
      'On wheels',
      'Box game',
      'Art',
      'Baby',
      'Doll',
      'Puzzle',
      'Outdoor',
      'Battery Powered',
    ],
    filterBy: {
      name: '',
      inStock: false,
      labels: [],
      sortBy: 'createdAt -1',
    },
  },
  getters: {
    toys(state) {
      return state.toys
    },
    labels(state) {
      return state.labels
    },
    filteredToys({ filterBy, toys }) {
      if (!toys) return
      //   return toys
      const regex = new RegExp(filterBy.name, 'i')
      let filteredToys = toys.filter((toy) => regex.test(toy.name))

      if (filterBy.inStock)
        filteredToys = filteredToys.filter((toy) => toy.inStock)

      if (filterBy.labels.length) {
        filteredToys = filteredToys.filter((toy) => {
          return toy.labels.some((label) => filterBy.labels.indexOf(label) >= 0)
        })
      }

      const { sortBy } = filterBy
      if (sortBy !== 'name')
        filteredToys.sort((t1, t2) => t1[sortBy] - t2[sortBy])
      else filteredToys.sort((t1, t2) => t1.name.localeCompare(t2.name))
      filteredToys.sort((t1, t2) => {
        if (sortBy !== 'name') return t1[sortBy] - t2[sortBy]
        else return t1.name.localeCompare(t2.name)
      })
      // const startIdx = filterBy.pageIdx * pageSize

      // filteredToys = filteredToys.slice(startIdx, startIdx + pageSize)
      // console.log(filteredToys)
      return filteredToys
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },
    getLabels(state) {
      state.labels = toyService.getLabels()
      console.log(state.labels)
    },
    removeToy(state, { id }) {
      const idx = state.toys.findIndex((toy) => toy._id === id)
      state.toys.splice(idx, 1)
    },
    saveToy(state, { toy }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === toy._id)
      if (idx !== -1) state.toys.splice(idx, 1, toy)
      else state.toys.push(toy)
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
  },
  actions: {
    async loadToys({ commit }) {
      const toys = await toyService.query()
      commit({ type: 'setToys', toys })
    },

    async removeToy({ commit }, { id }) {
      id = await toyService.remove(id)
      commit({ type: 'removeToy', id })
    },

    async saveToy({ commit }, { toy }) {
      toy = await toyService.save(toy)
      commit({ type: 'saveToy', toy })
    },
    async setFilter({ commit }, { filterBy }) {
      const toys = await toyService.query(filterBy)
      commit({ type: 'setToys', toys })
    },
  },
}
