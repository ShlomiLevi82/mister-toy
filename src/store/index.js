import { createStore } from 'vuex'
import activityStore from './modules/activity.module.js'
import userStore from './modules/user.module.js'
import reviewStore from './modules/review.module.js'
// create a store instance
export const store = createStore({
  strict: true,
  modules: {
    activityStore,
    userStore,
    reviewStore,
  },
})

export default store
