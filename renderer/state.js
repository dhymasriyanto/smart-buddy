const VALID_STATES = [
  'idle',
  'sleeping',
  'walking'
]

export let currentState = 'idle'

export const getState = () => currentState

export const setState = (newState) => {
  if (!VALID_STATES.includes(newState)) return
  currentState = newState
}
