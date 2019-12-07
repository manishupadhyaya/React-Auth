import createStore from 'redux-zero';

const initialState = { isAuthenticated: false };
const store = createStore(initialState);

export default store;