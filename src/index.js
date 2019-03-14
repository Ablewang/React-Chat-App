import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import initData from './dataHelper'
import reducerCreator from './reducers/reducer'
import data from './resource/data/data.json'
initData(data)
let r = data.userRelation.reduce((res,itm)=>{
	let arr = data.userRelation.filter((i)=>{
		return i.contactId === itm.userId && itm.contactId === i.userId
	})
	!res[itm.userId] && (res[itm.userId] = [])
	res[itm.userId].push(arr)
	return res
},{})
console.log(r )

const store = createStore(reducerCreator(data))
ReactDOM.render(<Provider store={store}>
	<App />
</Provider>,
	document.getElementById('root'));

