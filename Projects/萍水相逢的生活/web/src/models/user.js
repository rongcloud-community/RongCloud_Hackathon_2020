import axios from 'axios'
import Base from './base'

class User extends Base {
  constructor (attrs = {}) {
    super(attrs)
  }

  async update (attrs) {
    const { user } = await axios.put('/user', { user: attrs })
    this.attrs = user
  }

  static async login (params) {
    const result = await axios.post('/logins', params)
    return result
  }

  static async create (attrs) {
    await axios.post('/users', { user: attrs })
  }

  static async getToken (scope) {
    if (scope !== 'im') {
      throw new Error('现今只支持获取融云的token')
    }

    const result = await axios.get('/user/token?scope=im')
    return result
  }

  static async current () {
    const { user } = await axios.get('/user')
    return new User(user)
  }
}

export default User
