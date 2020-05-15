import {makeStyles} from '@material-ui/core/styles'
import {extractRotation, transformPoint2D} from '@models/utils'
import {useLocalStore} from 'mobx-react-lite'
import React, {createContext, useContext, useMemo} from 'react'
import {addV, subV} from 'react-use-gesture'

interface StyleProps {
  matrix: DOMMatrix | DOMMatrixReadOnly
}

const useStyles = makeStyles({
  antiRotation: (props: StyleProps) => ({
    transform: `rotate(${-extractRotation(props.matrix)}rad)`,
  }),
})

interface Store {
  antiRotationClass: string
  local2Global: (local: [number, number]) => [number, number]
  global2Local: (global: [number, number]) => [number, number]
}

interface Params {
  committedMatrix: DOMMatrix | DOMMatrixReadOnly,
  clientPosition: [number, number]
}

export const StoreProvider: React.FC<{params: Params}> = ({params, children}) => {
  const store = useTransformStore(params)

  return (
    <Provider value={store}>
      {children}
    </Provider>
  )
}
StoreProvider.displayName = 'TransformStoreProvider'

export const useStore = () => {
  const store = useContext(Context)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }

  return store
}

function useTransformStore(params: Params) {
  const className = useStyles({matrix: params.committedMatrix}).antiRotation

  return useLocalStore<Store>(
    source => ({
      antiRotationClass: className,
      local2Global: (position: [number, number]) => (
        addV(source.clientPosition, transformPoint2D(source.committedMatrix, position))),
      global2Local: (position: [number, number]) => (
        transformPoint2D(source.committedMatrix.inverse(), subV(position, source.clientPosition))),
    }),
    {
      className,
      committedMatrix: params.committedMatrix,
      clientPosition: params.clientPosition,
    },
  )
}

const Context = createContext<Store>({
  antiRotationClass: 'default_class_name',
  local2Global: local => local,
  global2Local: global => global,
})
const Provider = Context.Provider
