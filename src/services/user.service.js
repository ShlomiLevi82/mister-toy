import { httpService } from './http.service'

// TODO: remove this dependency, subscribe to user-updated from UserDetails cmp
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from './socket.service'
import { showSuccessMsg } from './event-bus.service'

import { store } from '../store/index'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  changeScore,
}

window.userService = userService

function getUsers() {
  return httpService.get(`user`)
}

function onUserUpdate(user) {
  showSuccessMsg(
    `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
  )
  store.dispatch({ type: 'setWatchedUser', user })
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)

  socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
  socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  return user
}
function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
  let user = await httpService.get(`user/${_id}`)
  user.score = score

  user = await httpService.put(`user/${user._id}`, user)

  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  console.log('🚀 ~ file: user.service.js:67 ~ login ~ user:', user)
  if (user) {
    socketService.login(user._id)
    return saveLocalUser(user)
  }
}
async function signup(userCred) {
  userCred.score = 10000
  if (!userCred.imgUrl)
    userCred.imgUrl =
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  const user = await httpService.post('auth/signup', userCred)
  socketService.login(user._id)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  socketService.logout()
  return await httpService.post('auth/logout')
}

async function changeScore(by) {
  const user = getLoggedinUser()
  if (!user) throw new Error('Not loggedin')
  user.score = user.score + by || by
  await update(user)
  return user.score
}

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl:
      user.imgUrl ||
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    score: user.score,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}
