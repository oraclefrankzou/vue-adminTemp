/* 提供了对localStorage操作公共类 */

var LocalStorageUtils = {
  /* 增 */
  set (key, value) {
    var jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue)
  },
  // 查
  get (key) {
    var jsonValue = localStorage.getItem(key)
    return JSON.parse(jsonValue)
  },
  // 删
  remove (key) {
    localStorage.removeItem(key)
  }

}

export default LocalStorageUtils
