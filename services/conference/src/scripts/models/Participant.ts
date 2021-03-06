export interface Participant {
  id: string
  pose: Pose2DMap
  information: Information
  perceptibility: Perceptibility // used for skip rendering for optimizing performance
  stream: Stream
  physics?: Physics
  control: Control
}

export interface Pose2DMap {  // screen coordinate system
  position: [number, number]
  orientation: number
}

export interface Pose3DAudio {  // right hand cartesian coordinate system
  position: [number, number, number],
  orientation: [number, number, number],
}

export interface Information {
  name: string
  email?: string
  md5Email?: string
  avatarSrc?: string
}

export interface Perceptibility {
  visibility: boolean
  audibility: boolean
}

export interface Stream {
  audioStream: MediaStream | undefined
  avatarStream: MediaStream | undefined
  screenStream: MediaStream | undefined
}

export interface Physics {
  onStage: boolean
}

export interface Control {
  muteAudio: boolean
  muteVideo: boolean
  attenuation: number
}
