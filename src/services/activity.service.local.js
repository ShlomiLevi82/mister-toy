import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const ACTIVITY_KEY = 'activityDB'

_createActivitys()

export const activityService = {
  query,
  getById,
  remove,
  save,
  getEmptyActivity,
}

function query() {
  return storageService.query(ACTIVITY_KEY)
}

function getById(activityId) {
  return storageService.get(ACTIVITY_KEY, activityId)
}

function remove(activityId) {
  return storageService.remove(ACTIVITY_KEY, activityId)
}

function save(activity) {
  if (activity._id) {
    return storageService.put(ACTIVITY_KEY, activity)
  } else {
    return storageService.post(ACTIVITY_KEY, activity)
  }
}

function getEmptyActivity() {
  return {
    name: '',
    price: 0,
    labels: [],
    createdAt: Date.now(),
    inStock: false,
  }
}

function _createActivitys() {
  let activitys = utilService.loadFromStorage(ACTIVITY_KEY)
  if (!activitys || !activitys.length) {
    activitys = [
      _createActivity('Superman', utilService.getRandomIntInclusive(20, 100)),
      _createActivity('Batman', utilService.getRandomIntInclusive(20, 150)),
      _createActivity('Ironman', utilService.getRandomIntInclusive(20, 100)),
    ]
    utilService.saveToStorage(ACTIVITY_KEY, activitys)
  }
  return activitys
}

function _createActivity(name, price) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: Date.now(),
    inStock: true,
  }
}
