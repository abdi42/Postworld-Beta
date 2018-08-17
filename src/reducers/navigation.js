import { AppNavigation } from '../AppNavigation'
import { NavigationActions } from 'react-navigation'

const initialAction = { type: NavigationActions.Init }
const initialState = AppNavigation.router.getStateForAction(initialAction)

export default (state = initialState, action) => {
  return { ...state }
}
