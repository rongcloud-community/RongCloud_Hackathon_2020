import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const middlewares = [
  thunkMiddleware,
];

export default createStore(reducers, composeWithDevTools(
    applyMiddleware(...middlewares),
));
