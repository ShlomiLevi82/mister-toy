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
    user = { username: 'puki', password: '123' }
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
        fullname: 'Puki Ben David',
        prefs: {
          color: '#ffffff',
          bgColor: '#0b7285',
        },
        activities: [
          { txt: 'Added a new Todo', at: 1523873242735 },
          { txt: 'Added a new Todo', at: 1657354690272 },
          { txt: 'Updated a Todo', at: 1657354745868 },
        ],
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
      fullname: 'Puki Ben David',
      userName: 'puki',
      password: '123',
      prefs: {
        color: '#ffffff',
        bgColor: '#0b7285',
      },
      activities: [
        { txt: 'Added a new Todo', at: 1523873242735 },
        { txt: 'Added a new Todo', at: 1657354690272 },
        { txt: 'Updated a Todo', at: 1657354745868 },
      ],
    })
  login({ username: 'puki', password: '123' })
}

// import { storageService } from './storage.service.js'

// const USER_KEY = 'loggedInUser'

// export const userService = {
//   getLoggedinUser,
//   addActivity,
//   save,
// }

// function addActivity(activity) {
//   console.log('activity', activity)
//   const user = getLoggedinUser()
//   user.activities.push(activity)
//   storageService.store(USER_KEY, user)
// }

// function save(user) {
//   storageService.store(USER_KEY, user)
// }

// function getLoggedinUser() {
//   const user = storageService.load(USER_KEY)
//   if (user) return user

//   _login()
//   return storageService.load(USER_KEY)
// }

// function _login() {
//   storageService.store(USER_KEY, {
//     fullname: 'Puki Ben David',
//     prefs: {
//       color: '#ffffff',
//       bgColor: '#0b7285',
//     },
//     activities: [
//       { txt: 'Added a new Todo', at: 1523873242735 },
//       { txt: 'Added a new Todo', at: 1657354690272 },
//       { txt: 'Updated a Todo', at: 1657354745868 },
//     ],
//   })
// }
