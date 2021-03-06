import store from '@stores/participants/Participants'
import {autorun} from 'mobx'
import {ConnectedGroup} from './ConnectedGroup'
import {StereoManager} from './StereoManager'

export class ConnectedManager {
  private readonly manager = new StereoManager()

  private readonly connectedGroups: {
    [key: string]: ConnectedGroup,
  } = {}

  private participantsMemo: string[] = []

  constructor() {
    autorun(this.onPopulationChange)
  }

  private onPopulationChange = () => {
    const currentParticipants = Array.from(store.remote.keys())
    linearReconciliator(this.participantsMemo, currentParticipants, this.remove, this.add)
    this.participantsMemo = currentParticipants
  }

  private remove = (id: string) => {
    this.connectedGroups[id].dispose()
    delete this.connectedGroups[id]

    this.manager.removeSpeaker(id)
  }

  private add = (id: string) => {
    const group = this.manager.addSpeaker(id)

    const remote = store.find(id)
    const local = store.local

    this.connectedGroups[id] = new ConnectedGroup(local, remote, group)
  }
}

type PopulationChangeAction = (id: string) => void

function linearReconciliator(
  old: string[], current: string[],
  onRemove: PopulationChangeAction, onAdd: PopulationChangeAction) {

  let pOld = 0
  let pCurrent = 0

  // remove discarded
  while (pOld < old.length) {
    if (pCurrent < current.length && old[pOld] === current[pCurrent]) {
      pOld += 1
      pCurrent += 1
    } else {
      onRemove(old[pOld])
      pOld += 1
    }
  }

  // add new
  while (pCurrent < current.length) {
    onAdd(current[pCurrent])
    pCurrent += 1
  }
}
