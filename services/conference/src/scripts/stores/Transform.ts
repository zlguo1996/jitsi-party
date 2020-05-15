import {makeStyles} from '@material-ui/core/styles'
import {extractRotation, extractScaleX, multiply, transformPoint2D} from '@models/utils'
import {action, computed, observable} from 'mobx'
import {createContext, useContext, useMemo} from 'react'
import {addV, subV} from 'react-use-gesture'

class Transform {
  @observable matrix: DOMMatrix | DOMMatrixReadOnly = new DOMMatrixReadOnly()

  @computed rotation(): number {
    return extractRotation(this.matrix)
  }

  @computed scale(): number {
    return Math.abs(extractScaleX(this.matrix))
  }

  @action translate(x: number, y: number) {
    this.matrix = this.matrix.translate(x, y)
  }

  @action rotateAndScale(rotate = 0, scale = 1, center: [number, number] = [0, 0]) {
    const tm = (new DOMMatrixReadOnly()).translate(
      ...subV([0, 0] as [number, number], center))
    const itm = (new DOMMatrixReadOnly()).translate(...center)

    const changeMatrix = (new DOMMatrix()).scaleSelf(scale, scale, 1).rotateSelf(0, 0, rotate)

    this.matrix = multiply([itm, changeMatrix, tm, this.matrix])
  }
}
