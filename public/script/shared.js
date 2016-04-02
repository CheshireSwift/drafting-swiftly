'use strict'

const cookieName = 'drafting-swiftly:username'

var ds = {
  getUser: () => {
    var name = Cookies.get(cookieName)
    while (!name) {
      name = prompt('Enter name')
      Cookies.set(cookieName, name)
    }

    return name
  }
}

window.ds = ds

