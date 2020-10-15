import Vue from 'vue'

class Base {
  constructor (attrs = {}) {
    this.attrs = attrs
  }

  clone () {
    return new this.constructor(this.attrs)
  }

  // 返回一个纯 Object 的字段-值列表
  get attrs () {
    return this.attrKeys.reduce((accumulate, attrKey) => {
      accumulate[attrKey] = this[attrKey]
      return accumulate
    }, {})
  }

  // 通过一个纯 Object 的字段-值列表修改内部属性
  // 原对象内，对于 attrs 中的字段，用旧值覆盖新值，删除不在 attrs 中字段
  set attrs (attrs) {
    // 将不在 attrs 中的字段删除
    for (const key of this.attrKeys) {
      if (!(key in attrs)) {
        Vue.delete(this, key)
      }
    }

    // 更新或添加字段
    for (const [key, value] of Object.entries(attrs)) {
      if (key in this) {
        this[key] = value
      } else {
        Vue.set(this, key, value)
      }
    }
  }

  get attrKeys () {
    return Object.keys(this)
  }
}

export default Base
