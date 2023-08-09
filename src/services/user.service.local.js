import { storageService } from './async-storage.service.js'

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  getLoggedinUser,
  login,
  logout,
  signup,
  save,
  addActivity,
}

// Demo Data:
// _createUser()

function getLoggedinUser() {
  let user = JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || null
  )
  if (!user) {
    user = { username: 'ab', password: '123' }
    login(user)
  }
  return user
}

function login(credentials) {
  return storageService.query(USER_KEY).then((users) => {
    const user = users.find((u) => u.username === credentials.username)
    if (user) {
      return _saveUserToStorage(user)
    } else {
      return Promise.reject('Invalid credentials')
    }
  })
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return Promise.resolve()
}

function signup(credentials) {
  return storageService.query(USER_KEY).then((users) => {
    const user = users.find((u) => u.username === credentials.username)
    if (user) return Promise.reject('Username already taken')
    return storageService
      .post(USER_KEY, {
        ...credentials,
        fullname: '',
        prefs: {
          color: '#ffffff',
          bgColor: '#0b7285',
        },
        activities: [],
      })
      .then((user) => {
        return _saveUserToStorage(user)
      })
  })
}
function addActivity(activity) {
  const user = getLoggedinUser()
  user.activities.push(activity)
  return save(user)
}

function save(user) {
  return storageService.put(USER_KEY, user).then(() => {
    return _saveUserToStorage(user)
  })
}

function _saveUserToStorage(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function _createUser() {
  const user = localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
  if (!user)
    signup({
      fullname: 'Ab',
      userName: 'ab',
      password: '123',
      prefs: {
        color: '#ffffff',
        bgColor: '#0b7285',
      },
      activities: [
        { txt: 'Added a new toy', at: 1523873242735 },
        { txt: 'Added a new msg', at: 1657354690272 },
        { txt: 'Updated a toy', at: 1657354745868 },
      ],
    })
  login({ username: 'ab', password: '123' })
}
