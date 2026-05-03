const VALID_STATES = [
  'idle',
  'sleep_transition',
  'sleep_inhale',
  'sleep_exhale',
  'lifted',
  'walking',
]

export let currentState = 'idle'

export const getState = () => currentState

export const setState = (newState) => {
  if (!VALID_STATES.includes(newState)) return
  currentState = newState
}
