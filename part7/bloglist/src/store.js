import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import flagReducer from './reducers/flagReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
  flag: flagReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store