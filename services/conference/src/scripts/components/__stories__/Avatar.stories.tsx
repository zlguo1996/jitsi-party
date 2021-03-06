import {ImageAvatar, StreamAvatar} from '@components/avatar'
import {Information} from '@models/Participant'
import React, {useEffect, useState} from 'react'


export default {
  title: 'Avatar',
}


const informationName: Information = {
  name: 'Hello World',
}
export const name = () => {
  return <ImageAvatar information={informationName} />
}

const informationEmal: Information = Object.assign({}, informationName, {
  md5Email: 'a50236395ddbb8acc4a3533f43da66b5',
})
export const gavatar = () => {
  return <ImageAvatar information={informationEmal} />
}

function captureVideo() {
  const [stream, setStream] = useState<MediaStream | undefined>(undefined)

  useEffect(
    () => {
      navigator.mediaDevices.getUserMedia({
        video: true,
      }).then(setStream)
    },
    [],
  )

  return [stream]
}
export const video = () => {
  const [stream] = captureVideo()

  if (stream === undefined) {
    return <div />
  }

  return <StreamAvatar stream={stream} />
}
