import axios from 'axios'
import Base from './base'

class Scene extends Base {
  constructor (attrs = {}) {
    super(attrs)
  }

  static async list () {
    const { scenes } = await axios.get('/scenes')
    return scenes.map(scene => new Scene(scene))
  }

  static async find (id) {
    const { scene: attrs } = await axios.get(`/scenes/${id}`)
    return new Scene(attrs)
  }

  async save () {
    let attrs
    if (this.id) {
      attrs = (await axios.put(`/scenes/${this.id}`, { scene: this.attrs })).scene
    } else {
      attrs = (await axios.post('/scenes', { scene: this.attrs })).scene
    }
    this.attrs = attrs
  }

  async destroy () {
    await axios.delete(`/scenes/${this.id}`)
    this.destroyed = true
  }

  async reload () {
    const { scene: attrs } = await axios.get(`/scenes/${this.id}`)
    this.attrs = attrs
  }

  async setAsDefault () {
    await axios.post(`/scenes/${this.id}/as_default`)
  }
}

export default Scene
