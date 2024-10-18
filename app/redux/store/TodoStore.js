import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import todosReducer from "../reducers/TodoReducer"; // Import your todos slice

// Combine all reducers
const rootReducer = combineReducers({
  todos: todosReducer, // Add your todos reducer
});

// Configure Redux Persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Use AsyncStorage for persistence
};

// Wrap the rootReducer with persistReducer to enable persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store using configureStore from Redux Toolkit
const todosStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for AsyncStorage
    }),
});

// Persist the store
export const persistor = persistStore(todosStore);

export default todosStore;
