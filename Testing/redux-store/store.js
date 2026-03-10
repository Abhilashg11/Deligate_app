import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/userReducers';
import { authReducer } from './reducers/authReducers';
import { notificationReducer } from './reducers/notificationReducers';
import { loadingReducer } from './reducers/loadingReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import { complaintReducer } from './reducers/complaintReducer';
import locationReducers from './reducers/locationReducers';

const combinedReducers = combineReducers({
  user: rootReducer,
  // auth: authReducer,
  // notification: notificationReducer,
  // loading: loadingReducer,
  // complaint: complaintReducer,
  // location: locationReducers,
});

// 👇 persist configuration
const persistConfig = {
  key: 'root', // key for the storage root
  storage: AsyncStorage, // AsyncStorage for React Native
  whitelist: ['auth', 'user', 'notification'], // only these slices will be persisted
  blacklist: ['loading', 'complaint'], // typically you don't want to persist loading states
};

// 👇 wrap the combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, combinedReducers);

// 👇 create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed because redux-persist uses non-serializable values
    }),
});

// create persistor
export const persistor = persistStore(store);
