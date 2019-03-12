import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import initData from './dataHelper'
import reducerCreator from './reducers/reducer'
import  data from './resource/data/data.json'
initData(data)
console.log(data)
const store = createStore(reducerCreator(data))
ReactDOM.render(<Provider store={store}>
					<App />
				</Provider>, 
	document.getElementById('root'));

