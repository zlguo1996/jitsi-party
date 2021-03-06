import {PastedContent} from '@components/map/ShareLayer/PastedContent'
import {SharedContent} from '@components/map/ShareLayer/SharedContent'
import {SharedContents} from '@components/map/ShareLayer/ShareLayer'
import {StoreProvider as ContentsProvider} from '@hooks/SharedContentsStore'
import {SharedContent as ISharedContent} from '@models/SharedContent'
import {Pose2DMap, SharedContent as SharedContentStore} from '@stores/SharedContent'
import {SharedContents as SharedContentsStore} from '@stores/SharedContents'
import {useObserver} from 'mobx-react-lite'
import React from 'react'

function addFakeSharedContents(store: SharedContentsStore) {
  const sc: SharedContentStore = new SharedContentStore()
  Object.assign(sc, {
    type : 'img',
    url: 'https://i.gyazo.com/d05570612dbbe84c65dd684ef665606e.png',
    pose: {
      position: [100, 100],
      orientation: 0,
    },
    size: [100, 100],
  })
  store.order.set('test', sc)
}
const pc: ISharedContent = {
  type : 'img',
  url: 'https://i.gyazo.com/d05570612dbbe84c65dd684ef665606e.png', // 'Pasted text',
  pose: {
    position: [300, 100],
    orientation: 0,
  },
  size: [100, 100],
}

const ShareLayerStory: React.FC<{}> = () => {
  const store = new SharedContentsStore()
  addFakeSharedContents(store)
  const contents = useObserver(() => Array.from(store.order.entries()))
//  const sharedContents = contents.map((val, idx) =>
//    <SharedContent key={idx} mapKey={val[0]} content={val[1]} contents={store} />)

  return (
    <ContentsProvider value={store}>
      <SharedContents />
      <PastedContent content={pc} />
    </ContentsProvider>
  )
}

export default ShareLayerStory
