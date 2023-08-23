import { httpService } from './http.service.js'

const labels = ['Outdoor', 'Indoor', 'Box game', 'Art', 'For Babys']

export const activityService = {
  query,
  getById,
  remove,
  save,
  getLabels,
  getEmptyActivity,
}

async function query(filterBy) {
  return await httpService.get('activity', filterBy)
}

async function getById(activityId) {
  return httpService.get(`activity/${activityId}`)
}

async function remove(activityId) {
  httpService.delete(`activity/${activityId}`)
}

async function save(activity) {
  console.log('activity', activity)
  if (activity._id) {
    return httpService.put(`activity/${activity._id}`, activity)
  }
  return httpService.post('activity', activity)
}

function getLabels() {
  return labels
}

function getEmptyActivity() {
  return {
    title: '',
    date: '',
    time: '',
    labels: [],
    createdAt: Date.now(),
    isActive: true,
    ditails: '',
    location: '',
  }
}
