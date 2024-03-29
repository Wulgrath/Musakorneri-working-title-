import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import albumReducer from './reducers/albumReducer'
import artistReducer from './reducers/artistReducer'
import loginReducer from './reducers/loginReducer'
import reviewReducer from './reducers/reviewReducer'
import userReducer from './reducers/userReducer'
import singleAlbumReducer from './reducers/singleAlbumReducer'
import singleArtistReducer from './reducers/singleArtistReducer'
import notificationReducer from './reducers/notificationReducer'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import searchReducer from './reducers/searchReducer'
import loadingReducer from './reducers/loadingReducer'


const reducer = combineReducers({
  albums: albumReducer,
  artists: artistReducer,
  reviews: reviewReducer,
  loggedUser: loginReducer,
  users: userReducer,
  loading: loadingReducer,
  singleAlbum: singleAlbumReducer,
  singleArtist: singleArtistReducer,
  notification: notificationReducer,
  errorNotification: errorNotificationReducer,
  search: searchReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store