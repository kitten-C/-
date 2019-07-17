function deepClone(obj) {
  let cloneObj = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (k in obj) {
      if (obj.hasOwnPropoty(k)) {
        if (obj[k] && typeof obj[k] === 'object') {
          return deepClone(obj[k])
        }
        cloneObj[k] = obj[k]
      }
    }
  }
}

function deepClone(obj) {
  let cloneObj = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (k in obj) {
      if (obj.hasOwnPropoty(k)) {
        if (typeof obj[k] === 'object') {
          deepClone(obj[k])
        } else {
          cloneObj[k] = obj[k]
        }
      }
    }
  }
  return cloneObj
}
