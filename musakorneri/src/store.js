import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import albumReducer from './reducers/albumReducer'
import artistReducer from './reducers/artistReducer'
import singleArtistReducer from './reducers/singleArtistReducer'
import loginReducer from './reducers/loginReducer'


const reducer = combineReducers({
  albums: albumReducer,
  artists: artistReducer,
  loggedUser: loginReducer,
  singleArtist: singleArtistReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store