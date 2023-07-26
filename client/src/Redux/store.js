// store.js
import { createStore } from 'redux';
import rootReducer from './reducers';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from './localStorage';

const persistedState = loadStateFromLocalStorage();
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
});

export default store;
