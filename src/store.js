import { createStore, applyMiddleware } from 'redux'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers'

const persistConfig = {
	key: 'root',
	storage,
	whitelist:['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {}

const store = createStore(persistedReducer,initialState,applyMiddleware(thunk))

const persistor = persistStore(store)

export {
	store,
	persistor
}
