import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import albumReducer from './reducers/albumReducer'
import artistReducer from './reducers/artistReducer'
import loginReducer from './reducers/loginReducer'
import reviewReducer from './reducers/reviewReducer'
import userReducer from './reducers/userReducer'
import singleAlbumReducer from './reducers/singleAlbumReducer'


const reducer = combineReducers({
  albums: albumReducer,
  artists: artistReducer,
  reviews: reviewReducer,
  loggedUser: loginReducer,
  users: userReducer,
  singleAlbum: singleAlbumReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store