const set = (key, value) => {
  window.localStorage[key] = value
}

const get = (key, defaultValue = false) => {
  return window.localStorage[key] || defaultValue
}

const setObject = (key, value) => {
  window.localStorage[key] = JSON.stringify(value)
}

const getObject = (key, defaultValue = {}) => {
  if (window.localStorage[key] !== undefined) {
    return JSON.parse(window.localStorage[key] || defaultValue)
  }

  return defaultValue
}
const remove = (key) => {
  window.localStorage.removeItem(key)
}

const clear = () => {
  window.localStorage.clear()
}

export default {
  set: set,
  remove: remove,
  clear: clear,
  getObject: getObject,
  setObject: setObject,
  get: get
}
