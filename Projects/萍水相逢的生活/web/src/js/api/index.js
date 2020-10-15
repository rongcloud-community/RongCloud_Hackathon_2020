import _ from 'lodash'
import axios from 'axios'

function setTokenHeader (token) {
  axios.defaults.headers['X-Token'] = token
}

function clearTokenHeader () {
  delete axios.defaults.headers['X-Token']
}

class HttpError {
  constructor (response) {
    this.response = response
    this.data = response.data
    this.code = this.data.code
    this.message = this.data.message
    this.detail = this.data.detail
  }
}

export {
  setTokenHeader,
  clearTokenHeader,
  HttpError
}

axios.defaults.baseURL = '/api'
axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  if (error.response) {
    return Promise.reject(new HttpError(error.response))
  } else {
    return Promise.reject(error)
  }
})

axios.interceptors.request.use(function (config) {
  config.data = toSnakecase(config.data)
  config.params = toSnakecase(config.params)
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (data) {
  return toCamelcase(data)
}, function (error) {
  return Promise.reject(error)
})


function toCamelcase (value) {
  return deepMapKeys(value, key => _.camelCase(key))
}

function toSnakecase (value) {
  return deepMapKeys(value, key => _.snakeCase(key))
}

function deepMapKeys (value, map) {
  if (_.isPlainObject(value)) {
    const obj = value
    return _.transform(obj, (newObj, val, key) => {
      newObj[map(key)] = deepMapKeys(val, map)
    })
  } else if (_.isArray(value)) {
    const array = value
    return array.map(val => deepMapKeys(val, map))
  } else {
    return value
  }
}
