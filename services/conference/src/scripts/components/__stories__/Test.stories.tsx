import {autorun, observable} from 'mobx'
import React from 'react'

export default {
  title: 'Test',
}

export const test = () => {
  return <div />
}

const m = observable({
  l1: {
    l2: {
      l3: 'a',
    },
  },
})

autorun(() => {
  console.log(m.l1.l2.l3)
})

m.l1.l2.l3 = 'a'
m.l1.l2 = {
  l3: 'b',
}
